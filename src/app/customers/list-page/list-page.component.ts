import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  customers: Observable<any>;

  constructor(
    private seo: SeoService,
    private db: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Success Stories',
      description: 'People happy with OrgaZen',
    });
    this.customers = this.db
      .collection('customers')
      .valueChanges({ idField: 'id' });
  }

  showDisclaimer(): void {
    this.dialog.open(DisclaimerComponent, {
      width: '500px',
    });
  }
}
