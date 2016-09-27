import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

declare const emojione;
// emojione.imagePathSVGSprites = '//cdn.jsdelivr.net/emojione/assets/sprites/emojione.sprites.svg'

platformBrowserDynamic().bootstrapModule(AppModule);
