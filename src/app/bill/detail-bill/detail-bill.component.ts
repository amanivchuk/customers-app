import { Component, OnInit } from '@angular/core';
import {BillService} from '../bill.service';
import {Bill} from '../model/Bill';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.css']
})
export class DetailBillComponent implements OnInit {

  bill: Bill;
  title: string = 'Bill';

  constructor(
    private billService: BillService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.billService.getBill(id).subscribe(result => {
        this.bill = result;
      });
    })
  }

}
