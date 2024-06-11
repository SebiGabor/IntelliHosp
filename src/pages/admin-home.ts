import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles as sharedStyles } from '../styles/shared-styles';
import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('admin-home')
export class AdminHome extends LitElement {
  @property({ type: String }) hospitalName = 'Spital';

  static styles = [
    sharedStyles,
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

      sl-card {
        width: 100%; /* Make the card responsive */
        max-width: 600px; /* Set maximum width for responsiveness */
      }

      .welcome-message {
        font-size: 1.5rem;
        margin-bottom: 20px;
      }

      .info-text {
        margin-bottom: 10px;
      }
    `
  ];

  render() {
    const hospitalName = localStorage.getItem('hospitalName') || 'Unknown Hospital';
    alert(hospitalName);
    return html`
      <app-header></app-header>
      <main>
        <h1>Admin Home Page</h1>
        <p>Welcome to the admin home page!</p>0
        <h2>Hospital: ${hospitalName}</h2>
      </main>
    `;
  }
}
