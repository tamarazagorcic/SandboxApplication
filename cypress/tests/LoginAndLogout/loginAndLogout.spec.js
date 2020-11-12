const locators = require('../../fixtures/locators.json')
const users = require('../../fixtures/users.json')


describe('This is a scipt for testing valid login to Sandbox application', () =>{
    
    var tester = 'Tamara'
    before(() => {
        cy.visit('/')
            .wait(500)
    })
    it('Should be able to login successfully to the Sandbox application', () => {
        
        cy  
            .get(locators.LOGIN.LOGINBTN).eq(1).should('include.text' , 'Login').click()
            .get(locators.LOGIN.EMAIL).clear().type(users[tester].email)
            .get(locators.LOGIN.PASSWORD).clear().type(users.password)
            .get(locators.LOGIN.SUBMITBTN).click()
            .get(locators.HEADER.SANDBOX).should('be.visible')
            
               
    })

    it('Should be able to logout successfully from the Sandbox application', () => {
        
        cy.login(tester)
        cy
            .get(locators.HEADER.SANDBOX).should('be.visible')
            .get(locators.HEADER.LOGOUT).should('contain.text', "Logout").click()
            .get(locators.LOGIN.LOGINBTN).should('be.visible')
                       
    })

})