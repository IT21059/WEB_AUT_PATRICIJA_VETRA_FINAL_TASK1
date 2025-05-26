describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

import PracticeFormPage from '../../support/pages/PracticeFormPage'

describe('DemoQA Practice Form', () => {
  const testData = {
    firstName: 'Patricija',
    lastName: 'Vetra',
    email: 'patricija.vetra@gmail.com',
    gender: 'Female',
    mobile: '0123456789',
    dob: '1930-02-28',
    subjects: 'Economics',
    hobbies: 'Music',
    picture: 'kitty.jpeg',
    address: 'Sweden',
    state: 'NCR',
    city: 'Delhi'
  }

  beforeEach(() => {
    PracticeFormPage.visit()
  })

  it('should submit form successfully', () => {
    // Fill basic information
    PracticeFormPage.elements.firstName().type(testData.firstName)
    PracticeFormPage.elements.lastName().type(testData.lastName)
    PracticeFormPage.elements.email().type(testData.email)
    PracticeFormPage.elements.gender(testData.gender).click()
    PracticeFormPage.elements.mobile().type(testData.mobile)
    
    // Set Date of Birth
    PracticeFormPage.setDateOfBirth(testData.dob)
    
    // Set Subjects
    PracticeFormPage.setSubjects(testData.subjects)
    
    // Set Hobbies
    PracticeFormPage.elements.hobbiesCheckbox(testData.hobbies).check()
    
    // Upload Picture
    PracticeFormPage.elements.uploadPicture()
      .selectFile(`cypress/fixtures/files/${testData.picture}`)
    
    // Set Address
    PracticeFormPage.elements.currentAddress().type(testData.address)
    
    // Set State and City
    PracticeFormPage.setStateAndCity(testData.state, testData.city)
    
    // Submit Form
    PracticeFormPage.submitForm()

    // Validate Modal
    PracticeFormPage.elements.modalTable().within(() => {
      cy.contains('Student Name').next().should('contain', `${testData.firstName} ${testData.lastName}`)
      cy.contains('Student Email').next().should('contain', testData.email)
      cy.contains('Gender').next().should('contain', testData.gender)
      cy.contains('Mobile').next().should('contain', testData.mobile)
      cy.contains('Date of Birth').next().should('contain', '28 February,1930')
      cy.contains('Subjects').next().should('contain', testData.subjects)
      cy.contains('Hobbies').next().should('contain', testData.hobbies)
      cy.contains('Picture').next().should('contain', testData.picture)
      cy.contains('Address').next().should('contain', testData.address)
      cy.contains('State and City').next().should('contain', `${testData.state} ${testData.city}`)
    })
  })
})

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

Cypress.on("uncaught:exception", (err, runnable) => {
return false;
});