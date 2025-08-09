// O describe é um bloco de teste que agrupa os testes
// O it é um bloco de teste que define um teste

describe('Login', () => {
  it('Deve fazer login com sucesso', () => {
    cy.viewport(1366, 768)
    cy.visit('http://localhost:3000')

    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('katana123')

    cy.contains('button', 'Entrar').click()

    cy.wait(3000)
  })
})