import 'cypress-file-upload'
const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')


describe('This is a Exam scipt for testing Sandbox application', () =>{
    
    var tester = 'Tamara'
    var edit = 'UseCase4'
    var title 
        
    before(() => {
        cy.login(tester)
            .wait(2000)
    })

    it('Should be able to add 4 use cases to the Use Cases list and edit one use case by rules on the Exame page', () => {
        
        
        cy.get(locators.DASHBOARD.USECASES).click()
        cy.addAutomatedUseCase('UseCase1')
        cy.addAutomatedUseCase('UseCase2')
        cy.addAutomatedUseCase('UseCase3')
        cy.addNonAutomatedUseCase('UseCase4')

        reqConditions.editUseCaseByCountCharacters(edit)
               
      
        cy.get(locators.USECASES.NAME).invoke('val').then(text => {
            title=text
            cy  
                .get(locators.USECASES.SUBMIT).click()
                .wait(2000)
                .get(locators.USECASES.USECASEINLIST).contains(text, { matchCase: false }).click()
        
        })
                   
    })

    after(() => {
        cy.deleteUseCase('UseCase1')
        cy.deleteUseCase('UseCase2')
        cy.deleteUseCase('UseCase3')
        cy.deleteTitle(title)
        reqConditions.logout()
     })
})