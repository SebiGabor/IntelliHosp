import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './pages/app-home';
import './components/header';
import './styles/global.css';
import { router } from './router';

@customElement('app-index')
export default class AppIndex extends LitElement {
  static styles = css`
    main {
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 16px;
    }
  `;

  firstUpdated() {
    router.addEventListener('route-changed', () => {
      if ("startViewTransition" in document) {
        (document as any).startViewTransition(() => {
          this.addEventListener('updateComplete', () => {
            console.log('Update complete!');
        });
        this.requestUpdate();
        });
      }
      else {
        this.addEventListener('updateComplete', () => {
          console.log('Update complete!');
      });
      this.requestUpdate();
      }
    });
  }

  render() {
    if(router !== undefined && router !== null)
      return router.render();
    else
      console.error('Router is not defined');
  }
}