import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TransportDetailComponent } from './transport-detail.component';

describe('Transport Management Detail Component', () => {
  let comp: TransportDetailComponent;
  let fixture: ComponentFixture<TransportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TransportDetailComponent,
              resolve: { transport: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TransportDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load transport on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TransportDetailComponent);

      // THEN
      expect(instance.transport()).toEqual(expect.objectContaining({ id: 123 }));
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
