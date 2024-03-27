import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  @property() message = 'Bine ai venit la IntelliHosp!';
  @property() username = '';
  @property() password = '';

  static styles = [
    styles,
    css`
    /* Add custom styles for the login form */
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
            <form @submit=${this.login}>
              <sl-input label="Username" type="text" name="username" @input=${this.handleUsernameInput}></sl-input>
              <sl-input label="Password" type="password" name="password" @input=${this.handlePasswordInput}></sl-input>
              <sl-button type="primary" submit>Login</sl-button>
            </form>
            <sl-button href="${resolveRouterPath('about')}" variant="primary">Despre aplicație</sl-button>
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
