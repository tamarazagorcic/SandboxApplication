const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')


describe('This is a scipt for testing mandatory fields and field validation on Report issue page.', () =>{
    
    var tester = 'Tamara'
    var summaryError = 'Summary is required'
    var issueTypeError = 'Type of the issue is required'
    var severityError = 'Severity of the issue is required'
    var priorityError = 'Priority of the issue is required'
    var summaryLength = 'Summary needs to be between 5 and 255'
    
    
    beforeEach(() => {
        cy.login(tester)
            .wait(500)
    })

    it('Mandatory fields on report issue page', () => {
        
        cy  
            .get(locators.DASHBOARD.REPORTS).click()
            .get(locators.REPORTS.ADDNEW).click()
            .get(locators.REPORTS.SUBMIT).click()
            .get(locators.GENERAL.ERROR).eq(0).should('have.text', summaryError)
            .get(locators.GENERAL.ERROR).eq(1).should('have.text', issueTypeError)
            .get(locators.GENERAL.ERROR).eq(2).should('have.text', severityError)
            .get(locators.GENERAL.ERROR).eq(3).should('have.text', priorityError)

                              
    })

    it('Field Validation minimum characters for mandatory fields', () => {
        
        var summary = reqConditions.makeid(4)
        var issueType = "Task"
        var severityType = "Medium"
        var priorityType = "Minor"
        
        cy  
            .get(locators.DASHBOARD.REPORTS).click()

        reqConditions.addMandatoryFieldsReport(summary, issueType,severityType,priorityType )

        cy  
            .get(locators.GENERAL.ERROR).eq(0).should('have.text', summaryLength)
            
                                       
    })

    it('Field Validation maximum characters for mandatory fields', () => {
        
        var summary = reqConditions.makeid(256)
        var issueType = "Task"
        var severityType = "Medium"
        var priorityType = "Minor"
        
        cy  
            .get(locators.DASHBOARD.REPORTS).click()

        reqConditions.addMandatoryFieldsReport(summary, issueType,severityType,priorityType )

        cy  
            .get(locators.GENERAL.ERROR).eq(0).should('have.text', summaryLength)
                                       
    })

    afterEach(() => {
        reqConditions.logout()
    })
       

})