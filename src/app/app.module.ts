import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './services/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MisLibrosComponent } from './books/mis-libros/mis-libros.component';
import { AgregarLibrosComponent } from './books/agregar-libros/agregar-libros.component';
import { AgregarClubsComponent } from './clubs/agregar-clubs/agregar-clubs.component';
import { MisClubsComponent } from './clubs/mis-clubs/mis-clubs.component';
import { VerClubsComponent } from './clubs/ver-clubs/ver-clubs.component';
import { VerLibrosComponent } from './books/ver-libros/ver-libros.component';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './registrer/registrer.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JoinClubModalComponent } from './clubs/join-club-modal/join-club-modal.component';

const router: Routes = [
  {path: "", component: MisLibrosComponent},
  {path: "agregarLibro", component: AgregarLibrosComponent},
  {path: "verClub/:id", component: VerClubsComponent},
  {path: "verLibro/:id", component: VerLibrosComponent},
  {path: "agregarClub", component: AgregarClubsComponent},
  {path: "misClubs", component: MisClubsComponent},
  {path: "login", component: LoginComponent},
  {path: "registrarse", component: RegistrerComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    MisLibrosComponent,
    AgregarLibrosComponent,
    AgregarClubsComponent,
    MisClubsComponent,
    VerClubsComponent,
    VerLibrosComponent,
    LoginComponent,
    RegistrerComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    JoinClubModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(router),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
