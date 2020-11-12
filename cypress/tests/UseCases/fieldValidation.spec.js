const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')


describe('This is a scipt for testing mandatory fields and field validation on Use Cases page.', () =>{
    
    var tester = 'Tamara'
    var titleError = 'Title is required'
    var expectedResultError = 'Expected result is required'
    var stepsError = 'There must be at least one test step'
    var titleLength = 'Title needs to be between 5 and 255'
    var expectedResultLength = 'Expected results needs to be between 5 and 255'
    var stepsLength = 'Test step needs to be between 0 and 255'
    
    beforeEach(() => {
        cy.login(tester)
            .wait(500)
    })

    it('Mandatory fields on Use Cases page', () => {
        
        cy  
            .get(locators.DASHBOARD.USECASES).click()
            .get(locators.USECASES.ADDNEW).click()
            .get(locators.USECASES.SUBMIT).click()
            .get(locators.GENERAL.ERROR).eq(0).should('have.text', titleError)
            .get(locators.GENERAL.ERROR).eq(1).should('have.text', expectedResultError)
            .get(locators.GENERAL.ERROR).eq(2).should('have.text', stepsError)
                              
    })

    it('Field Validation minimum characters for mandatory fields', () => {
        
        var title = reqConditions.makeid(4)
        var expectedResult = reqConditions.makeid(4)
        var step = " "
        cy  
            .get(locators.DASHBOARD.USECASES).click()

        reqConditions.addMandatoryFieldsUseCase(title, expectedResult,step)

        cy  
            .get(locators.GENERAL.ERROR).eq(0).should('have.text', titleLength)
            .get(locators.GENERAL.ERROR).eq(1).should('have.text', expectedResultLength)
            .get(locators.GENERAL.ERROR).eq(2).should('not.have.text', stepsLength)
                                       
    })

    it('Field Validation maximum characters for mandatory fields', () => {
        
        var title = reqConditions.makeid(256)
        var expectedResult = reqConditions.makeid(256)
        var step = reqConditions.makeid(256)

        cy  
            .get(locators.DASHBOARD.USECASES).click()

        reqConditions.addMandatoryFieldsUseCase(title, expectedResult,step)

        cy  
            .get(locators.GENERAL.ERROR).eq(0).should('have.text', titleLength)
            .get(locators.GENERAL.ERROR).eq(1).should('have.text', expectedResultLength)
            .get(locators.GENERAL.ERROR).eq(2).should('have.text', stepsLength)
                                       
    })

    afterEach(() => {
        reqConditions.logout()
    })
       

})