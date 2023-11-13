import 'dotenv/config';

describe('Website has no 404 errors', () => {
  it('has no 404 errors', () => {
    cy.visit('/');

    cy.get('a').each((link) => {
      const href = link.attr('href');
      cy.request(href).its('status').should('eq', 200);
    });
  });
});
