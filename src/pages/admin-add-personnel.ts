import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router, resolveRouterPath } from '../router';

import { styles } from '../styles/information-styles';
import { styles as sharedStyles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('admin-add-personnel')
export class AdminAddPersonnel extends LitElement {
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

      sl-card {
        width: 100%; /* Make the card responsive */
        max-width: 600px; /* Set maximum width for responsiveness */
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      sl-input,
      sl-button {
        margin-bottom: 16px;
        width: 100%;
      }

      h2 {
        display: inline-block;
        margin-bottom: 16px;
      }

      @media (max-width: 768px) {
        form {
          max-width: 90%;
        }
      }
    `
  ];

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>Adaugă personal spital</h2>

        <sl-card>
          <form @submit=${this.handleSubmit}>
            <sl-input label="Calificare" name="calificare" required></sl-input>
            <sl-input label="Prenume" name="prenume" required></sl-input>
            <sl-input label="Nume" name="nume" required></sl-input>
            <sl-input label="Email" name="email" type="email" required></sl-input>
            <sl-button variant="primary" type="submit">Adaugă personal</sl-button>
          </form>
        </sl-card>
      </main>
    `;
  }

async handleSubmit(event: Event) {
    event.preventDefault();

    try {
        const formData = new FormData(event.target as HTMLFormElement);
        const formDataObject = Object.fromEntries(formData.entries());

        const response = await fetch('/admin-add-personnel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            calificare: formDataObject.calificare,
            nume: formDataObject.nume,
            prenume: formDataObject.prenume,
            email: formDataObject.email
          })
        });

        if (!response.ok) {
          alert('Eroare la adăugarea personalului');
          return;
        }

        alert('Personal adăugat cu succes');

        router.navigate(resolveRouterPath('admin-personnel'));

      } catch (error) {
        console.error('Error during login:', error);
      }
  }
}
