import { IDriver } from 'app/entities/driver/driver.model';

export interface IVehicle {
  id: number;
  vehicleName?: string | null;
  licensePlate?: string | null;
  serialNumber?: string | null;
  insurance?: string | null;
  vehicleType?: string | null;
  gpsTracker?: string | null;
  driver?: Pick<IDriver, 'id' | 'firstName'> | null;
}

export type NewVehicle = Omit<IVehicle, 'id'> & { id: null };
