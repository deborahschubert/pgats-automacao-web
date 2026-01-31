class Produtos {
  acessarPaginaProdutos() {
    cy.contains("Products").click();
  }

  acessarPrimeiroProduto() {
    cy.get(".features_items .product-image-wrapper")
      .first()
      .contains("View Product")
      .click();
  }

  getListaProdutos() {
    return cy.get(".features_items");
  }

  getInformacoesProduto() {
    return cy.get(".product-information");
  }
}

export default new Produtos();
