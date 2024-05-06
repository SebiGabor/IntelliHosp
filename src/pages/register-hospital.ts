import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

import { styles } from '../styles/shared-styles';

@customElement('register-hospital')
export class AppRegister extends LitElement {

  @property() hospitalName = '';
  @property() county = '';
  @property() adminEmail = '';
  @property() adminPassword = '';
  @property() counties: { judet: string, cod: string }[] = [];

  static styles = [
    styles,
    css`
    #registerForm {
      max-width: 400px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
    }

    #registerCard {
      padding: 18px;
    }
    sl-input, sl-button, sl-select {
      margin-bottom: 16px;
      width: 100%;
    }

    a[href] {
      margin-top: 16px;
      color: var(--ih-primary-color-2);
      text-decoration: none;
      display: block;
      transition: color 0.3s ease;
      border-bottom: none;
    }

    a[href]:hover {
      border-bottom: none;
    }

    @media (min-width: 768px) {
      #registerForm {
        max-width: 600px;
      }
    }
  `
  ];

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
                ${this.counties.map(county => html`<sl-option value="${county.cod}">${county.judet}</sl-option>`)}
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
    console.log('Registering hospital with:', this.hospitalName, this.county, this.adminEmail, this.adminPassword);
    // Redirect to home or perform any other necessary actions after registration
  }

  updated() {
    // Call fetchCSV function to load and process the CSV
    this.fetchCSV();
    console.log(this.counties[0].judet)
  }

  fetchCSV() {
    fetch('../assets/judete.csv')
      .then(response => response.text())
      .then(data => {
        this.processData(data);
      });
  }

  processData(csvData) {
  // Split CSV data into rows
  var rows = csvData.split('\n');
  this.counties = [];

  // Loop through rows and create options
  rows.forEach(row => {
    var [cod, judet] = row.split(',');
    if (judet && cod) { // Ensure both judet and cod are not empty
      this.counties.push({ judet: judet.trim(), cod: cod.trim() });
    }
  });
}

}
