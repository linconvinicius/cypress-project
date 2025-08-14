describe("Formulario de Consultoria", () => {
    before(() => {
    cy.log('Iniciando os testes de consultoria');
  })

  beforeEach(() => {
    cy.startTest();
    cy.submitLogin("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");
  })

  it("Deve solicitar consultoria individual", () => {
    cy.fillForm(
      "Lincon Vinicius",
      "lincon@gmail.com",
      "11999999999",
      "Individual",
      "Pessoa Física"
    );
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

  afterEach(() => {
    cy.log('Finalizando o teste de consultoria');
  })

  after(() => {
    cy.log('Todos os testes de consultoria foram concluídos');
  });
});
