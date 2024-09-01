import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IStore } from '../store.model';

@Component({
  standalone: true,
  selector: 'jhi-store-detail',
  templateUrl: './store-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class StoreDetailComponent {
  store = input<IStore | null>(null);

  previousState(): void {
    window.history.back();
  }
}
