import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { router, resolveRouterPath } from '../router';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = localStorage.getItem('hospitalName') ?? '';

  @property({ type: Boolean }) enableBack = false;
  @property({ type: Boolean }) enableLogOut = false;
  @property({ type: Boolean }) enableTitle = true;
  @property({ type: String }) backPath = '';

  static styles = css`
    header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      background: var(--app-color-primary);
      color: white;
      height: auto;
      padding: 0 16px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      -webkit-app-region: drag;
    }

    .title-container {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 8px;
    }

    .back-button {
      margin-right: 8px;
    }

    .log-out-container {
      justify-self: end;
      padding-top: 8px;
    }

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      word-wrap: break-word;
      white-space: normal;
      padding-left:5px;
    }

    @media (max-width: 600px) {
      header {
        padding: 8px;
        grid-template-columns: auto 1fr auto;
      }

      h1 {
        font-size: 18px;
      }

      sl-button::part(base) {
        font-size: 14px;
        padding: 0;
        margin: 0 4px;
      }

      .log-out-container {
        padding-top: 4px;
      }
    }
  `;

  logout() {
    localStorage.clear();
    sessionStorage.clear();

    fetch('/logout', { method: 'POST' })
      .then(() => {
        router.navigate(resolveRouterPath('app-home'));
        history.pushState(null, document.title, location.href);
        window.addEventListener('popstate', function () {
          history.pushState(null, document.title, location.href);
        });
      })
      .catch(err => console.error('Logout failed', err));
  }

  render() {
    return html`
      <header>
        <div class="title-container">
          ${this.enableBack ? html`
            <sl-button href="${resolveRouterPath(this.backPath)}">Înapoi</sl-button>
          ` : ''}
          ${this.enableTitle ? html`<h1>${this.title}</h1>` : ''}
        </div>
        <div class="log-out-container">
          ${this.enableLogOut ? html`
            <sl-button @click="${this.logout}">Delogare</sl-button>
          ` : ''}
        </div>
      </header>
    `;
  }
}
