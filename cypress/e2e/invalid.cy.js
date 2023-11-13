import 'dotenv/config';

describe('User cannot submit the login form with invalid credentials and is shown a message', () => {
  it('should show error for invalid user and/or wrong password', () => {
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
      cy.get('input[type="email"]')
        .invoke('attr', 'pattern')
        .should('eq', '[\\w\\-.]+@(stud.)?noroff.no$');
      cy.get('input[type="email"]').type('invalid@noroff.no');
      cy.get('input[type="password"]').type(Cypress.env('PASSWORD'));
    });

    cy.get('div#loginModal', { setTimeout: 1000 }).within(() => {
      cy.get('form#loginForm').within(() => {
        cy.get('.modal-footer').children('.btn.btn-success').click();
      });
    });
    cy.on('window:alert', (message) => {
      expect(message).to.equal(
        `Either your username was not found or your password is incorrect`,
      );
    });
  });
});
