import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TransportComponent } from './list/transport.component';
import { TransportDetailComponent } from './detail/transport-detail.component';
import { TransportUpdateComponent } from './update/transport-update.component';
import TransportResolve from './route/transport-routing-resolve.service';

const transportRoute: Routes = [
  {
    path: '',
    component: TransportComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransportDetailComponent,
    resolve: {
      transport: TransportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransportUpdateComponent,
    resolve: {
      transport: TransportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransportUpdateComponent,
    resolve: {
      transport: TransportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default transportRoute;
