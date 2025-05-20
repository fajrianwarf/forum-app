/**
 * scenario testing
 * 
 * - Login Page spec
 *   - renders the login form correctly
 *   - shows validation errors if fields are empty
 *   - shows errors email format and password length
 *   - submits the form with valid input
 *   - navigates to register page on link click
 */

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('renders the login form correctly', () => {
    cy.contains('Login');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('shows validation errors if fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[name="email"]')
      .parentsUntil('form')
      .contains('This field is required');
    cy.get('input[name="password"]')
      .parentsUntil('form')
      .contains('This field is required');
  });

  it('shows errors email format and password length', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email format.');
    cy.contains('Must be at least 6 characters.');
  });

  it('submits the form with valid input', () => {
    cy.get('input[name="email"]').type('test777@mail.com');
    cy.get('input[name="password"]').type('test777');
    cy.get('button[type="submit"]').click();

    cy.get('.blink-blur-indicator', { timeout: 10000 }).should('exist');
    cy.get('.blink-blur-indicator', { timeout: 10000 }).should('not.exist');

    cy.get('div')
      .contains(/^Categories$/)
      .should('be.visible');
    
    cy.get('[class*=MuiAvatar-img], img[alt="test777"]').should('be.visible');
    cy.get('[class*=MuiSvgIcon-root], [data-testid="logoutIcon"]').should('be.visible');
  });

  it('navigates to register page on link click', () => {
    cy.contains('Register here').click();
    cy.url().should('include', '/register');
  });
});
