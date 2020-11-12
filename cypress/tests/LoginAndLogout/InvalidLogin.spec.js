const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')
const users = require('../../fixtures/users.json')


describe('This is a scipt for testing invalid login to Sandbox application', () =>{
    
    var tester = 'Tamara'
    
    beforeEach(() => {
        cy.visit('/')
            .wait(500)
    })

    it('Mandaotory fields on Login page', () => {
        

        cy  
            .get(locators.LOGIN.LOGINBTN).eq(1).should('include.text' , 'Login').click()
            .get(locators.LOGIN.SUBMITBTN).click()
            .get(locators.GENERAL.ERROR).eq(0).should('include.text' , 'Email field is required')
            .get(locators.GENERAL.ERROR).eq(1).should('include.text' , 'Password is required')
            .get(locators.HEADER.SANDBOX).should('not.be.visible')
                       
    })

    it('Should not be able to login to the Sandbox application with invalid password', () => {
        
        var invalidPassword = reqConditions.makeid(10)
        cy  
            .get(locators.LOGIN.LOGINBTN).eq(1).should('include.text' , 'Login').click()
            .get(locators.LOGIN.EMAIL).clear().type(users[tester].email)
            .get(locators.LOGIN.PASSWORD).clear().type(invalidPassword)
            .get(locators.LOGIN.SUBMITBTN).click()
            .get(locators.GENERAL.ERROR).should('include.text' , 'Password incorrect')
            .get(locators.HEADER.SANDBOX).should('not.be.visible')
                       
    })

    it('Should not be able to login to the Sandbox application with email that is not in database', () => {
        
        var invalidEmail = "tamara.bjelobrk" + reqConditions.makeid(2) + "@gmail.com"
        cy  
            .get(locators.LOGIN.LOGINBTN).eq(1).should('include.text' , 'Login').click()
            .get(locators.LOGIN.EMAIL).clear().type(invalidEmail)
            .get(locators.LOGIN.PASSWORD).clear().type(users.password)
            .get(locators.LOGIN.SUBMITBTN).click()
            .get(locators.GENERAL.ERROR).should('include.text' , 'User not found')
            .get(locators.HEADER.SANDBOX).should('not.be.visible')
                       
    }) 

})