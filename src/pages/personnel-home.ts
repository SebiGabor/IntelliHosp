import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import { styles } from '../styles/information-styles';
import { styles as sharedStyles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';

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
      }
    `
  ];

  @state()
  patients: any[] = [];

  async firstUpdated() {
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
                </tr>
              </thead>
              <tbody>
                ${this.patients.map(person => html`
                  <tr>
                    <td>${person.Nume}</td>
                    <td>${person.CNP}</td>
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
