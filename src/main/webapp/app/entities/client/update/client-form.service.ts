import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IClient, NewClient } from '../client.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClient for edit and NewClientFormGroupInput for create.
 */
type ClientFormGroupInput = IClient | PartialWithRequiredKeyOf<NewClient>;

type ClientFormDefaults = Pick<NewClient, 'id'>;

type ClientFormGroupContent = {
  id: FormControl<IClient['id'] | NewClient['id']>;
  firstName: FormControl<IClient['firstName']>;
  lastName: FormControl<IClient['lastName']>;
  companyName: FormControl<IClient['companyName']>;
  email: FormControl<IClient['email']>;
  phone: FormControl<IClient['phone']>;
  password: FormControl<IClient['password']>;
  address: FormControl<IClient['address']>;
  user: FormControl<IClient['user']>;
};

export type ClientFormGroup = FormGroup<ClientFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClientFormService {
  createClientFormGroup(client: ClientFormGroupInput = { id: null }): ClientFormGroup {
    const clientRawValue = {
      ...this.getFormDefaults(),
      ...client,
    };
    return new FormGroup<ClientFormGroupContent>({
      id: new FormControl(
        { value: clientRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      firstName: new FormControl(clientRawValue.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(clientRawValue.lastName, {
        validators: [Validators.required],
      }),
      companyName: new FormControl(clientRawValue.companyName),
      email: new FormControl(clientRawValue.email, {
        validators: [Validators.required],
      }),
      phone: new FormControl(clientRawValue.phone, {
        validators: [Validators.required],
      }),
      password: new FormControl(clientRawValue.password, {
        validators: [Validators.required],
      }),
      address: new FormControl(clientRawValue.address, {
        validators: [Validators.required],
      }),
      user: new FormControl(clientRawValue.user),
    });
  }

  getClient(form: ClientFormGroup): IClient | NewClient {
    return form.getRawValue() as IClient | NewClient;
  }

  resetForm(form: ClientFormGroup, client: ClientFormGroupInput): void {
    const clientRawValue = { ...this.getFormDefaults(), ...client };
    form.reset(
      {
        ...clientRawValue,
        id: { value: clientRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ClientFormDefaults {
    return {
      id: null,
    };
  }
}
