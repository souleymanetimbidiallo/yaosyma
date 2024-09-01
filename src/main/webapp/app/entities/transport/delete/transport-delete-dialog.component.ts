import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITransport } from '../transport.model';
import { TransportService } from '../service/transport.service';

@Component({
  standalone: true,
  templateUrl: './transport-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TransportDeleteDialogComponent {
  transport?: ITransport;

  protected transportService = inject(TransportService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transportService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
