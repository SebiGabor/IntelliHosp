import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

import { styles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('register-hospital')
export class AppRegister extends LitElement {
  @property() hospitalName = '';
  @property() county = '';
  @property() city = '';
  @property() adminEmail = '';
  @property() adminPassword = '';


  static styles = [
    styles,
    css`
    #registerForm {
      max-width: 400px;
      margin: 0 auto;
    }

    #registerCard {
      padding: 18px;
    }

    sl-input, sl-button, sl-select {
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
    }`
  ]

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="registerForm">
          <sl-card id="registerCard">
            <h2>Înregistrați spitalul</h2>
            <div class="icon-button-color">
              <sl-icon-button name="info-circle" href="${resolveRouterPath('about')}" label="Info"></sl-icon-button>
            </div>
            <form @submit=${this.register}>
              <sl-input label="Nume spital" type="text" name="hospitalName" @input=${this.handleHospitalNameInput}></sl-input>
              <sl-select label="Județ" name="county" @sl-change=${this.handleCountyChange}>
                <sl-menu>
                  <sl-menu-item value="county1">County 1</sl-menu-item>
                  <sl-menu-item value="county2">County 2</sl-menu-item>
                  <!-- Add more counties as needed -->
                </sl-menu>
              </sl-select>
              <sl-select label="Localitate" name="city" @sl-change=${this.handleCityChange}>
                <!-- Populate options based on selected county -->
                <sl-menu>
                  <sl-menu-item value="city1">City 1</sl-menu-item>
                  <sl-menu-item value="city2">City 2</sl-menu-item>
                  <!-- Add more cities as needed -->
                </sl-menu>
              </sl-select>
              <sl-input label="Email administrator" type="email" name="adminEmail" @input=${this.handleAdminEmailInput}></sl-input>
              <sl-input label="Parolă administrator" type="password" name="adminPassword" @input=${this.handleAdminPasswordInput}></sl-input>
              <sl-button variant="primary" submit>Înregistrează</sl-button>
            </form>
            <a href="${resolveRouterPath('home')}">Înapoi la pagina de start</a>
          </sl-card>
        </div>
      </main>
    `;
  }

  handleHospitalNameInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.hospitalName = input.value;
  }

  handleCountyChange(event: CustomEvent) {
    this.county = (event.target as HTMLSelectElement).value;
    // Reset city when county changes
    this.city = '';
  }

  handleCityChange(event: CustomEvent) {
    this.city = (event.target as HTMLSelectElement).value;
  }

  handleAdminEmailInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.adminEmail = input.value;
  }

  handleAdminPasswordInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.adminPassword = input.value;
  }

  register(event: Event) {
    event.preventDefault();
    // Implement registration logic here
    console.log('Registering hospital with:', this.hospitalName, this.county, this.city, this.adminEmail, this.adminPassword);
    // Redirect to home or perform any other necessary actions after registration
  }

}
