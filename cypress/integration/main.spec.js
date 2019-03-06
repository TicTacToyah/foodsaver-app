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
})
