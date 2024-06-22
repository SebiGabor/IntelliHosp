import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { styles } from '../styles/information-styles';

import { styles as sharedStyles } from '../styles/shared-styles'

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-about')
export class AppAbout extends LitElement {
  static styles = [
    sharedStyles,
    styles,
    css`
    :host {
      display: block;
      margin: auto;
      max-width: 800px;
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    sl-card {
      width: 100%;
      max-width: 600px;
    }
    `
  ]

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>Despre</h2>

        <sl-card>
          <h2>Despre aplicație</h2>

          <p>IntelliHosp este un proiect pentru gestionarea fișelor de îngrijiri ale pacienților din spitale.
          Aplicația este dezvoltată în primă fază de către Sebastian Gabor în cadrul proiectului de licență.</p>
          </p>

        </sl-card>
      </main>
    `;
  }
}
