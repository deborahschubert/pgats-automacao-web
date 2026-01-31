class Login {
  preencherFormularioDePreCadastro(name, email) {
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
  }

  fazerLogin(email, password) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()
  }
  
  preencherFormularioDeCadastroComEmailExistente(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
  }
}


export default new Login()
