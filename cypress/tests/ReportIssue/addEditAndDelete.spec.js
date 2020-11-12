const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')


describe('This is a scipt for testing adding Report, editing Report and deleting Report on Sandbox application', () =>{
    
    var tester = 'Tamara'
    var report = 'Report1'
    var editReport = 'Report2'
    
    beforeEach(() => {
        cy.login(tester)
            .wait(500)
    })

    it('Adding Report on Sandbox application', () => {
        
        cy  
            .get(locators.DASHBOARD.REPORTS).click()
            .addReport(report)  
                              
    })

    it('Edit Report on Sandbox application and upload photo', () => {
        
        cy  
            .editReport(report, editReport)
            .addPhotoToReport(editReport)  
                          
    })

    it('Delete Report on Sandbox application', () => {
        
        cy
            .removePhotoFromReport(editReport)   
            .deleteReport(editReport)  
                                   
    })

    afterEach(() => {
        reqConditions.logout()
    })
       

})