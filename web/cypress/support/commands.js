// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('startTest', () => {
  cy.viewport(1366, 768)
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('submitLogin', (email, senha) => {
  cy.get('#email').type(email)
  cy.get('#password').type(senha)

  cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName)
    .should('be.visible')
    .click()

  cy.contains('h1', pageTitle)
    .should('be.visible')
})

Cypress.Commands.add('fillForm', (name, email, phone, consultancyType, personType) => {
  cy.get('input[placeholder="Digite seu nome completo"]').type(name)
  cy.get('input[placeholder="Digite seu email"]').type(email)
  cy.get('input[placeholder="(00) 00000-0000"]')
    .type(phone)
    .should('have.value', '(11) 99999-9999')
  cy.contains('label', 'Tipo de Consultoria')
    .parent()
    .find('select')
    .select(consultancyType)

  cy.contains('label', personType)
    .find('input')
    .check()
    .should('be.checked')

  cy.contains('label', 'Pessoa Jurídica')
    .find('input')
    .should('not.be.checked')

  cy.contains('label', 'CPF')
    .parent()
    .find('input')
    .type('72346145084')
    .should('have.value', '723.461.450-84')

  cy.contains('label', 'CNPJ')
    .parent()
    .find('input')
    .type('41447343000186')
    .should('have.value', '41.447.343/0001-86')
})