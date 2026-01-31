import userData from '../../fixtures/example.json';

class Contato {
  preencherFormularioDeContato() {
    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);
  }

  enviarFormularioComArquivo() {
    cy.fixture('example.json').as('arquivo');
    cy.get('input[type=file]').selectFile('@arquivo');
    cy.get('[data-qa="submit-button"]').click();
  }

  verificarMensagemDeSucesso() {
    cy.get('.status').should('be.visible');
  }
}

export default new Contato();