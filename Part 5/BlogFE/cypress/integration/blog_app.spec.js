describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      
      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#Title').type('a blog created by cypress')
      cy.get('#Author').type('John Hopkins')
      cy.get('#URL').type('www.hopkinsnotes.com')
      cy.get('#Likes').type('1')
      cy.contains('create').click()
      cy.get('.blog')
      .should('contain', 'a blog created by cypress')
      .and('contain', 'John Hopkins')
      
    })
    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title:'hello',author:'Lionel Ritchie',url:'LionelRitchie.com',likes:1
        })
      })
      it('it can be liked', function () {
        cy.contains('hello')
          .contains('view')
          .click()
        cy.get('.blog')
          .contains('Like')
          .click()
      })
      it('it can be deleted', function () {
        cy.contains('hello')
          .contains('view')
          .click()
        cy.get('.blog')
          .contains('Delete')
          .click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Delete hello?')
        })
        cy.on('window:confirm', () => true);
        cy.contains('Deleted \'hello\'');
      })
    }) 
    describe('and multiple notes exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title:'hello',author:'Lionel Ritchie',url:'LionelRitchie.com',likes:2
        })
        cy.createBlog({
          title:'goodbye',author:'Pionel Sitchie',url:'PionelSitchie.com',likes:3
        })
        cy.createBlog({
          title:'ok',author:'Rionel Litchie',url:'RionelLitchie.com',likes:1
        })
      })
      it('it can be liked', function () {
        cy.contains('goodbye')
          .contains('view')
          .click()
        cy.contains('goodbye')
          .contains('Like')
          .click()
      })
      it.only('blogs are sorted in order', function () {
        cy.get('.blog').eq(0)
          .contains('view')
          .click()
        cy.get('.blog').eq(1)
          .contains('view')
          .click()
        cy.get('.blog').eq(2)
          .contains('view')
          .click()
        cy.get('.blog').eq(0)
          .contains('Likes: 3')
        cy.get('.blog').eq(1)
          .contains('Likes: 2')
        cy.get('.blog').eq(2)
          .contains('Likes: 1')      
      })
    })
  }) 
})