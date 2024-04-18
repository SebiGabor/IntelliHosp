import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { styles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('register-hospital')
export class AppRegister extends LitElement {
  static styles = [
    styles,
    css`
    @media(min-width: 1000px) {
        sl-card {
        max-width: 70vw;
        }
    }

    main {
        margin-left: 25px;
    }`
  ]

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>Înregistrare</h2>

        <sl-card>
          <h2>Înregistrare spital</h2>

          <p>IntelliHosp este un proiect pentru gestionarea fișelor de îngrijiri ale pacienților din spitale.
          Aplicația este dezvoltată în primă fază de către Sebastian Gabor în cadrul proiectului de licență.</p>
          </p>

        </sl-card>
      </main>
    `;
  }
}
