import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVehicle, NewVehicle } from '../vehicle.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVehicle for edit and NewVehicleFormGroupInput for create.
 */
type VehicleFormGroupInput = IVehicle | PartialWithRequiredKeyOf<NewVehicle>;

type VehicleFormDefaults = Pick<NewVehicle, 'id'>;

type VehicleFormGroupContent = {
  id: FormControl<IVehicle['id'] | NewVehicle['id']>;
  vehicleName: FormControl<IVehicle['vehicleName']>;
  licensePlate: FormControl<IVehicle['licensePlate']>;
  serialNumber: FormControl<IVehicle['serialNumber']>;
  insurance: FormControl<IVehicle['insurance']>;
  vehicleType: FormControl<IVehicle['vehicleType']>;
  gpsTracker: FormControl<IVehicle['gpsTracker']>;
  driver: FormControl<IVehicle['driver']>;
};

export type VehicleFormGroup = FormGroup<VehicleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VehicleFormService {
  createVehicleFormGroup(vehicle: VehicleFormGroupInput = { id: null }): VehicleFormGroup {
    const vehicleRawValue = {
      ...this.getFormDefaults(),
      ...vehicle,
    };
    return new FormGroup<VehicleFormGroupContent>({
      id: new FormControl(
        { value: vehicleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      vehicleName: new FormControl(vehicleRawValue.vehicleName, {
        validators: [Validators.required],
      }),
      licensePlate: new FormControl(vehicleRawValue.licensePlate, {
        validators: [Validators.required],
      }),
      serialNumber: new FormControl(vehicleRawValue.serialNumber, {
        validators: [Validators.required],
      }),
      insurance: new FormControl(vehicleRawValue.insurance, {
        validators: [Validators.required],
      }),
      vehicleType: new FormControl(vehicleRawValue.vehicleType, {
        validators: [Validators.required],
      }),
      gpsTracker: new FormControl(vehicleRawValue.gpsTracker),
      driver: new FormControl(vehicleRawValue.driver),
    });
  }

  getVehicle(form: VehicleFormGroup): IVehicle | NewVehicle {
    return form.getRawValue() as IVehicle | NewVehicle;
  }

  resetForm(form: VehicleFormGroup, vehicle: VehicleFormGroupInput): void {
    const vehicleRawValue = { ...this.getFormDefaults(), ...vehicle };
    form.reset(
      {
        ...vehicleRawValue,
        id: { value: vehicleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): VehicleFormDefaults {
    return {
      id: null,
    };
  }
}
