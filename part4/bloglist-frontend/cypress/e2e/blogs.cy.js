describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({
      name: 'Testing',
      username: 'testing01',
      password: 'testing01'
    })

    cy.createUser({
      name: 'Another Testing',
      username: 'testing02',
      password: 'testing02'
    })
  })

  it('login form is shown', function(){
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })


  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('testing01')
      cy.get('#password').type('testing01')
      cy.get('#login-button').click()

      cy.contains('Testing logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('testing01')
      cy.get('#password').type('testing02')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong password or username')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Testing logged in')
      cy.wait(6000)
      cy.get('.error').should('not.exist')
    })
  })

  describe('When logged in', function(){
    beforeEach(function(){
      cy.userLogin({
        username: 'testing01',
        password: 'testing01'
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#input-title').type('Testing E2E')
      cy.get('#input-author').type('John Doe')
      cy.get('#input-url').type('www.testingjs.com')

      cy.contains('create').click()
      cy.contains('Testing E2E by John Doe')

      cy.get('.success')
        .should('contain', 'a new blog Testing E2E by John Doe added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.wait(6000)
      cy.get('.success').should('not.exist')

      cy.contains('View').click()
      cy.contains('www.testingjs.com')
    })

    describe('a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'Testing E2E Vers 2',
          author: 'Jack Doe',
          url: 'www.testingjs.com'
        })
        cy.contains('View').click()
      })

      it('can like a blog', function(){
        cy.contains('like').click()
        cy.contains('Likes 1')
      })

      it('can delete a blog', function(){
        cy.contains('Remove').click()
        cy.on('window:confirm', () => true)

        cy.get('.success')
          .should('contain', 'Blog Testing E2E Vers 2 by Jack Doe sucessfully removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.wait(6000)
        cy.get('.success').should('not.exist')

      })
    })

    describe('blog from another user exists', function(){
      beforeEach(function(){
        localStorage.removeItem('loggedBlogAppUser')
        cy.userLogin({
          username: 'testing02',
          password: 'testing02'
        })
        cy.createBlog({
          title: 'Article from testing 02',
          author: 'Another Testing',
          url: 'www.nolink.com'
        })
      })

      it('user who not post the blog cant see delete button', function(){
        localStorage.removeItem('loggedBlogAppUser')
        cy.userLogin({
          username: 'testing01',
          password: 'testing01'
        })
        cy.contains('View').click()
        cy.get('.delete-button').should('not.exist')
      })

      it('user who post the blog can see delete button', function(){
        cy.contains('View').click()
        cy.get('.delete-button').should('exist')
      })
    })

    describe('Blogs can be ordered by number of likes', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'Author 1',
          url: 'www.nolink.com'
        })
        cy.createBlog({
          title: 'The title with the least likes',
          author: 'Author 2',
          url: 'www.nolink.com'
        })
        cy.createBlog({
          title: 'The title with the second likes',
          author: 'Author 3',
          url: 'www.nolink.com'
        })
        cy.contains('The title with the most likes By Author 1').as('blog1')
        cy.contains('The title with the least likes By Author 2').as('blog2')
        cy.contains('The title with the second likes By Author 3').as('blog3')
      })

      it('ordered by number of likes', function(){
        cy.get('@blog1').contains('View').click()
        cy.get('.like-button').click({ multiple: true })
        cy.wait(500)
        cy.get('.like-button').click({ multiple: true })
        cy.wait(500)
        cy.get('.like-button').click({ multiple: true })
        cy.wait(500)

        cy.get('@blog3').contains('View').click()
        cy.get('.like-button').click({ multiple: true })
        cy.wait(500)
        cy.get('.like-button').click({ multiple: true })
        cy.wait(500)

        cy.get('@blog2').contains('View').click()
        cy.get('.like-button').click({ multiple: true })
        cy.wait(500)

        cy.get('.blog-item').eq(0).should('contain', 'The title with the most likes By Author 1')
        cy.get('.blog-item').eq(1).should('contain', 'The title with the second likes By Author 3')
        cy.get('.blog-item').eq(2).should('contain', 'The title with the least likes By Author 2')
      })
    })
  })
})
