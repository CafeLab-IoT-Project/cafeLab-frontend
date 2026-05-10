import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ProductionCostRecordApi } from '../../../../production-cost-record/application/production-cost-record.api';
import type {
  ProductionCostRecord,
  ProductionCostRecordStatus,
} from '../../../../production-cost-record/domain/model/production-cost-record.entity';
import { ProductionCostService } from '../../../infrastructure/production-cost.service';
import type {
  ProductionCostCalculation,
  ProductionCostCurrency,
} from '../../../domain/model/production-cost.entity';
import { getUserFacingApiMessage } from '../../../../shared/infrastructure/api-error-message';

/**
 * Opciones predefinidas del selector de motivos de anulación.
 *
 * `value` es el texto canónico (en español) que persistimos en el backend, así no
 * cambia al alternar el idioma del front. `labelKey` es la clave i18n que se usa
 * para mostrar la opción al usuario en su idioma activo.
 */
const PREDEFINED_REASONS = [
  { value: 'Datos erróneos',          labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.DATA_ERROR' },
  { value: 'Lote equivocado',         labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.WRONG_LOT' },
  { value: 'Registro duplicado',      labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.DUPLICATE' },
  { value: 'Costos incompletos',      labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.INCOMPLETE_COSTS' },
  { value: 'Cancelación operativa',   labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.OPERATIONAL_CANCEL' },
  { value: 'Proveedor no disponible', labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.SUPPLIER_UNAVAILABLE' },
  { value: 'Error de cálculo',        labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.CALCULATION_ERROR' },
  { value: 'Error de transporte',     labelKey: 'COST_MANAGEMENT.RECORDS.ANNUL.REASONS.TRANSPORT_ERROR' },
] as const;

const OTHER_REASON_KEY = '__OTHER__';
const REASON_MAX_LENGTH = 25;

@Component({
  selector: 'app-cost-records-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './cost-records-list.component.html',
  styleUrls: ['./cost-records-list.component.css'],
})
export class CostRecordsListComponent implements OnInit {
  @Output() newCalculation = new EventEmitter<void>();

  readonly predefinedReasons = PREDEFINED_REASONS;
  readonly otherReasonKey = OTHER_REASON_KEY;
  readonly reasonMaxLength = REASON_MAX_LENGTH;

  records: ProductionCostRecord[] = [];
  searchQuery = '';
  loading = false;
  error: string | null = null;

  selectedForView: ProductionCostRecord | null = null;

  /** Estado del modal de anulación. */
  selectedForAnnul: ProductionCostRecord | null = null;
  annulReasonSelection = '';
  annulReasonCustom = '';
  annulSubmitting = false;
  annulFormError: string | null = null;

  constructor(
    private readonly productionCostRecordApi: ProductionCostRecordApi,
    private readonly productionCostService: ProductionCostService,
    private readonly translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  /** Pública: el padre puede pedir refrescar tras un nuevo cálculo. */
  reload(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.loading = true;
    this.error = null;
    this.productionCostRecordApi
      .getAll()
      .pipe(
        catchError((err) => {
          this.error = getUserFacingApiMessage(
            err,
            this.translate.instant('COST_MANAGEMENT.RECORDS.ERRORS.LOAD'),
          );
          return of<ProductionCostRecord[]>([]);
        }),
        finalize(() => (this.loading = false)),
      )
      .subscribe((rows) => {
        this.records = rows;
      });
  }

  get filteredRecords(): ProductionCostRecord[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      return this.records;
    }
    return this.records.filter((r) => r.lotName.toLowerCase().includes(q));
  }

  search(): void {
    // Sólo dispara la detección de cambios; el getter ya filtra.
  }

  currencySymbol(currency: string): string {
    return currency === 'USD' ? '$' : 'S/.';
  }

  isAnnulled(row: ProductionCostRecord): boolean {
    return row.status === 'anulado';
  }

  /**
   * Devuelve el motivo de anulación listo para mostrar:
   * - Si coincide con uno de los motivos predefinidos lo traduce al idioma activo.
   * - Si no, asume que es un texto libre ("Otro") y lo devuelve tal cual.
   */
  displayReason(rawReason: string | null | undefined): string {
    const value = (rawReason || '').trim();
    if (!value) {
      return '';
    }
    const match = PREDEFINED_REASONS.find((option) => option.value === value);
    return match ? this.translate.instant(match.labelKey) : value;
  }

  statusLabelKey(status: ProductionCostRecordStatus | string): string {
    return status === 'anulado'
      ? 'COST_MANAGEMENT.RECORDS.STATUS_ANNULLED'
      : 'COST_MANAGEMENT.RECORDS.STATUS_REGISTERED';
  }

  // ----- Ver -----
  openView(row: ProductionCostRecord): void {
    this.selectedForView = row;
  }
  closeView(): void {
    this.selectedForView = null;
  }
  downloadPDFFromView(): void {
    if (!this.selectedForView) {
      return;
    }
    this.productionCostService.generatePDF(this.toCalculation(this.selectedForView));
  }

  // ----- Anular (reemplaza al borrado) -----
  openAnnul(row: ProductionCostRecord): void {
    if (this.isAnnulled(row)) {
      return;
    }
    this.selectedForAnnul = row;
    this.annulReasonSelection = '';
    this.annulReasonCustom = '';
    this.annulFormError = null;
  }

  cancelAnnul(): void {
    this.selectedForAnnul = null;
    this.annulReasonSelection = '';
    this.annulReasonCustom = '';
    this.annulFormError = null;
  }

  /** Texto que se enviará al backend según la selección. */
  private resolveAnnulReason(): string | null {
    const selection = this.annulReasonSelection;
    if (!selection) {
      return null;
    }
    if (selection !== OTHER_REASON_KEY) {
      return selection;
    }
    const custom = (this.annulReasonCustom || '').trim();
    if (!custom) {
      return null;
    }
    return custom.slice(0, REASON_MAX_LENGTH);
  }

  confirmAnnul(): void {
    if (!this.selectedForAnnul) {
      return;
    }
    const reason = this.resolveAnnulReason();
    if (!reason) {
      this.annulFormError = this.translate.instant(
        'COST_MANAGEMENT.RECORDS.ANNUL.ERROR_REQUIRED',
      );
      return;
    }
    this.annulFormError = null;
    this.annulSubmitting = true;
    const id = this.selectedForAnnul.id;
    this.productionCostRecordApi
      .annull(id, { reason })
      .pipe(
        catchError((err) => {
          this.annulFormError = getUserFacingApiMessage(
            err,
            this.translate.instant('COST_MANAGEMENT.RECORDS.ERRORS.ANNULL'),
          );
          return of<ProductionCostRecord | null>(null);
        }),
        finalize(() => (this.annulSubmitting = false)),
      )
      .subscribe((updated) => {
        if (!updated) {
          return;
        }
        this.cancelAnnul();
        this.loadRecords();
      });
  }

  /** Adapta un registro al formato que entiende {@code ProductionCostService.generatePDF}. */
  private toCalculation(r: ProductionCostRecord): ProductionCostCalculation {
    return {
      coffeeLotId: r.coffeeLotId,
      coffeeLotName: r.lotName,
      coffeeType: r.coffeeType,
      currency: (r.currency === 'USD' ? 'USD' : 'PEN') as ProductionCostCurrency,
      totalKg: r.totalKg,
      rawMaterialsCost: r.rawMaterialsCost,
      laborCost: r.laborCost,
      transportCost: r.transportCost,
      storageCost: r.storageCost,
      processingCost: r.processingCost,
      otherIndirectCosts: r.otherIndirectCosts,
      totalDirectCost: r.totalDirectCost,
      totalIndirectCost: r.totalIndirectCost,
      totalCost: r.totalCost,
      costPerKg: r.costPerKg,
      margin: r.marginPercent,
      suggestedPrice: r.suggestedPrice,
      potentialMargin: r.potentialMargin,
      calculatedAt: r.createdAt || new Date().toISOString(),
      userId: r.userId,
    };
  }

  emitNewCalculation(): void {
    this.newCalculation.emit();
  }
}
