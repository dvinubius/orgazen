import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  generateTags({ title = '', description = '', image = '' }) {
    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'og:url', content: 'https://orgazen.herokuapp.com/' },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@nubius_d' },
    ]);
  }
}
