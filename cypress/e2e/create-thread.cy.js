describe('Create Thread Page', () => {
  const threadTitle = 'Thread Title';
  const threadCategory = 'General';
  const threadContent = 'Thread Content';

  beforeEach(() => {
    cy.login();
    cy.visit('http://localhost:5173/threads/new');
  });

  it('renders the thread form correctly', () => {
    cy.contains('Create a New Thread').should('be.visible');
    cy.get('input[name="title"]').should('exist');
    cy.get('input[name="category"]').should('exist');
    cy.get('[contenteditable][name="body"]').should('exist');
    cy.get('button[type="submit"]').contains('Post Thread').should('exist');
  });

  it('shows validation errors when required fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('This field is required').should('exist');
  });

  it('submits the form with valid input and navigates away', () => {
    cy.get('input[name="title"]').type(threadTitle);
    cy.get('input[name="category"]').type(threadCategory);
    cy.get('[contenteditable][name="body"]').type(threadContent);

    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]')
      .should('be.disabled')
      .and('contain.text', 'Posting...');

    cy.url({ timeout: 5000 }).should('eq', 'http://localhost:5173/');
  });
});
