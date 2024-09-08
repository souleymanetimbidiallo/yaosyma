import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'yaosymaApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
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
    path: 'payment',
    data: { pageTitle: 'yaosymaApp.payment.home.title' },
    loadChildren: () => import('./payment/payment.routes'),
  },
  {
    path: 'user-profile',
    data: { pageTitle: 'yaosymaApp.userProfile.home.title' },
    loadChildren: () => import('./user-profile/user-profile.routes'),
  },
  {
    path: 'category',
    data: { pageTitle: 'yaosymaApp.category.home.title' },
    loadChildren: () => import('./category/category.routes'),
  },
  {
    path: 'supplier',
    data: { pageTitle: 'yaosymaApp.supplier.home.title' },
    loadChildren: () => import('./supplier/supplier.routes'),
  },
  {
    path: 'client',
    data: { pageTitle: 'yaosymaApp.client.home.title' },
    loadChildren: () => import('./client/client.routes'),
  },
  {
    path: 'driver',
    data: { pageTitle: 'yaosymaApp.driver.home.title' },
    loadChildren: () => import('./driver/driver.routes'),
  },
  {
    path: 'vehicle',
    data: { pageTitle: 'yaosymaApp.vehicle.home.title' },
    loadChildren: () => import('./vehicle/vehicle.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
