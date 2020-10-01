import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginator: any;
  pages: number[];

  since: number;
  until: number;

  constructor() { }

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginatorActual = changes['paginator'];

    if(paginatorActual.previousValue){
      this.initPaginator();
    }
  }



  initPaginator(): void{
    this.since = Math.min(Math.max(1, this.paginator.number-4), this.paginator.total-5);
    this.until = Math.max(Math.min(this.paginator.totalPages, this.paginator.number+4), 6);

    if(this.paginator.totalPages > 5){
      this.pages = new Array(this.until - this.since + 1).fill(0).map((_value, index) => index + this.since);

    }else{
      this.pages = new Array(this.paginator.totalPages).fill(0).map((_value, index) => index+1);
    }
  }

}
