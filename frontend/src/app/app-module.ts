import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app";
import { importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing-module";

import { LoginComponent } from "./pages/login/login";
import { UsuariosComponent } from "./pages/usuarios/usuarios";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      FormsModule
    )
  ]
}).catch(err => console.error(err));