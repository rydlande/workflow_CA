import 'dotenv/config';

describe('Test', () => {
  it('logs user in', () => {
    cy.visit('/', { setTimeout: 200 });
    cy.get('#registerModal', { timeout: 200 }).within(() => {
      cy.wait(500);
      cy.get(
        '.modal-dialog.modal-dialog.modal-dialog-centered.modal-dialog-scrollable',
        { setTimeout: 1000 },
      ).within(() => {
        cy.get('form#registerForm').within(() => {
          cy.get('.modal-footer').children('.btn.btn-outline-success').click();
        });
      });
    });
    cy.wait(500);
    cy.get('div#loginModal').within(() => {
      /*       cy.get('input[type="email"]').type(Cypress.env('USER_EMAIL'));
      cy.get('input[type="password"]').type(Cypress.env('USER_PASSWORD')); */
    });

    cy.get('div#loginModal', { setTimeout: 1000 }).within(() => {
      cy.get('form#loginForm').within(() => {
        cy.get('.modal-footer').children('.btn.btn-success').click();
      });
    });
    cy.wait(4000);
    cy.get('.btn.btn-success.ps-4').click();
  });
});
