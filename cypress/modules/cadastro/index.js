class Cadastro {
  preencherFormularioDeCadastroCompleto(userAddress) {
    cy.get('input[type=radio]').check('Mrs')
    cy.get('#password').type('12345', { log: false })

    cy.get('[data-qa="days"]').select('20')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1992')

    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('#first_name').type(userAddress.firstName)
    cy.get('#last_name').type(userAddress.lastName)
    cy.get('#company').type(userAddress.company)
    cy.get('#address1').type(userAddress.address)

    cy.get('#country').select(userAddress.country)
    cy.get('#state').type(userAddress.state)
    cy.get('#city').type(userAddress.city)
    cy.get('[data-qa="zipcode"]').type(userAddress.zipCode)
    cy.get('[data-qa="mobile_number"]').type(userAddress.mobile)

    cy.get('[data-qa="create-account"]').click()
  }
}

export default new Cadastro()

