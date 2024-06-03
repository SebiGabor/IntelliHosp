import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';

import { styles } from '../styles/shared-styles';

@customElement('register-hospital')
export class AppRegister extends LitElement {

  @property() title = 'Înregistrare spital';

  @property() hospitalName = '';
  @property() county = '';
  @property() adminEmail = '';
  @property() counties: { judet: string, cod: string }[] = [];

  static styles = [
    styles,
    css`
    #registerForm {
      max-width: 600px;
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
    }

    @media (min-width: 768px) {
      #registerForm {
        max-width: 90%;
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
            <h2>${this.title}</h2>
            <form @submit=${this.register}>
              <sl-input label="Nume spital" type="text" name="hospitalName" @input=${this.handleHospitalNameInput}></sl-input>
              <sl-select label="Județ" name="county" @sl-change=${this.handleCountyChange}>
                ${this.counties.map(county => html`<sl-option value="${county.cod}">${county.judet}</sl-option>`)}
              </sl-select>
              <sl-input label="Email administrator" type="email" name="adminEmail" @input=${this.handleAdminEmailInput}></sl-input>
              <sl-button variant="primary" type="submit">Înregistrează</sl-button>
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

  async register(event: Event) {
    event.preventDefault();

    const hospitalName = this.hospitalName;
    const county = this.county;
    const adminEmail = this.adminEmail;

    try {
      const response = await fetch('/add-hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hospitalName, county, adminEmail }),
      });

      if (!response.ok) {
        throw new Error('Error registering hospital');
      }

      alert('Spitalul a fost înregistrat cu succes!');
    } catch (error) {
      console.error('Error registering hospital:', error);
    }

    // Implement registration logic here
    // Redirect to home or perform any other necessary actions after registration
  }

  async firstUpdated() {
    // Call fetchCSV function to load and process the CSV
    this.fetchCSV();
    console.log(`This is the hospital registration page!`);
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
