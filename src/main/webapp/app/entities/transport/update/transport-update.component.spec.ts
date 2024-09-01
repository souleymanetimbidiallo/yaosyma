import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';
import { TransportService } from '../service/transport.service';
import { ITransport } from '../transport.model';
import { TransportFormService } from './transport-form.service';

import { TransportUpdateComponent } from './transport-update.component';

describe('Transport Management Update Component', () => {
  let comp: TransportUpdateComponent;
  let fixture: ComponentFixture<TransportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transportFormService: TransportFormService;
  let transportService: TransportService;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransportUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TransportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transportFormService = TestBed.inject(TransportFormService);
    transportService = TestBed.inject(TransportService);
    orderService = TestBed.inject(OrderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Order query and add missing value', () => {
      const transport: ITransport = { id: 456 };
      const order: IOrder = { id: 9119 };
      transport.order = order;

      const orderCollection: IOrder[] = [{ id: 12594 }];
      jest.spyOn(orderService, 'query').mockReturnValue(of(new HttpResponse({ body: orderCollection })));
      const additionalOrders = [order];
      const expectedCollection: IOrder[] = [...additionalOrders, ...orderCollection];
      jest.spyOn(orderService, 'addOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transport });
      comp.ngOnInit();

      expect(orderService.query).toHaveBeenCalled();
      expect(orderService.addOrderToCollectionIfMissing).toHaveBeenCalledWith(
        orderCollection,
        ...additionalOrders.map(expect.objectContaining),
      );
      expect(comp.ordersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const transport: ITransport = { id: 456 };
      const order: IOrder = { id: 13111 };
      transport.order = order;

      activatedRoute.data = of({ transport });
      comp.ngOnInit();

      expect(comp.ordersSharedCollection).toContain(order);
      expect(comp.transport).toEqual(transport);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransport>>();
      const transport = { id: 123 };
      jest.spyOn(transportFormService, 'getTransport').mockReturnValue(transport);
      jest.spyOn(transportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transport }));
      saveSubject.complete();

      // THEN
      expect(transportFormService.getTransport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transportService.update).toHaveBeenCalledWith(expect.objectContaining(transport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransport>>();
      const transport = { id: 123 };
      jest.spyOn(transportFormService, 'getTransport').mockReturnValue({ id: null });
      jest.spyOn(transportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transport: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transport }));
      saveSubject.complete();

      // THEN
      expect(transportFormService.getTransport).toHaveBeenCalled();
      expect(transportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransport>>();
      const transport = { id: 123 };
      jest.spyOn(transportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transportService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareOrder', () => {
      it('Should forward to orderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(orderService, 'compareOrder');
        comp.compareOrder(entity, entity2);
        expect(orderService.compareOrder).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
