import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const useCases = require('../fixtures/useCase.json')
const reports = require('../fixtures/reports.json')
const locators = require('../fixtures/locators.json')




Cypress.Commands.add('login', (user) => {

    cy  
        .visit('/')
        .get(locators.LOGIN.LOGINBTN).eq(1).should('include.text' , 'Login').click()
        .get(locators.LOGIN.EMAIL).clear().type(users[user].email)
        .get(locators.LOGIN.PASSWORD).clear().type(users.password)
        .get(locators.LOGIN.SUBMITBTN).click()

})

Cypress.Commands.add('addAutomatedUseCase', (usecase) => {

    cy
        .get(locators.USECASES.ADDNEW).click()
        .get('span').contains('new use case', { matchCase: false })
        .get(locators.USECASES.NAME).click().clear().type(useCases[usecase].title)
        .get(locators.USECASES.DESCRIPTION).click().clear().type(useCases[usecase].description)
        .get(locators.USECASES.EXPECTEDRESULT).click().clear().type(useCases[usecase].expectedResult)
    
        for ( var a =0 ; a<useCases[usecase].steps.length; a++ ) { 
            var locator = "testStepId-"+a
            cy.get('input[name='+locator+"]").click().clear().type(useCases[usecase].steps[a].text)
                .get(locators.USECASES.ADDSTEP).click()
        }

    cy  .get(locators.USECASES.AUTOMATED).click()
        .get(locators.USECASES.SUBMIT).click()
        .wait(2000)
        .get(locators.USECASES.USECASEINLIST).should('include.text',useCases[usecase].title )

})

Cypress.Commands.add('addNonAutomatedUseCase', (usecase) => {

    cy
        .get(locators.USECASES.ADDNEW).click()
        .get('span').contains('new use case', { matchCase: false })
        .get(locators.USECASES.NAME).click().clear().type(useCases[usecase].title)
        .get(locators.USECASES.DESCRIPTION).click().clear().type(useCases[usecase].description)
        .get(locators.USECASES.EXPECTEDRESULT).click().clear().type(useCases[usecase].expectedResult)
    
        for ( var a =0 ; a<useCases[usecase].steps.length; a++ ) { 
            var locator = "testStepId-"+a
            cy.get('input[name='+locator+"]").click().clear().type(useCases[usecase].steps[a].text)
                .get(locators.USECASES.ADDSTEP).click()
        }

    cy  
        .get(locators.USECASES.SUBMIT).click()
        .wait(2000)
        .get(locators.USECASES.USECASEINLIST).should('include.text',useCases[usecase].title )

})

Cypress.Commands.add('editUseCase', (useCaseOld, useCaseNew) => {

    cy  
        .get(locators.DASHBOARD.USECASES).click()
        .get(locators.USECASES.ADDNEW).should('be.visible')
        .get(locators.USECASES.USECASEINLIST).contains(useCases[useCaseOld].title, { matchCase: false }).click()
        .wait(1000)
        .get(locators.USECASES.NAME).click().clear().type(useCases[useCaseNew].title)
        .get(locators.USECASES.DESCRIPTION).click().clear().type(useCases[useCaseNew].description)
        .get(locators.USECASES.EXPECTEDRESULT).click().clear().type(useCases[useCaseNew].expectedResult)

        for ( var a =0 ; a<useCases[useCaseNew].steps.length; a++ ) { 
            var locator = "testStepId-"+a
            cy.get('input[name='+locator+"]").click().clear().type(useCases[useCaseNew].steps[a].text)
        
        }

    cy  .get(locators.USECASES.SUBMIT).click()
        .wait(2000)
        .get(locators.USECASES.USECASEINLIST).should('include.text',useCases[useCaseNew].title )

})

Cypress.Commands.add('deleteUseCase', (usecase) => {

    cy
        .get(locators.HEADER.SANDBOX).eq(0).click()
        .get(locators.DASHBOARD.USECASES).click()
        .get(locators.USECASES.USECASEINLIST).contains(useCases[usecase].title, { matchCase: false }).click()
        .wait(1000)
        .get(locators.USECASES.DELETE).click() 
        .get(locators.USECASES.CONFIRMDELETE).contains("Delete", { matchCase: true }).click()
        .wait(3000)
        .get(locators.USECASES.USECASEINLIST).should('not.include.text',useCases[usecase].title )

})

Cypress.Commands.add('deleteTitle', (title) => {

    cy
        .get(locators.HEADER.SANDBOX).eq(0).click()
        .get(locators.DASHBOARD.USECASES).click()
        .get(locators.USECASES.USECASEINLIST).contains(title, { matchCase: false }).click()
        .wait(1000)
        .get(locators.USECASES.DELETE).click() 
        .get(locators.USECASES.CONFIRMDELETE).contains("Delete", { matchCase: true }).click()
        .wait(5000)
        .get(locators.USECASES.USECASEINLIST).should('not.include.text',title)

})

