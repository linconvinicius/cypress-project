describe('Gerenciamento de perfis no GitHub', () => {
    beforeEach(() => {
        cy.login();
        cy.goTo("Tabela", "Perfis do GitHub");
    })

    it('Deve poder cadastrar um novo perfil dp github', () => {
        cy.get('#name').type('Lincon Vinicius');
        cy.get('#username').type('linconvinicius');
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click();

        cy.get('#name').type('Lincon Vinicius');
        cy.get('#username').type('felipfr');
        cy.get('#profile').type('Desenvolvedor');

        cy.contains('button', 'Adicionar Perfil').click();

        cy.contains('table tbody tr', 'felipfr')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('Lincon Vinicius')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('Desenvolvedor')
            .should('be.visible')

        //cy.contains('title', 'Abrir perfil no GitHub')
            //.should('have.attr', 'href', 'https://github.com/linconvinicius')
            //.and('have.attr', 'target', '_blank')
    })
})