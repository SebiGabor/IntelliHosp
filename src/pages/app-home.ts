import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  @property() message = 'Logare IntelliHosp';
  @property() username = '';
  @property() password = '';

  static styles = [
    styles,
    css`
    #loginForm {
      max-width: 600px;
      margin: 0 auto;
    }

    #loginCard {
      padding: 18px;
    }

    sl-input, sl-button {
      margin-bottom: 16px;
    }

    h2 {
      display: inline-block;
      margin-bottom: 16px;
    }

    .icon-button-color sl-icon-button {
      --icon-color: blue;
    }
    `
  ];

  async firstUpdated() {
    registerIconLibrary('default', {
      resolver: name => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0/icons/${name}.svg`
    });
    console.log('Aceasta este pagina de start a aplicației IntelliHosp!');
  }

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="loginForm">
          <sl-card id="loginCard">
            <h2>${this.message}</h2>
            <sl-icon-button name="info-circle" label="Info" href="${resolveRouterPath('about')}"></sl-icon-button>
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
