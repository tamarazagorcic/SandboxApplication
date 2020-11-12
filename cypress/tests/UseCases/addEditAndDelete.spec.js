const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')


describe('This is a scipt for testing adding Use Case, editing Use Case and deleting Use Case on Sandbox application', () =>{
    
    var tester = 'Tamara'
    var useCase = 'UseCase5'
    var editUseCase = 'UseCase6'
    
    beforeEach(() => {
        cy.login(tester)
            .wait(500)
    })

    it('Adding Use Case on Sandbox application', () => {
        
        cy  
            .get(locators.DASHBOARD.USECASES).click()
            .addNonAutomatedUseCase(useCase)  
                              
    })

    it('Edit Use Case on Sandbox application', () => {
        
        cy  
            .editUseCase(useCase, editUseCase)  
                          
    })

    it('Delete Use Case on Sandbox application', () => {
        
        cy
            .deleteUseCase(editUseCase)  
                                   
    })

    afterEach(() => {
        reqConditions.logout()
    })
       

})