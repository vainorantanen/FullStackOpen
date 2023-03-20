import { func } from 'prop-types'

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

  describe('Deleting a blog', function() {
    beforeEach(function() {
      cy.get('#username').type('rane')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('user can add a blog and then delete it', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('Blogin poiston testausta')
      cy.get('#author').type('Blogin poiston testaaja')
      cy.get('#url').type('Bloginpoistontestaus.com')
      cy.get('#create').click()
      cy.contains('Blogin poiston testausta')
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.contains('View').should('not.exist')
      cy.contains('Likes').should('not.exist')
    })
  })

  describe('Blog ramoving across users', function() {
    beforeEach(function() {
      // lisätään uusi käyttäjä
      const user = {
        name: 'Ranen veli',
        username: 'Ranen veli',
        password: 'salaisuus'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      // lisätään käyttäjälle blogi suoraan bäckendiin
    })

    it('Another user cant delete other ones blog', function() {
      // log in
      cy.get('#username').type('Ranen veli')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      // add a blog on the new user
      cy.contains('create new blog').click()
      cy.get('#title').type('Blogin poiston testausta')
      cy.get('#author').type('Blogin poiston testaaja')
      cy.get('#url').type('Bloginpoistontestaus.com')
      cy.get('#create').click()
      cy.contains('Blogin poiston testausta')
      // logout
      cy.contains('logout').click()
      cy.reload()
      // log in with rane
      cy.get('#username').type('rane')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      // add of new still visible
      cy.contains('Blogin poiston testausta')
      cy.contains('View').click()
      // remove button not visible
      cy.contains('Remove').should('not.exist')
    })

  })
  // 5.23

  describe('Liking and ordering', function() {
    beforeEach(function() {
      // log in
      cy.get('#username').type('rane')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      // create 2 blogs
      // 1
      cy.contains('create new blog').click()

      cy.get('#title').type('Vähemmän likejä')
      cy.get('#author').type('Blogin testaaja')
      cy.get('#url').type('Blogintestaus.com')

      cy.get('#create').click()

      cy.contains('Vähemmän likejä')

      // 2
      cy.contains('create new blog').click()

      cy.get('#title').type('Enemmän likejä')
      cy.get('#author').type('Blogin testaaja')
      cy.get('#url').type('Blogintestaus.com')

      cy.get('#create').click()

      cy.contains('Enemmän likejä')
    })

    it('Blogs are ordered by likes', function() {
      // like the blog
      cy.contains('Enemmän likejä')
        .contains('View')
        .click()
      cy.contains('Like')
        .click()

      cy.contains('likes: 1')

      cy.contains('Vähemmän likejä')
        .contains('View')
        .click()
      cy.contains('Like')
        .click()

      cy.contains('likes: 1')

      cy.contains('Enemmän likejä')
        .contains('Like')
        .click()

      cy.contains('likes: 2')

      cy.get('#blog').eq(0).should('contain', 'Enemmän likejä')
      //cy.get('#blog').eq(1).should('contain', 'Vähemmän likejä')
    })
  })
})