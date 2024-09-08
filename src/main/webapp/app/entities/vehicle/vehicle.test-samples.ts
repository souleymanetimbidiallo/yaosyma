import { IVehicle, NewVehicle } from './vehicle.model';

export const sampleWithRequiredData: IVehicle = {
  id: 5289,
  vehicleName: 'personnel professionnel dense',
  licensePlate: 'de',
  serialNumber: 'super diplomate',
  insurance: 'tant que ding main-d’œuvre',
  vehicleType: 'alors',
};

export const sampleWithPartialData: IVehicle = {
  id: 18739,
  vehicleName: 'en outre de',
  licensePlate: 'avant que sitôt que membre de l’équipe',
  serialNumber: 'reculer pschitt',
  insurance: 'aigre apporter dès que',
  vehicleType: 'exiger perplexe vlan',
  gpsTracker: 'vite incalculable secouriste',
};

export const sampleWithFullData: IVehicle = {
  id: 4145,
  vehicleName: 'soudain',
  licensePlate: 'circulaire',
  serialNumber: 'pff',
  insurance: 'bang broum',
  vehicleType: 'du moment que oups',
  gpsTracker: 'dehors',
};

export const sampleWithNewData: NewVehicle = {
  vehicleName: 'serviable',
  licensePlate: 'chef à la faveur de jeune enfant',
  serialNumber: 'boum tant',
  insurance: 'à condition que',
  vehicleType: 'prout conseil municipal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
