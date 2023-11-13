import 'dotenv/config';

describe('User can log out with the logout button', () => {
  it('logs user out', () => {
    cy.visit('/', { setTimeout: 200 });
    cy.get('#registerModal', { timeout: 200 }).within(() => {
      cy.wait(500);
      cy.get(
        '.modal-dialog.modal-dialog.modal-dialog-centered.modal-dialog-scrollable',
        { setTimeout: 200 },
      ).within(() => {
        cy.get('form#registerForm').within(() => {
          cy.get('.modal-footer').children('.btn.btn-outline-success').click();
        });
      });
    });
    cy.wait(500);
    cy.get('div#loginModal').within(() => {
      cy.get('input[type="email"]').type(Cypress.env('EMAIL'));
      cy.get('input[type="password"]').type(Cypress.env('PASSWORD'));
    });

    cy.get('div#loginModal', { setTimeout: 1000 }).within(() => {
      cy.get('form#loginForm').within(() => {
        cy.get('.modal-footer').children('.btn.btn-success').click();
      });
    });
    cy.wait(500);

    cy.get('.btn.btn-outline-warning.me-2').click();
  });
});
