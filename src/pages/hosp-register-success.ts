import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { styles } from '../styles/information-styles';

import { styles as sharedStyles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('hosp-register-success')
export class AppAbout extends LitElement {
  static styles = [
    sharedStyles,
    styles,
    css`
    :host {
      display: block;
      margin: auto; /* Center the component horizontally */
      max-width: 800px; /* Set maximum width for responsiveness */
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center; /* Center its children horizontally */
      padding: 20px; /* Add padding for spacing */
    }

    sl-card {
      width: 100%; /* Make the card responsive */
      max-width: 600px; /* Set maximum width for responsiveness */
    }
    `
  ]

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>Success</h2>

        <sl-card>
          <h2>Spitalul a fost înregistrat cu succes!</h2>

          <p>Verificați adresa de email pentru a obține credențialele de autentificare în aplicație.</p>
          <p>În caz că nu apare mailul de la IntelliHosp, verificați și în folderul de spam!</p>
          </p>

        </sl-card>
      </main>
    `;
  }
}
