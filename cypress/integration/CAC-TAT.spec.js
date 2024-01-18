// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

//Vai executar antes de cada bloco describe
beforeEach(() => {
    cy.visit('../../src/index.html')
  })
  
//O  describe sempre irá definir a SUITE DE TESTES e o it define o CASO DE TESTE
describe('Central de Atendimento ao Cliente TAT', function() {
    
    it('Verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')  //o title é o valor que é exibido na aba do navegador. o title h1 é outra coisa
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName')//o uso do # irá buscar na página o elemento cujo id seja firstName
        .type('João Paulo')

        cy.get('#lastName')
        .type('da Silva P. Campos')

        cy.get('#email')
        .type('joaopaulospc@email.com.br')

        cy.get('#open-text-area')
        .type('Eu gostaria de mais informações sobre o serviço oferecido')

        cy.get('.button')
        .click()

        cy.get('.success > strong')
        .should('be.visible')
        .invoke('text')  // Pegue o texto do elemento
        .should('eq','Mensagem enviada com sucesso.')        
    })

    it('Exibe mensagem de erro so submeter o formulário com um email de formatação inválida', function() {
        cy.get('#firstName')//o uso do # irá buscar na página o elemento cujo id seja firstName
        .type('João Paulo')

        cy.get('#lastName')
        .type('da Silva P. Campos')

        cy.get('#email')
        .type('joaopaulospc@emailcombr')

        cy.get('#open-text-area')
        .type('Eu gostaria de mais informações sobre o serviço oferecido')

        cy.get('.button')
        .click()

        cy.get('.error > strong')
        .should('be.visible')
        .invoke('text')  // Pegue o texto do elemento
        .should('eq','Valide os campos obrigatórios!')   
    })

    it('Valida que campo Telefone só aceita valores numéricos', function() {
        cy.get('#phone')
        .type('TESTE')
        .should('have.value','')//Se usar o eq aqui a lógica vai tentar comparar string com string e como o campo não é string, o teste vai falhar
    })

    it('Valida obrigatoriedade do campo Telefone ao marcar meio de contato como Telefone', function() {
        cy.get('#firstName')//o uso do # irá buscar na página o elemento cujo id seja firstName
        .type('João Paulo')

        cy.get('#lastName')
        .type('da Silva P. Campos')

        cy.get('#email')
        .type('joaopaulospc@email.com.br')

        cy.get('#phone-checkbox')
        .click()

        cy.get('.phone-label-span')
        .should('be.visible')
        .invoke('text')
        .should('eq',' (obrigatório)')
        
        cy.get('#open-text-area')
        .type('Eu gostaria de mais informações sobre o serviço oferecido',{delay:100})

        cy.get('.button')
        .click()

        cy.get('.error > strong')
        .should('be.visible')
        .invoke('text')  // Pegue o texto do elemento
        .should('eq','Valide os campos obrigatórios!')
    })

    it('Preenche e limpa os campos Nome, Sobrenome, Email e Telefone', function() {
        cy.get('#firstName')//o uso do # irá buscar na página o elemento cujo id seja firstName
        .type('João Paulo')
        .clear()
        .should('have.value','')

        cy.get('#lastName')
        .type('da Silva P. Campos')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type('joaopaulospc@email.com.br')
        .clear()
        .should('have.value','')

        cy.get('#phone')
        .type('3232344')
        .clear()
        .should('have.value','')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit();//Aqui eu tenho uma pré-condição que será realizada que está definida no arquivo support/commands.js e abaixo eu faço as minhas asserções com base no que o comando deixou pronto para mim.

        cy.get('.success > strong')
        .should('be.visible')
        .invoke('text')  // Pegue o texto do elemento
        .should('eq','Mensagem enviada com sucesso.')  
    })

  })

  describe('Alterando cy.get para cy.contains em todos os testes anteriores', function() {
    
    it('Verifica o título da aplicação', function() {
        cy.title()
        .should('eq','Central de Atendimento ao Cliente TAT')  //o title é o valor que é exibido na aba do navegador. o title h1 é outra coisa
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.contains('Nome')//o uso do contains irá buscar na página o elemento com base no texto que ele contém
        .next('input')//o uso do next faz com que o cypress percorra o html procurando o próximo elemento do mesmo nivel hierarquico do tipo input do elemento identificado anteriormente
        .type('João Paulo')

        cy.contains('Sobrenome')
        .next('input')
        .type('da Silva P. Campos')

        cy.contains('E-mail')
        .next('input')
        .type('joaopaulospc@email.com.br')

        cy.contains('Como podemos te ajudar?')
        .next('textarea')
        .type('Eu gostaria de mais informações sobre o serviço oferecido')

        cy.contains('Enviar')
        .click()

        cy.contains('Mensagem enviada com sucesso.')
    })

    it('Exibe mensagem de erro so submeter o formulário com um email de formatação inválida', function() {
        cy.contains('Nome')//o uso do contains irá buscar na página o elemento com base no texto que ele contém
        .next('input')//o uso do next faz com que o cypress percorra o html procurando o próximo elemento do mesmo nivel hierarquico do tipo input do elemento identificado anteriormente
        .type('João Paulo')

        cy.contains('Sobrenome')
        .next('input')
        .type('da Silva P. Campos')

        cy.contains('E-mail')
        .next('input')
        .type('joaopaulospc@emailcombr')

        cy.contains('Como podemos te ajudar?')
        .next('textarea')
        .type('Eu gostaria de mais informações sobre o serviço oferecido')

        cy.contains('Enviar')
        .click()

        cy.contains('Valide os campos obrigatórios!')   
    })

    it('Valida que campo Telefone só aceita valores numéricos', function() {
        cy.contains('Telefone')
        .next('input')
        .type('TESTE')
        .should('have.value','')//Se usar o eq aqui a lógica vai tentar comparar string com string e como o campo não é string, o teste vai falhar
    })

    it('Valida obrigatoriedade do campo Telefone ao marcar meio de contato como Telefone', function() {
        cy.contains('Nome')//o uso do contains irá buscar na página o elemento com base no texto que ele contém
        .next('input')//o uso do next faz com que o cypress percorra o html procurando o próximo elemento do mesmo nivel hierarquico do tipo input do elemento identificado anteriormente
        .type('João Paulo')

        cy.contains('Sobrenome')
        .next('input')
        .type('da Silva P. Campos')

        cy.contains('E-mail')
        .next('input')
        .type('joaopaulospc@emailcombr')

        cy.contains('label','Telefone')
        .next()
        .click()

        cy.contains(' (obrigatório)')
        
        cy.contains('Como podemos te ajudar?')
        .next('textarea')
        .type('Eu gostaria de mais informações sobre o serviço oferecido')

        cy.contains('Enviar')
        .click()

        cy.contains('Valide os campos obrigatórios!')
    })

    it('Preenche e limpa os campos Nome, Sobrenome, Email e Telefone', function() {
        cy.contains('Nome')//o uso do contains irá buscar na página o elemento com base no texto que ele contém
        .next('input')//o uso do next faz com que o cypress percorra o html procurando o próximo elemento do mesmo nivel hierarquico do tipo input do elemento identificado anteriormente
        .type('João Paulo')
        .clear()
        .should('have.value','')

        cy.contains('Sobrenome')
        .next('input')
        .type('da Silva P. Campos')
        .clear()
        .should('have.value','')

        cy.contains('E-mail')
        .next('input')
        .type('joaopaulospc@email.com.br')
        .clear()
        .should('have.value','')

        cy.contains('Telefone')
        .next('input')
        .type('3232344')
        .clear()
        .should('have.value','')
    })
    
  })

  describe('Selecionando opções em campos de seleção suspensas', function() {
    
    it('Seleciona o produto YouTube por seu texto', function() {
        // Supondo que o campo de seleção tenha um ID ou outro seletor exclusivo
        cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    })

    it('Seleciona o produto Mentoria por seu valor', function() {
        // Supondo que o campo de seleção tenha um ID ou outro seletor exclusivo
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })

    it('Seleciona o produto Blog por seu índice', function() {
        // Supondo que o campo de seleção tenha um ID ou outro seletor exclusivo
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
    
  })

  describe('Marcando inputs do tipo radio', function() {
    
    it('Marca o tipo de atendimento Feedback', function() {
       cy.get('input[type="radio"][value="feedback"]')
       .check()
       .should('be.checked')
    })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')

        cy.get('input[type="radio"][value="ajuda"]')
        .check()
        .should('be.checked')
        cy.get('input[type="radio"][value="feedback"]').should('not.be.checked')

        cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should('be.checked')
        cy.get('input[type="radio"][value="ajuda"]').should('not.be.checked')
     })

     it('Marca cada tipo de atendimento - Otimizado', function() {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio) {
            cy.wrap($radio)
            .check()
            .should('be.checked')
        })
    })
  })

  describe('Marcando inputs do tipo checkbox', function() {
    
    it('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    
    it('Valida obrigatoriedade do campo Telefone ao marcar meio de contato como Telefone - Usando check()', function() {
        cy.fillMandatoryFields()

        cy.get('#phone-checkbox')
        .check()

        cy.get('.phone-label-span')
        .should('be.visible')
        .invoke('text')
        .should('eq',' (obrigatório)')
        
        cy.get('.button')
        .click()

        cy.get('.error > strong')
        .should('be.visible')
        .invoke('text')  // Pegue o texto do elemento
        .should('eq','Valide os campos obrigatórios!')
    })
  
  })

  describe('Fazendo upload de arquivos', function() {

    it('Seleciona arquivo da pasta fixture', function() {
        cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .then((input) => {
            console.log(input)
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
  })

  describe('Lidando com links que abrem em outra aba', function() {

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.contains('Política de Privacidade')
        .should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.contains('Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
        
        cy.title().then((title) => {
            cy.log(`Título da aba do navegador: ${title}`)
            .should('eq','Central de Atendimento ao Cliente TAT - Política de privacidade')
        })
    })

  })