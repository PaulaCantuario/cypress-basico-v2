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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.visit('../../src/index.html')
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
}) 

Cypress.Commands.add('fillMandatoryFields', () => {
    cy.visit('../../src/index.html')
    cy.get('#firstName')//o uso do # irá buscar na página o elemento cujo id seja firstName
        .type('João Paulo')

        cy.get('#lastName')
        .type('da Silva P. Campos')

        cy.get('#email')
        .type('joaopaulospc@email.com.br')

        cy.get('#open-text-area')
        .type('Eu gostaria de mais informações sobre o serviço oferecido')
}) 