describe('Validações de alertas em javaScript', () => {
    beforeEach(() => {
        cy.login();
        cy.goTo("Alertas JS", "JavaScript Alerts");
    })

    it('Deve validar a mensagem de alerta', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return true;
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um dialogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return false;
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Lincon')
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Lincon! Boas vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })

    it('Deve validar a mensagem retornada se o campo estiver em branco', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('')
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Nome não informado.')
            return false;
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })

    it.only('Deve validar a ação quando o botão Cancelar foi clicado no prompt', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').callsFake(() => null);
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Ação Cancelada.');
        });

        cy.contains('button', 'Mostrar Prompt').click();
    });
})