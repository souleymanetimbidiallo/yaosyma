import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISupplier } from '../supplier.model';

@Component({
  standalone: true,
  selector: 'jhi-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SupplierDetailComponent {
  supplier = input<ISupplier | null>(null);

  previousState(): void {
    window.history.back();
  }
}
