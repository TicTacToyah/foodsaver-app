describe('Foodsaver App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  describe('/', () => {
    it('has the correct title', () => {
      cy.title().should('include', 'Foodsaver App')
    })
  })

  describe('section', () => {
    it('has a card', () => {
      cy.get('section')
        .find('h3')
        .should('have.length', 3)
      cy.get('section')
        .find('h2')
        .should('have.length', 3)
      cy.get('img').should('have.length', 12)
    })
  })

  describe('/create', () => {
    it('has a form with input fields', () => {
      cy.get('[data-cy="input-one"]')
        .should('have.length', 1)
        .type('bananarama')
      cy.get('[data-cy="input-two"]')
        .should('have.length', 1)
        .type('mutter')
      cy.get('[data-cy="select-one"]')
        .should('have.length', 1)
        .select('Trockenes')
      cy.get('[data-cy="select-two"]')
        .should('have.length', 1)
        .select('Gut')
      cy.get('[data-cy="select-two"]')
        .should('have.length', 1)
        .select('Gut')
      cy.get('button')
        .should('have.length', 1)
        .click()
    })
  })
})
