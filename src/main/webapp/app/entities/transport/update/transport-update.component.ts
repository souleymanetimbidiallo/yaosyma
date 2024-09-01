import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';
import { TransportStatus } from 'app/entities/enumerations/transport-status.model';
import { TransportService } from '../service/transport.service';
import { ITransport } from '../transport.model';
import { TransportFormService, TransportFormGroup } from './transport-form.service';

@Component({
  standalone: true,
  selector: 'jhi-transport-update',
  templateUrl: './transport-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TransportUpdateComponent implements OnInit {
  isSaving = false;
  transport: ITransport | null = null;
  transportStatusValues = Object.keys(TransportStatus);

  ordersSharedCollection: IOrder[] = [];

  protected transportService = inject(TransportService);
  protected transportFormService = inject(TransportFormService);
  protected orderService = inject(OrderService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TransportFormGroup = this.transportFormService.createTransportFormGroup();

  compareOrder = (o1: IOrder | null, o2: IOrder | null): boolean => this.orderService.compareOrder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transport }) => {
      this.transport = transport;
      if (transport) {
        this.updateForm(transport);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transport = this.transportFormService.getTransport(this.editForm);
    if (transport.id !== null) {
      this.subscribeToSaveResponse(this.transportService.update(transport));
    } else {
      this.subscribeToSaveResponse(this.transportService.create(transport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransport>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(transport: ITransport): void {
    this.transport = transport;
    this.transportFormService.resetForm(this.editForm, transport);

    this.ordersSharedCollection = this.orderService.addOrderToCollectionIfMissing<IOrder>(this.ordersSharedCollection, transport.order);
  }

  protected loadRelationshipsOptions(): void {
    this.orderService
      .query()
      .pipe(map((res: HttpResponse<IOrder[]>) => res.body ?? []))
      .pipe(map((orders: IOrder[]) => this.orderService.addOrderToCollectionIfMissing<IOrder>(orders, this.transport?.order)))
      .subscribe((orders: IOrder[]) => (this.ordersSharedCollection = orders));
  }
}
