// ng1/2 hybrid
import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';

import { TeamsModule } from './team2/team.module';

// a placeholder component that acts as a root component for angular 2 modules
@Component({
  selector : 'ng2-router-root',
  template: `
    <div id="ng1" ng-cloak>
      <!-- top bar -->
      <md-toolbar class="md-hue-2">
        <div class="md-toolbar-tools">
          <h2>
            <span>Football teams</span>
          </h2>
          <span flex></span>
        </div>
      </md-toolbar>

      <section layout="row" flex style="height: 100%">
        <!-- Main content area -->
        <md-content flex layout-padding>

          <!-- Route-based content -->
          <div layout="column" layout-align="top">
            <div class="ng-view"></div>
            <router-outlet></router-outlet>
          </div>

          <!-- Loading indicator -->
          <div ng-show="loading" layout="row" layout-sm="column" layout-align="center center">
            <md-progress-circular md-mode="indeterminate"></md-progress-circular>
          </div>
        </md-content>
      </section>
    </div>
  `
})
export class Ng2RouterRoot {}


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
    RouterModule.forRoot([], {useHash: true}),
    TeamsModule,
    UpgradeModule,
  ],
  declarations: [Ng2RouterRoot],
  bootstrap: [Ng2RouterRoot],
  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
