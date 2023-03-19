describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Rauno',
      username: 'rane',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('rane')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Rauno logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Wrong')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('rane')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('Blogin testausta')
      cy.get('#author').type('Blogin testaaja')
      cy.get('#url').type('Blogintestaus.com')

      cy.get('#create').click()

      cy.contains('Blogin testausta')
    })

    it('A blog can be liked', function() {

      cy.contains('create new blog').click()

      cy.get('#title').type('Blogin testausta')
      cy.get('#author').type('Blogin testaaja')
      cy.get('#url').type('Blogintestaus.com')

      cy.get('#create').click()

      cy.contains('Blogin testausta')

      cy.contains('View').click()

      cy.contains('Like').click()

      cy.contains('likes: 1')
    })
  })

})