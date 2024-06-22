import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router, resolveRouterPath } from '../router';

import { styles } from '../styles/information-styles';
import { styles as sharedStyles } from '../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('personnel-add-patient')
export class PersonnelAddPatient extends LitElement {
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

      sl-card {
        width: 100%;
        max-width: 600px;
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
      <app-header ?enableBack="${true}" .backPath="${'personnel-home'}"></app-header>

      <main>
        <h2>Adaugă un pacient nou</h2>

        <sl-card>
          <form @submit=${this.handleSubmit}>
            <sl-input label="Nume" name="nume" required></sl-input>
            <sl-input label="CNP" name="cnp" required></sl-input>
            <sl-button variant="primary" type="submit">Adaugă pacient</sl-button>
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

        const response = await fetch('/personnel-add-patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nume: formDataObject.nume,
            cnp: formDataObject.cnp
          })
        });

        if (!response.ok) {
          alert('Eroare la adăugarea pacientului!');
          return;
        }

        alert('Pacientul a fost adăugat cu succes!');

        router.navigate(resolveRouterPath('personnel-home'));

      } catch (error) {
        console.error('Error during login:', error);
      }
  }
}
