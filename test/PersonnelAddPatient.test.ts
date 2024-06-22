import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import sinon, { SinonStub } from 'sinon';
import '../src/frontend/pages/personnel-add-patient';
import { PersonnelAddPatient } from '../src/frontend/pages/personnel-add-patient';

describe('PersonnelAddPatient Component', () => {
  let element: PersonnelAddPatient;
  let fetchStub: SinonStub;

  beforeEach(async () => {
    element = await fixture(html`<personnel-add-patient></personnel-add-patient>`);
    fetchStub = sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    fetchStub.restore();
  });

  test('should render the component', () => {
    expect(element).to.be.instanceOf(PersonnelAddPatient);
  });

  test('should render form inputs correctly', async () => {
    const inputs = element.shadowRoot?.querySelectorAll('sl-input');
    expect(inputs).to.have.length(2);
    expect(inputs?.[0].getAttribute('label')).to.equal('Nume');
    expect(inputs?.[1].getAttribute('label')).to.equal('CNP');
  });
});
