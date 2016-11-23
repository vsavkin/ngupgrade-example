// ng1/2 hybrid
import { Component, NgModule, OpaqueToken, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, UrlHandlingStrategy } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';

import { TeamsModule } from './team2/team.module';

export const ROOT_OUTLET_LOADED = new OpaqueToken('ROOT_OUTLET_LOADED');
export function routerOutletLoaded() {
  let resolve:any = null;
  const done = new Promise(r => resolve = r);
  return {done, resolve};
}

// a placeholder component that acts as a root component for angular 2 modules
@Component({
  selector : 'ng2-router-root',
  template: `<div><router-outlet></router-outlet></div>`
})
export class Ng2RouterRoot {
  constructor(@Inject(ROOT_OUTLET_LOADED) loaded:any) {
    loaded.resolve(null);
  }
}

/**
 * Application-specific custom URL handling strategy.  This tells the
 * Angular 2 router to handle only a subset of our application.
 */
export class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: any) { return url.toString().startsWith('/teams'); }
  extract(url: any) { return url; }
  merge(url: any, whole: any) { return url; }
}


/**
 * Root module for angular 2 for the app.
 */
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: false, useHash: true}),
    TeamsModule,
    UpgradeModule,
  ],
  declarations: [Ng2RouterRoot],
  entryComponents: [Ng2RouterRoot],
  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy },
    { provide: ROOT_OUTLET_LOADED, useFactory: routerOutletLoaded }
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
