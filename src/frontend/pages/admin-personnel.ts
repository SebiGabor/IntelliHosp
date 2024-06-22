import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import { styles } from '../styles/information-styles';
import { styles as sharedStyles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('admin-personnel')
export class AdminPersonnel extends LitElement {
  static styles = [
    sharedStyles,
    styles,
    css`
      :host {
        display: block;
        margin: auto;
        max-width: 800px;
      }

      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
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
        width: 100%;
        max-width: 600px;
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
  personnel: any[] = [];

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchPersonnelData();
  }

  async fetchPersonnelData() {
    try {
      const response = await fetch('/get-personnel');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        this.personnel = data;
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Failed to fetch personnel data:', error);
    }
  }

  render() {
    return html`
      <app-header ?enableBack="${true}" .backPath="${'admin-home'}"></app-header>

      <main>
        <div class="header">
          <h2>Personal spital</h2>
          <sl-button href="${resolveRouterPath('admin-add-personnel')}" variant="primary">Înregistrează personal nou</sl-button>
        </div>

        <sl-card>
          ${this.personnel.length > 0 ? html`
            <table>
              <thead>
                <tr>
                  <th>Calificare</th>
                  <th>Nume</th>
                  <th>Prenume</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                ${this.personnel.map(person => html`
                  <tr>
                    <td>${person.Calificare}</td>
                    <td>${person.Nume}</td>
                    <td>${person.Prenume}</td>
                    <td>${person.Email}</td>
                  </tr>
                `)}
              </tbody>
            </table>
          ` : html`<p>Se încarcă personalul...</p>`}
        </sl-card>
      </main>
    `;
  }
}
