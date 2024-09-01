import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITransport, NewTransport } from '../transport.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransport for edit and NewTransportFormGroupInput for create.
 */
type TransportFormGroupInput = ITransport | PartialWithRequiredKeyOf<NewTransport>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITransport | NewTransport> = Omit<T, 'estimatedDeliveryTime'> & {
  estimatedDeliveryTime?: string | null;
};

type TransportFormRawValue = FormValueOf<ITransport>;

type NewTransportFormRawValue = FormValueOf<NewTransport>;

type TransportFormDefaults = Pick<NewTransport, 'id' | 'estimatedDeliveryTime'>;

type TransportFormGroupContent = {
  id: FormControl<TransportFormRawValue['id'] | NewTransport['id']>;
  vehicleType: FormControl<TransportFormRawValue['vehicleType']>;
  driverName: FormControl<TransportFormRawValue['driverName']>;
  driverPhone: FormControl<TransportFormRawValue['driverPhone']>;
  trackingNumber: FormControl<TransportFormRawValue['trackingNumber']>;
  status: FormControl<TransportFormRawValue['status']>;
  estimatedDeliveryTime: FormControl<TransportFormRawValue['estimatedDeliveryTime']>;
  order: FormControl<TransportFormRawValue['order']>;
};

export type TransportFormGroup = FormGroup<TransportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransportFormService {
  createTransportFormGroup(transport: TransportFormGroupInput = { id: null }): TransportFormGroup {
    const transportRawValue = this.convertTransportToTransportRawValue({
      ...this.getFormDefaults(),
      ...transport,
    });
    return new FormGroup<TransportFormGroupContent>({
      id: new FormControl(
        { value: transportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      vehicleType: new FormControl(transportRawValue.vehicleType),
      driverName: new FormControl(transportRawValue.driverName),
      driverPhone: new FormControl(transportRawValue.driverPhone),
      trackingNumber: new FormControl(transportRawValue.trackingNumber),
      status: new FormControl(transportRawValue.status),
      estimatedDeliveryTime: new FormControl(transportRawValue.estimatedDeliveryTime),
      order: new FormControl(transportRawValue.order),
    });
  }

  getTransport(form: TransportFormGroup): ITransport | NewTransport {
    return this.convertTransportRawValueToTransport(form.getRawValue() as TransportFormRawValue | NewTransportFormRawValue);
  }

  resetForm(form: TransportFormGroup, transport: TransportFormGroupInput): void {
    const transportRawValue = this.convertTransportToTransportRawValue({ ...this.getFormDefaults(), ...transport });
    form.reset(
      {
        ...transportRawValue,
        id: { value: transportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TransportFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      estimatedDeliveryTime: currentTime,
    };
  }

  private convertTransportRawValueToTransport(rawTransport: TransportFormRawValue | NewTransportFormRawValue): ITransport | NewTransport {
    return {
      ...rawTransport,
      estimatedDeliveryTime: dayjs(rawTransport.estimatedDeliveryTime, DATE_TIME_FORMAT),
    };
  }

  private convertTransportToTransportRawValue(
    transport: ITransport | (Partial<NewTransport> & TransportFormDefaults),
  ): TransportFormRawValue | PartialWithRequiredKeyOf<NewTransportFormRawValue> {
    return {
      ...transport,
      estimatedDeliveryTime: transport.estimatedDeliveryTime ? transport.estimatedDeliveryTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
