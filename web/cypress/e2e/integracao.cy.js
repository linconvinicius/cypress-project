describe('Validando integrações externas', () => {
    beforeEach(() => {
        cy.login();
        cy.goTo("Integração", "Consulta de CEP");
    })

    it('Deve consultar um CEP e exibir o resultado', () => {
        cy.log('todo: implementar mock para o cenario de consulta de cep')
/*         cy.intercept('GET', 'https://viacep.com.br/ws/01001000/json/', { fixture: 'cep.json' }).as('consultaCep')

        cy.get('#endereco').type('01001000')
        cy.contains('button', 'Consultar').click()

        cy.wait('@consultaCep')

        cy.get('#resultado > :nth-child(1)').should('have.text', 'Rua: Praça da Sé')
        cy.get('#resultado > :nth-child(2)').should('have.text', 'Bairro: Sé')
        cy.get('#resultado > :nth-child(3)').should('have.text', 'Cidade/UF: São Paulo/SP')
        cy.get('#resultado > :nth-child(4)').should('have.text', 'CEP: 01001-000') */
    })
})