import { css } from 'lit';

export const styles = css`
  @media(min-width: 1000px) {
    sl-card {
      max-width: 70vw;
    }
  }

  main {
    margin-top: 80px;
  }

  .icon-button-color sl-icon-button::part(base) {
    color: #b00091;
  }

  .icon-button-color sl-icon-button::part(base):hover,
  .icon-button-color sl-icon-button::part(base):focus {
    color: #c913aa;
  }

  .icon-button-color sl-icon-button::part(base):active {
    color: #960077;
  }

  .icon-button-color sl-icon-button {
    --icon-color: var(--ih-primary-color-2);
  }

  a[href] {
    margin-top: 16px;
      color: var(--ih-primary-color-2);
      text-decoration: none;
      border-bottom: 2px solid var(--ih-primary-color-2);
      transition: color 0.3s ease, border-color 0.3s ease;
      border-bottom: none;

      &:hover {
        color: var(--ih-primary-color-3);
        border-color: var(--ih-primary-color-3);
        border-bottom: none;
      }
  }
`;