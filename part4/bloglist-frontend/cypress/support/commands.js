Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs/`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })
  cy.visit('')
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request({
    url:  `${Cypress.env('BACKEND')}/users/`,
    method: 'POST',
    body : { name, username, password }
  })
  cy.visit('')
})

Cypress.Commands.add('userLogin', ({ username, password }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/login/`,
    method: 'POST',
    body: { username, password }
  }).then(response => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
    cy.visit('')
  })
})