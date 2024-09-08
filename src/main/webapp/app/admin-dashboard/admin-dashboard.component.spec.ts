import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Ajout pour prendre en charge les composants externes

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent], // Déclarer le composant ici
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajouter CUSTOM_ELEMENTS_SCHEMA pour les composants comme <fa-icon>
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
