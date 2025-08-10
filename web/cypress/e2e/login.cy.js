// O describe é um bloco de teste que agrupa os testes
// O it é um bloco de teste que define um teste
// O .only executa apenas o teste que está com o .only
// O .skip pula o teste que está com o .skip
// O .pend adiciona o teste ao relatório, mas não executa


describe('Login', () => {
  it('Deve fazer login com sucesso', () => {
    cy.startTest()
    cy.submitLogin('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('Não deve logar com senha inválida', () => {
    cy.startTest()
    cy.submitLogin('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email não cadastrado', () => {
    cy.startTest()
    cy.submitLogin('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})