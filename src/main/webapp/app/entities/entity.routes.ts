import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'yaosymaApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'store',
    data: { pageTitle: 'yaosymaApp.store.home.title' },
    loadChildren: () => import('./store/store.routes'),
  },
  {
    path: 'product',
    data: { pageTitle: 'yaosymaApp.product.home.title' },
    loadChildren: () => import('./product/product.routes'),
  },
  {
    path: 'order',
    data: { pageTitle: 'yaosymaApp.order.home.title' },
    loadChildren: () => import('./order/order.routes'),
  },
  {
    path: 'order-item',
    data: { pageTitle: 'yaosymaApp.orderItem.home.title' },
    loadChildren: () => import('./order-item/order-item.routes'),
  },
  {
    path: 'transport',
    data: { pageTitle: 'yaosymaApp.transport.home.title' },
    loadChildren: () => import('./transport/transport.routes'),
  },
  {
    path: 'payment',
    data: { pageTitle: 'yaosymaApp.payment.home.title' },
    loadChildren: () => import('./payment/payment.routes'),
  },
  {
    path: 'user-profile',
    data: { pageTitle: 'yaosymaApp.userProfile.home.title' },
    loadChildren: () => import('./user-profile/user-profile.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
