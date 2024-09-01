import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { StoreComponent } from './list/store.component';
import { StoreDetailComponent } from './detail/store-detail.component';
import { StoreUpdateComponent } from './update/store-update.component';
import StoreResolve from './route/store-routing-resolve.service';

const storeRoute: Routes = [
  {
    path: '',
    component: StoreComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StoreDetailComponent,
    resolve: {
      store: StoreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StoreUpdateComponent,
    resolve: {
      store: StoreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StoreUpdateComponent,
    resolve: {
      store: StoreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default storeRoute;
