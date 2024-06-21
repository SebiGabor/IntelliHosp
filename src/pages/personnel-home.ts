import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { router, resolveRouterPath } from '../router';

import { styles } from '../styles/information-styles';
import { styles as sharedStyles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

@customElement('personnel-home')
export class PersonnelHome extends LitElement {
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

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 600px;
        margin-bottom: 20px;
      }

      sl-card {
        width: 100%; /* Make the card responsive */
        max-width: 600px; /* Set maximum width for responsiveness */
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
      }

      th {
        background-color: #3F72AF;
        color: white;
      }

      td button {
        padding: 5px 10px;
        background-color: #3F72AF;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;
      }

      td button:hover {
        background-color: #2C5AA0;
      }
    `
  ];

  @state()
  patients: any[] = [];

  async firstUpdated() {
    registerIconLibrary('default', {
        resolver: name => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0/icons/${name}.svg`
      });
    await this.fetchPatientsData();
  }

  async fetchPatientsData() {
    try {
      const response = await fetch('/get-patients', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        this.patients = data;
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Failed to fetch personnel data:', error);
    }
  }

  handleButtonClick() {
    router.navigate(resolveRouterPath('personnel-complete-plan'));
  }

  render() {
    return html`
      <main>
        <div class="header">
          <h2>Pacienți spital</h2>
          <sl-button href="${resolveRouterPath('personnel-add-patient')}" variant="primary">Adaugă un pacient nou</sl-button>
        </div>

        <sl-card>
          ${this.patients.length > 0 ? html`
            <table>
              <thead>
                <tr>
                  <th>Nume</th>
                  <th>CNP</th>
                  <th>Plan de îngrijiri</th>
                </tr>
              </thead>
              <tbody>
                ${this.patients.map(person => html`
                  <tr>
                    <td>${person.Nume}</td>
                    <td>${person.CNP}</td>
                    <td>
                      <sl-button variant="primary" @click=${() => this.handleButtonClick()}><sl-icon name="file-earmark-medical-fill"></sl-icon></sl-button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          ` : html`<p>Se încarcă pacienții...</p>`}
        </sl-card>
      </main>
    `;
  }
}
