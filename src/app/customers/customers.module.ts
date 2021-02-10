import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ListPageComponent, DetailPageComponent, DisclaimerComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    CustomersRoutingModule,
    SharedModule,
    ClipboardModule,
    MatDialogModule,
  ],
})
export class CustomersModule {}
