import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { DetailPageResolver } from './detail-page/detail-page-resolver.service';

const routes: Routes = [
  { path: '', component: ListPageComponent },
  {
    path: ':id',
    component: DetailPageComponent,
    resolve: {
      customer: DetailPageResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
