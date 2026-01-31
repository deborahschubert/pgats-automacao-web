// Automation Exercise
// Test Case 1: Register User
// Test Case 2: Login User with correct email and password
// Test Case 3: Login User with incorrect email and password
// Test Case 4: Logout User
// Test Case 5: Register User with existing email
// Test Case 6: Contact Us Form
// Test Case 8: Verify All Products and product detail page
// Test Case 9: Search Product
// Test Case 10: Verify Subscription in home page
// Test Case 15: Place Order: Register before Checkout

/// <reference types="cypress" />

import userData from "../fixtures/example.json";
import { PAYMENT, USER } from '../support/constants';
import { createUserAddress } from '../support/helpers'

import menu from "../modules/menu";
import login from "../modules/login";
import cadastro from "../modules/cadastro";
import pagamento from '../modules/pagamento';
import produtos from '../modules/produtos';
import { faker } from "@faker-js/faker";

const timestamp = Date.now();
const email = `qa-tester-${timestamp}@test.com`;

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com/", {
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true,
    });
  });
  //Teste 1
  it("Cadastrar um usuário", () => {
    const userAddress = createUserAddress()
    menu.navegarParaLogin();
    cy.contains("New User Signup!").should("be.visible");

    login.preencherFormularioDePreCadastro(USER.name, email);

    cy.contains("Enter Account Information").should("be.visible");
    
    cadastro.preencherFormularioDeCadastroCompleto(userAddress)

    cy.url().should("include", "account_created");
    cy.contains("b", "Account Created!");

    cy.contains("a", "Continue").click();
    cy.contains(`Logged in as ${USER.name}`).should("be.visible");

    cy.contains("a", "Delete Account").click();
    cy.contains("b", "Account Deleted!").should("be.visible");
    cy.contains("a", "Continue").click();
  });

  //Teste 2
  it('Login com usuário criado no teste', () => {
    const email = faker.internet.email()
    const userAddress = createUserAddress()

    menu.navegarParaLogin()
    login.preencherFormularioDePreCadastro(USER.name, email)

    cadastro.preencherFormularioDeCadastroCompleto(userAddress)

    cy.contains('Continue').click()
    cy.get('a[href="/logout"]').click()

    login.fazerLogin(email, USER.password)

    cy.contains(`Logged in as ${USER.name}`).should('be.visible')
  });

  //Teste 3
  it("Login de Usuário com e-mail e senha incorretos", () => {
    menu.navegarParaLogin();

    cy.get('[data-qa="login-email"]').type(faker.internet.email());
    cy.get('[data-qa="login-password"]').type(
      faker.internet.password({ length: 5 }),
    );
    cy.get('[data-qa="login-button"]').click();

    cy.get(".login-form > form > p").should(
      "contain",
      "Your email or password is incorrect!",
    );
  });

  //Teste 4
  it('Logout de usuário', () => {
    menu.navegarParaLogin()

    login.fazerLogin(USER.existingEmail, USER.password)

    cy.contains(`Logged in as ${USER.name}`).should('be.visible')
    cy.get('a[href="/logout"]').click()
  });

  //Teste 5
  it('Cadastrar usuário com email existente', () => {
    menu.navegarParaLogin()

    login.preencherFormularioDeCadastroComEmailExistente(USER.name, USER.existingEmail)

    cy.contains('Email Address already exist!').should('be.visible')
  });

  //Teste 6
  it("Enviar um Formulário de contato com upload de arquivo", () => {
    cy.get("a[href*=contact]").click();

    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);

    cy.fixture("example.json").as("arquivo");
    cy.get("input[type=file]").selectFile("@arquivo");

    cy.get('[data-qa="submit-button"]').click();
    cy.get(".status")
      .should("be.visible")
      .and(
        "have.text",
        "Success! Your details have been submitted successfully.",
      );
  });

  //Teste 8
  it("Verificar lista de produtos e detalhes do produto", () => {
    produtos.acessarPaginaProdutos();

    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");
    produtos.getListaProdutos().should("be.visible");

    produtos.acessarPrimeiroProduto();

    cy.url().should("include", "/product_details");

    produtos.getInformacoesProduto().within(() => {
      cy.get("h2").should("be.visible");
      cy.contains("Category").should("be.visible");
      cy.contains("Rs.").should("be.visible");
      cy.contains("Availability").should("be.visible");
      cy.contains("Condition").should("be.visible");
      cy.contains("Brand").should("be.visible");
    });
  });

  //Teste 9
  it("Buscar produto pelo nome", () => {
    cy.contains("Products").click();

    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");

    cy.get("#search_product").type("Dress");
    cy.get("#submit_search").click();

    cy.contains("Searched Products").should("be.visible");

    cy.get(".features_items .product-image-wrapper")
      .should("have.length.greaterThan", 0)
      .and("be.visible");
  });

  //Teste 10
  it("Verificar inscrição por e-mail", () => {
    cy.scrollTo("bottom");

    cy.contains("Subscription").should("be.visible");

    const email = faker.internet.email();

    cy.get("#susbscribe_email").type(email);
    cy.get("#subscribe").click();

    cy.contains("You have been successfully subscribed!").should("be.visible");
  });
  
  //Teste 15 
  it('Realizar pedido com cadastro antes do checkout', () => {
    const userAddress = createUserAddress()
    menu.navegarParaLogin()

    login.preencherFormularioDePreCadastro(USER.name, email)
    cadastro.preencherFormularioDeCadastroCompleto(userAddress);
    
    cy.contains('Continue').click()
    cy.contains(`Logged in as ${USER.name}`).should('be.visible')

    cy.contains('Products').click()
    cy.contains('Add to cart').first().click()
    cy.contains('Continue Shopping').click()

    cy.contains('Cart').click()
    cy.contains('Proceed To Checkout').click()

    cy.contains('Address Details').should('be.visible')
    cy.contains('Review Your Order').should('be.visible')

    cy.get('textarea[name="message"]').type('Pedido realizado via teste automatizado')
    cy.contains('Place Order').click()

    pagamento.preencherDadosDoCartao(PAYMENT)
    pagamento.confirmarPagamento()

    cy.contains('Order Placed!').should('be.visible')
  })

});
