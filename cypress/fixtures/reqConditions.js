const users = require('./users.json')
const locators = require('./locators.json')
const useCases = require('./useCase.json')

class ReqCondition {

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }


    logout(){

        cy
            .get(locators.HEADER.LOGOUT).should('contain.text', "Logout").click()
            .get(locators.LOGIN.LOGINBTN).should('be.visible')
    } 


    addMandatoryFieldsUseCase(title, expectedResult, step) {
        cy
            .get(locators.USECASES.ADDNEW).click()
            .get('span').contains('new use case', { matchCase: false })
            .get(locators.USECASES.NAME).click().clear().type(title)
            .get(locators.USECASES.EXPECTEDRESULT).click().clear().type(expectedResult)  
            .get(locators.USECASES.FIRSTSTEP).click().clear().type(step)
            .get(locators.USECASES.SUBMIT).click()
                   
    }

    addMandatoryFieldsReport(summary, type, severity, priority) {
        cy
            .get(locators.REPORTS.ADDNEW).click()
            .get('span').contains('Report Issue', { matchCase: false })
            .get(locators.REPORTS.SUMMARY).click().clear().type(summary)
            .get(locators.REPORTS.TYPE).select(type)  
            .get(locators.REPORTS.SEVERITY).select(severity) 
            .get(locators.REPORTS.PRIORITY).select(priority) 
            .get(locators.REPORTS.SUBMIT).click()
                   
    }

    editUseCaseByCountCharacters(usecase){
        cy
            .get(locators.USECASES.USECASEINLIST).contains(useCases[usecase].title, { matchCase: false }).click()
    
        cy.countCharactersAndType(locators.USECASES.NAME)
        cy.countCharactersAndType(locators.USECASES.DESCRIPTION)
        cy.countCharactersAndType(locators.USECASES.EXPECTEDRESULT)
        
        for ( var a =0 ; a<useCases[usecase].steps.length; a++ ) { 
            
            var locator = "testStepId-"+a
            cy.countCharactersAndType("input[name="+locator+"]")
             
        }
 
    }


}

export default new ReqCondition()
