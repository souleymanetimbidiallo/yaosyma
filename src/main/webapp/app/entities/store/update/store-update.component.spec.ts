import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { StoreService } from '../service/store.service';
import { IStore } from '../store.model';
import { StoreFormService } from './store-form.service';

import { StoreUpdateComponent } from './store-update.component';

describe('Store Management Update Component', () => {
  let comp: StoreUpdateComponent;
  let fixture: ComponentFixture<StoreUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let storeFormService: StoreFormService;
  let storeService: StoreService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreUpdateComponent],
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
      .overrideTemplate(StoreUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StoreUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    storeFormService = TestBed.inject(StoreFormService);
    storeService = TestBed.inject(StoreService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const store: IStore = { id: 456 };
      const owner: IUser = { id: 16366 };
      store.owner = owner;

      const userCollection: IUser[] = [{ id: 5667 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [owner];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ store });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const store: IStore = { id: 456 };
      const owner: IUser = { id: 2831 };
      store.owner = owner;

      activatedRoute.data = of({ store });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(owner);
      expect(comp.store).toEqual(store);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStore>>();
      const store = { id: 123 };
      jest.spyOn(storeFormService, 'getStore').mockReturnValue(store);
      jest.spyOn(storeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ store });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: store }));
      saveSubject.complete();

      // THEN
      expect(storeFormService.getStore).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(storeService.update).toHaveBeenCalledWith(expect.objectContaining(store));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStore>>();
      const store = { id: 123 };
      jest.spyOn(storeFormService, 'getStore').mockReturnValue({ id: null });
      jest.spyOn(storeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ store: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: store }));
      saveSubject.complete();

      // THEN
      expect(storeFormService.getStore).toHaveBeenCalled();
      expect(storeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStore>>();
      const store = { id: 123 };
      jest.spyOn(storeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ store });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(storeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
