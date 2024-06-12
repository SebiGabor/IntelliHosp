import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = localStorage.getItem('hospitalName') ?? '';

  @property({ type: Boolean }) enableBack: boolean = false;
  @property({ type: Boolean }) enableLogOut: boolean = false;

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
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 8px;
    }

    .log-out-container {
      justify-self: end;
      padding-top: 8px; /* Add space from the top */
    }

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      word-wrap: break-word;
      white-space: normal; /* Allows text to wrap */
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
        padding-top: 4px; /* Adjust space for smaller screens */
      }
    }
  `;

  render() {
    return html`
      <header>
        <div>
          ${this.enableBack ? html`
            <sl-button href="${resolveRouterPath()}">Înapoi</sl-button>
          ` : ''}
        </div>
        <div class="title-container">
          <h1>${this.title}</h1>
        </div>
        <div class="log-out-container">
          ${this.enableLogOut ? html`
            <sl-button href="${resolveRouterPath()}">Delogare</sl-button>
          ` : ''}
        </div>
      </header>
    `;
  }
}
