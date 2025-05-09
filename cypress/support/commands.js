Cypress.Commands.add(
  'login',
  (email = 'test777@mail.com', password = 'test777') => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');
  },
);
