import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  customerId: string;
  customer: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((resp) => {
      const customer = resp.customer;
      this.seo.generateTags({
        title: customer.name,
        description: customer.description,
        image: customer.image,
      });
    });

    this.customerId = this.route.snapshot.paramMap.get('id');
    this.customer = this.db
      .collection('customers')
      .doc<any>(this.customerId)
      .valueChanges();
  }

  get getURL(): string {
    return `https://orgazen.herokuapp.com/customers/${this.customerId}`;
  }
}
