import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SupplierDetailComponent } from './supplier-detail.component';

describe('Supplier Management Detail Component', () => {
  let comp: SupplierDetailComponent;
  let fixture: ComponentFixture<SupplierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SupplierDetailComponent,
              resolve: { supplier: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SupplierDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load supplier on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SupplierDetailComponent);

      // THEN
      expect(instance.supplier()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
