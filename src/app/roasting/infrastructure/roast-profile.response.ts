import type { BaseResource, BaseResponse } from '../../shared/infrastructure/base-resource';

export interface RoastProfileListResponse extends BaseResponse {}

/**
 * Alineado con {@code RoastProfileResource} del backend.
 *
 * El record Java serializa el id del lote como {@code coffeeLotId} en GET, mientras que en los
 * cuerpos POST/PUT el backend espera {@code lot} (ver {@link CreateRoastProfileBody},
 * {@link UpdateRoastProfileBody}).
 */
export interface RoastProfileResource extends BaseResource {
  userId: number;
  name: string;
  type: string;
  duration: number;
  tempStart: number;
  tempEnd: number;
  isFavorite: boolean;
  createdAt?: string;
  coffeeLotId: number;
}

export interface CreateRoastProfileBody {
  name: string;
  type: string;
  duration: number;
  tempStart: number;
  tempEnd: number;
  lot: number;
  isFavorite?: boolean;
}

export interface UpdateRoastProfileBody {
  name: string;
  type: string;
  duration: number;
  tempStart: number;
  tempEnd: number;
  lot: number;
  isFavorite: boolean;
}