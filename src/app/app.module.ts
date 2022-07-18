
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';

import { Contact } from "./services/contact.resource";
import { ContactService } from "./services/contact.service";
import { toasterServiceProvider } from "./ajs-upgraded-providers";
import { SearchComponent } from "./components/search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { CardComponent } from './components/card.component';
import { SpinnerComponent } from './components/spinner.component';
import { PersonListComponent } from './components/person-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [
    Contact,
    ContactService,
    toasterServiceProvider
  ],
  declarations: [
    SearchComponent,
    DefaultImagePipe,
    CardComponent,
    SpinnerComponent,
    PersonListComponent
  ],
  entryComponents: [
    // if we are using components in Angular JS then we need to add those here in entryComponents.
    SearchComponent,
    CardComponent,
    SpinnerComponent,
    PersonListComponent
  ]
})
export class AppModule {
  // Override Angular bootstrap so it doesn't do anything
  ngDoBootstrap() {
  }
}

// Bootstrap using the UpgradeModule
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  console.log("Bootstrapping in Hybrid mode with Angular & AngularJS");
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, ['codecraft']);
});