import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  listCurses: string[] = ['TypeScript', 'JavaScript', 'Java', 'C#'];

  hide: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  setHide(): void {
    this.hide = (this.hide == true) ? false: true
  }
}
