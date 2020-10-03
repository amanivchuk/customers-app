import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectiveComponent } from './directive/directive.component';
import { CustomerComponent } from './customer/customer.component';
import {CustomerService} from './customer/customer.service';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './customer/form/form.component';
import {FormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localeRU from '@angular/common/locales/ru';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatDatepickerModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { DetailComponent } from './customer/detail/detail.component';

registerLocaleData(localeRU, 'ru')

const routes: Routes = [
  {path: '', redirectTo: '/customers', pathMatch: 'full'},
  {path: 'directive', component: DirectiveComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'customers/page/:page', component: CustomerComponent},
  {path: 'customers/form', component: FormComponent},
  {path: 'customers/form/:id', component: FormComponent},
  // {path: 'customers/detail/:id', component: DetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    CustomerComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    CustomerService,
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
