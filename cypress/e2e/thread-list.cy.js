describe('Thread List Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('renders categories and threads', () => {
    cy.contains('Categories').should('be.visible');

    cy.get('button').contains(/^#/).should('exist');

    // Check at least one thread item renders
    cy.get('div[data-testid="thread-item__avatar"]').should('exist');
    cy.get('svg[data-testid="ChatBubbleOutlineOutlinedIcon"]').should('exist');
    cy.get('span[data-testid="thread-item__category"]').should('exist');
  });

  it('filters threads when clicking a category', () => {
    cy.get('button')
      .contains(/^#/)
      .first()
      .then(($btn) => {
        const category = $btn.text().replace('#', '');

        cy.wrap($btn).click();

        // Check that all visible threads belong to that category
        cy.get('span[data-testid="thread-item__category"]').each(($el) => {
          cy.wrap($el).contains(`#${category}`);
        });
      });
  });

  it('shows Create Thread button when logged in', () => {
    cy.login();

    cy.get('button[data-testid="create-thread-button"]')
      .trigger('mouseover');
    cy.get('button[data-testid="create-thread-button"]').within(() => {
      cy.contains('Create Thread').should('be.visible');
    });

  });
});
