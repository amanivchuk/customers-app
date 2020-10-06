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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormComponent } from './customer/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localeRU from '@angular/common/locales/ru';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { DetailComponent } from './customer/detail/detail.component';
import { LoginComponent } from './users/login/login.component';
import {AuthGuard} from './users/auth.guard';
import {RoleGuard} from './users/role.guard';
import {TokenInterceptor} from './users/interceptors/token.interceptor';
import {AuthInterceptor} from './users/interceptors/auth.interceptor';
import { DetailBillComponent } from './bill/detail-bill/detail-bill.component';
import { BillComponent } from './bill/bill/bill.component';

registerLocaleData(localeRU, 'ru')

const routes: Routes = [
  {path: '', redirectTo: '/customers', pathMatch: 'full'},
  {path: 'directive', component: DirectiveComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'customers/page/:page', component: CustomerComponent},
  {path: 'customers/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard],  data: {role: 'ROLE_ADMIN'}},
  {path: 'customers/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'bill/:id', component: DetailBillComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'bill/form/:customerId', component: BillComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}}
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
    DetailComponent,
    LoginComponent,
    DetailBillComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    CustomerService,
    {provide: LOCALE_ID, useValue: 'ru'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
