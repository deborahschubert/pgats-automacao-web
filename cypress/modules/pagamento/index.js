class Pagamento {
  preencherDadosDoCartao(payment) {
    cy.get('[data-qa="name-on-card"]').type(payment.nameOnCard)
    cy.get('[data-qa="card-number"]').type(payment.cardNumber)
    cy.get('[data-qa="cvc"]').type(payment.cvc)
    cy.get('[data-qa="expiry-month"]').type(payment.expiryMonth)
    cy.get('[data-qa="expiry-year"]').type(payment.expiryYear)
  }

  confirmarPagamento() {
    cy.get('[data-qa="pay-button"]').click()
  }
}

export default new Pagamento()

