describe('Formulario de Consultoria', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.startTest()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.fillForm('Lincon Vinicius', 'lincon@gmail.com', '11999999999', 'Individual', 'Pessoa Física')

    })
})