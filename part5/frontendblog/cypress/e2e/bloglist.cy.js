

describe('template spec', () => {
  beforeEach(function(){
    cy.request('POST','http://localhost:80/api/tests/reset')
  })

  it('Login form is shown', () => {
    cy.visit('http://127.0.0.1:5173/')
    
    const usernameInput = cy.get('input[id="usernameInputLogin"]')
    const passwordInput = cy.get('input[id="passwordInputLogin"]')

    usernameInput.should('be.visible')
    passwordInput.should('be.visible')
  })

  describe('Login',function(){
    it('succeeds with correct credentials', function(){
      cy.visit('http://127.0.0.1:5173/')
    
      cy.get('input[id="usernameInputLogin"]').type('testUser')
      cy.get('input[id="passwordInputLogin"]').type('testPassword')

      cy.contains('Login').click()

      const loginSuccessfulLabel = cy.get('p').contains('Logged',{timeout:10000})
      loginSuccessfulLabel.should('be.visible')

    })

    it('fails with incorrect creds',function(){
      cy.visit('http://127.0.0.1:5173/')
    
      cy.get('input[id="usernameInputLogin"]').type('testUser')
      cy.get('input[id="passwordInputLogin"]').type('wrongPassword')

      cy.contains('Login').click()

      const loginUnsuccessful = cy.get('p').contains('Login unsuccessful',{timeout:10000})
      loginUnsuccessful.should('be.visible')
      
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.visit('http://127.0.0.1:5173/')
    
      cy.get('input[id="usernameInputLogin"]').type('testUser')
      cy.get('input[id="passwordInputLogin"]').type('testPassword')

      cy.contains('Login').click()
    })

    it('A blog can be created', function(){
      cy.contains('Create new blog entry').click()
      cy.get('input[id="titleInput"]').type('test title')
      cy.get('input[id="authorInput"]').type('test author')
      cy.get('input[id="urlInput"]').type('test title')
      cy.contains('Create Blog').click()

      cy.contains('Title: test title').should('be.visible')
      cy.contains('Author: test author').should('be.visible')
    })

    it('user should be able to like a blog',function(){
      cy.contains('Create new blog entry').click()
      cy.get('input[id="titleInput"]').type('test title')
      cy.get('input[id="authorInput"]').type('test author')
      cy.get('input[id="urlInput"]').type('test title')
      cy.contains('Create Blog').click()

      cy.contains('View').click()
      cy.get('button').contains('Like').click()

      cy.contains('Likes: 1')
    })

    it('user that added the blog should be able to delete it',function(){
      cy.contains('Create new blog entry').click()
      cy.get('input[id="titleInput"]').type('test title')
      cy.get('input[id="authorInput"]').type('test author')
      cy.get('input[id="urlInput"]').type('test title')
      cy.contains('Create Blog').click()

      cy.contains('View').click()
      cy.get('button').contains('Delete').click()
      cy.contains('Title: test title').should('not.exist')
    })

    it('only user that added blog should be able to see delete button',function(){
      cy.contains('Create new blog entry').click()
      cy.get('input[id="titleInput"]').type('test title')
      cy.get('input[id="authorInput"]').type('test author')
      cy.get('input[id="urlInput"]').type('test title')
      cy.contains('Create Blog').click()

      cy.get('button').contains('Log out').click()

      cy.get('input[id="usernameInputLogin"]').type('testUser2')
      cy.get('input[id="passwordInputLogin"]').type('testPassword2')

      cy.contains('Login').click()
      
      cy.contains('View').click()
      cy.get('button').contains('Delete').should('not.exist')
    })

    it.only('should display blogs in order of how many likes they got',function(){
      cy.contains('Create new blog entry').click()
      cy.get('input[id="titleInput"]').type('Second most popular title')
      cy.get('input[id="authorInput"]').type('Second most popular author')
      cy.get('input[id="urlInput"]').type('Second most popular title')
      cy.contains('Create Blog').click()

      cy.contains('Create new blog entry').click()
      cy.get('input[id="titleInput"]').type('Most popular title')
      cy.get('input[id="authorInput"]').type('Most popular author')
      cy.get('input[id="urlInput"]').type('Most popular title')
      cy.contains('Create Blog').click()

      cy.get('ul>li').eq(0).get('button').contains('View').click()
      cy.get('ul>li').eq(1).get('button').contains('View').click()

      cy.get('ul>li').eq(1).contains(/^Like$/).click().click().click()
      
      
      cy.get('ul>li').eq(0).contains('Title: Most popular title').should('be.visible')
    })



  })
})