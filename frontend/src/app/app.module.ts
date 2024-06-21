import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ApolloModule } from './apollo/apollo.module';
import {D3ChartComponent} from './charts/chart.component';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, D3ChartComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ApolloModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
