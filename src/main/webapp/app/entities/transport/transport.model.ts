import dayjs from 'dayjs/esm';
import { IOrder } from 'app/entities/order/order.model';
import { TransportStatus } from 'app/entities/enumerations/transport-status.model';

export interface ITransport {
  id: number;
  vehicleType?: string | null;
  driverName?: string | null;
  driverPhone?: string | null;
  trackingNumber?: string | null;
  status?: keyof typeof TransportStatus | null;
  estimatedDeliveryTime?: dayjs.Dayjs | null;
  order?: Pick<IOrder, 'id'> | null;
}

export type NewTransport = Omit<ITransport, 'id'> & { id: null };
