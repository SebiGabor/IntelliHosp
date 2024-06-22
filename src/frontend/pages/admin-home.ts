import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('admin-home')
export class AdminHome extends LitElement {

  static styles = css`
    :host {
        display: block;
        margin: auto;
        max-width: 800px;
        padding-top: 40px;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - (headerHeight + 32px));
    }

    #adminCard {
        max-width: 600px;
        padding: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    sl-button {
        margin: 16px 0;
        width: 100%;
        max-width: 400px;
    }

    sl-button:first-child {
        margin-top: 0;
    }

    sl-button:last-child {
        margin-bottom: 0;
    }
`;




  render() {
    return html`
      <app-header ?enableLogOut="${true}"></app-header>

      <main>
        <sl-card id="adminCard">
          <div class="card-body">
            <sl-button variant="primary" href="${resolveRouterPath('admin-personnel')}">Personal spital</sl-button>
            <sl-button variant="primary" href="${resolveRouterPath('admin-care-plan')}">Plan de îngrijiri</sl-button>
          </div>
        </sl-card>
      </main>
    `;
  }
}
