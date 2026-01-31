class Menu {
   navegarParaLogin() {
      cy.get('a[href="/login"]').click()
 }
}
export default new Menu()