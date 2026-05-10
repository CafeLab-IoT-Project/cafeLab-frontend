import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/infrastructure/AuthService';

/**
 * Mapa canónico entre los planes del backend y la ruta de dashboard que les corresponde.
 *
 * Centralizar este mapping evita la divergencia que tenían los `goToHome()` duplicados en
 * cada vista (algunos respetaban `user.home`, otros no, algunos caían a `/login` cuando no
 * había plan y otros a `/`). Todos los breadcrumbs deben usar este servicio.
 */
const PLAN_TO_DASHBOARD_ROUTE: Readonly<Record<string, string>> = {
  barista: '/dashboard/barista',
  owner: '/dashboard/owner',
  full: '/dashboard/complete',
};

/** Ruta por defecto cuando no podemos resolver un dashboard concreto (sin plan o sin sesión). */
const FALLBACK_LOGIN_ROUTE = '/login';

@Injectable({ providedIn: 'root' })
export class DashboardNavigationService {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /**
   * Calcula a qué ruta debería ir "Inicio" (el primer ítem del breadcrumb) para el
   * usuario en sesión. Prioriza el atributo `home` del usuario (configurable desde
   * el backend) y, si no existe, cae al dashboard del plan contratado.
   */
  getHomeRoute(): string {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return FALLBACK_LOGIN_ROUTE;
    }
    if (user.home) {
      return user.home;
    }
    return PLAN_TO_DASHBOARD_ROUTE[user.plan] ?? FALLBACK_LOGIN_ROUTE;
  }

  /** Navega al dashboard que corresponde al usuario actual. */
  goToHome(): void {
    void this.router.navigate([this.getHomeRoute()]);
  }
}
