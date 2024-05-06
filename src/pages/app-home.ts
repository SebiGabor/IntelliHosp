import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  @property() message = 'Bine ai venit la IntelliHosp!';
  @property() username = '';
  @property() password = '';

  static styles = [
    styles,
    css`
    #loginForm {
      max-width: 400px;
      margin: 0 auto;
    }

    #loginCard {
      padding: 18px;
    }

    sl-input, sl-button {
      margin-bottom: 16px;
    }

    a[href] {
      margin-top: 16px;
        color: var(--ih-primary-color-2);
        text-decoration: none;
        border-bottom: 2px solid var(--ih-primary-color-2);
        transition: color 0.3s ease, border-color 0.3s ease;

        &:hover {
          color: var(--ih-primary-color-3);
          border-color: var(--ih-primary-color-3);
        }
    }
    `
];

  async firstUpdated() {
    console.log('Aceasta este pagina de start a aplicației IntelliHosp!');
  }

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="loginForm">
          <sl-card id="loginCard">
            <h2>${this.message}</h2>
            <div class="icon-button-color">
              <sl-icon-button name="info-circle" href="${resolveRouterPath('about')}" label="Info"></sl-icon-button>
            </div>
            <form @submit=${this.login}>
              <sl-input label="Username" type="text" name="username" @input=${this.handleUsernameInput}></sl-input>
              <sl-input label="Parolă" type="password" name="password" @input=${this.handlePasswordInput}></sl-input>
              <sl-button variant="primary" submit>Login</sl-button>
            </form>
            <a href="${resolveRouterPath('registerHospital')}">Înregistrați spitalul</a>
          </sl-card>
        </div>
      </main>
    `;
  }

  handleUsernameInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.username = input.value;
  }

  handlePasswordInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
  }

  login(event: Event) {
    event.preventDefault();
    // Implement login logic here
    console.log('Logging in with:', this.username, this.password);
    // Redirect to the dashboard or perform any other necessary actions after login
  }
}