Cypress.Commands.add('countCharactersAndType', (location) => {
        
    var text1 = 'This field previously had '
    var text2 = ' characters. '
    cy.get(location).invoke('val').then(text => {
          
        const someText = text;
    
        var number = someText.length
       
        cy.get(location).click().clear().type(text1 + number + text2)
        .wait(1000)  

    });
    
})

Cypress.Commands.add('addReport', (report) => {

    cy  
        .get(locators.REPORTS.ADDNEW).click()
        .get('span').contains('Report Issue', { matchCase: false })
        .get(locators.REPORTS.SUMMARY).click().clear().type(reports[report].summary)
        .get(locators.REPORTS.TYPE).select(reports[report].type)  
        .get(locators.REPORTS.SEVERITY).select(reports[report].severity) 
        .get(locators.REPORTS.PRIORITY).select(reports[report].priority) 
        
    
    
        for ( var a =0 ; a<reports[report].steps.length; a++ ) { 
            var locator = "testStepId-"+a
            cy.get('input[name='+locator+"]").click().clear().type(reports[report].steps[a].text)
                .get(locators.REPORTS.ADDSTEP).click()
        }

    cy  .get(locators.REPORTS.SUBMIT).click()
        .wait(2000)
        .get(locators.REPORTS.REPORTINLIST).should('include.text',reports[report].summary )

})

Cypress.Commands.add('editReport', (reportOld, reportNew) => {

    cy  
        .get(locators.DASHBOARD.REPORTS).click()
        .get(locators.REPORTS.ADDNEW).should('be.visible')
        .get(locators.REPORTS.REPORTINLIST).contains(reports[reportOld].summary, { matchCase: false }).click()
        .wait(1000)
        .get(locators.REPORTS.SUMMARY).click().clear().type(reports[reportNew].summary)
        .get(locators.REPORTS.TYPE).select(reports[reportNew].type)  
        .get(locators.REPORTS.SEVERITY).select(reports[reportNew].severity) 
        .get(locators.REPORTS.PRIORITY).select(reports[reportNew].priority)

        for ( var a =0 ; a<reports[reportNew].steps.length; a++ ) { 
            var locator = "testStepId-"+a
            cy.get('input[name='+locator+"]").click().clear().type(reports[reportNew].steps[a].text)
        
        }

        
    cy  
        .get(locators.REPORTS.SUBMIT).click()
        .wait(2000)
        .get(locators.REPORTS.REPORTINLIST).should('include.text',reports[reportNew].summary )
      

})

Cypress.Commands.add('addPhotoToReport', (report) => {

    cy  
        .get(locators.HEADER.SANDBOX).eq(0).click()
        .get(locators.DASHBOARD.REPORTS).click()
        .get(locators.REPORTS.ADDNEW).should('be.visible')
        .get(locators.REPORTS.REPORTINLIST).contains(reports[report].summary, { matchCase: false }).click()
        .wait(1000)
                
    cy  
        .uploadPhoto('testphoto3.jpg')
        .get(locators.GENERAL.SYSTEMMESSGAE).should('include.text','Photo successfully uploaded' )
        .get(locators.REPORTS.SUBMIT).click()
        .wait(2000)
        .get(locators.REPORTS.REPORTINLIST).should('include.text',reports[report].summary )
      

})

Cypress.Commands.add('removePhotoFromReport', (report) => {

    cy
        .get(locators.HEADER.SANDBOX).eq(0).click()
        .get(locators.DASHBOARD.REPORTS).click()
        .get(locators.REPORTS.REPORTINLIST).contains(reports[report].summary, { matchCase: false }).click()
        .wait(1000)
        .get(locators.REPORTS.DELETEIMG).click() 
        .get(locators.GENERAL.SYSTEMMESSGAE).should('include.text','Photo successfully removed' )
        .wait(3000)

})

Cypress.Commands.add('deleteReport', (report) => {

    cy
        .get(locators.HEADER.SANDBOX).eq(0).click()
        .get(locators.DASHBOARD.REPORTS).click()
        .get(locators.REPORTS.REPORTINLIST).contains(reports[report].summary, { matchCase: false }).click()
        .wait(1000)
        .get(locators.REPORTS.DELETE).click() 
        .get(locators.REPORTS.CONFIRMDELETE).contains("Delete", { matchCase: true }).click()
        .wait(3000)
        .get(locators.REPORTS.REPORTINLIST).should('not.include.text',reports[report].summary )

})

Cypress.Commands.add('uploadPhoto', (uploadPhotoName) => {
    const fileName = `media/photos/${uploadPhotoName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.REPORTS.ADDIMG).upload({ fileContent, fileName, mimeType: 'image/jpeg', encoding: 'binary' },
    
    )
    })
})

