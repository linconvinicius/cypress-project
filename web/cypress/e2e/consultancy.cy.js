describe("Formulario de Consultoria", () => {

  beforeEach(() => {
    cy.login();

    cy.goTo("Formulários", "Consultoria");
  })

  it("Deve solicitar consultoria individual", () => {

    const consultancyForm = {
      name: 'Lincon Vinicius',
      email: 'lincon@teste.com',
      phone: '(11) 99999-9999',
      consultancyType: 'Individual',
      personType: 'cpf',
      document: '72346145084',
      discoveryChannels: [
        'Instagram',
        'LinkedIn',
        'Udemy',
        'YouTube',
        'Indicação de Amigo'
      ],
      file: './cypress/fixtures/document.pdf',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      techs: [
        'Cypress',
        'Selenium',
        'Playwright',
        'Robot Framework'
      ],
      terms: true
    }

    cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(consultancyForm.phone)
    //.should('have.value', '(11) 99999-9999')

    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(consultancyForm.consultancyType)

    if (consultancyForm.personType === 'cpf') {
      cy.contains('label', 'Pessoa Física')
        .find('input')
        .click()
        .should('be.checked')

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked')
    }

    if (consultancyForm.personType === 'cnpj') {
      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .click()
        .should('be.checked')

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('not.be.checked')
    }

    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type(consultancyForm.document)
    //.should('have.value', '723.461.450-84')

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains('label', channel)
        .find('input')
        .check()
        .should('be.checked')
    })

    cy.get('input[type="file"]')
      .selectFile(consultancyForm.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      .type(consultancyForm.description)

    consultancyForm.techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type('{enter}')

      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tech)
        .should('be.visible')
    })

    if (consultancyForm.terms === true) {
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked')
    }

    cy.contains('button', 'Enviar formulário')
      .click()

    cy.get('.modal', { timeout: 7000 })
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  });

  it("Deve verificar os campos obrigatórios", () => {
    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Email")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Você precisa aceitar os termos de uso")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});
