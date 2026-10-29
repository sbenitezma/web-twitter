// `auto-grow` makes Vuetify render a hidden `.v-textarea__sizer` textarea next to the real one
describe("Home timeline", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the navbar, the social area and the timeline", () => {
    cy.getByTest("navbar-home").should("contain", "Social Chirp");
    cy.getByTest("navbar-user")
      .should("contain", "Lesa Compton")
      .and("contain", "@lesa");
    cy.getByTest("following-users").should("be.visible");
    cy.getByTest("suggested-users").should("be.visible");
    cy.getByTest("post-composer").should("be.visible");
    cy.getByTest("timeline").find('[data-test="post-item"]').should("have.length.greaterThan", 0);
  });

  it("keeps the publish button disabled for empty posts", () => {
    cy.getByTest("post-submit").should("be.disabled");
    cy.getByTest("post-textarea").find("textarea:not(.v-textarea__sizer)").type("   ");
    cy.getByTest("post-submit").should("be.disabled");
  });

  it("publishes a post, clears the textarea and keeps it after reloading", () => {
    const message = `Hello from Cypress ${Date.now()}`;

    cy.getByTest("post-textarea").find("textarea:not(.v-textarea__sizer)").type(message);
    cy.getByTest("post-submit").click();

    cy.getByTest("post-textarea").find("textarea:not(.v-textarea__sizer)").should("have.value", "");
    cy.getByTest("post-item")
      .first()
      .within(() => {
        cy.getByTest("post-author").should("have.text", "Lesa Compton");
        cy.getByTest("post-content").should("have.text", message);
        cy.getByTest("post-date").should("contain", "just now");
      });

    cy.reload();
    cy.getByTest("post-content").first().should("have.text", message);
  });

  it("restores the demo data from the user menu", () => {
    cy.getByTest("post-textarea").find("textarea:not(.v-textarea__sizer)").type("Temporary post");
    cy.getByTest("post-submit").click();
    cy.getByTest("post-content").first().should("have.text", "Temporary post");

    cy.getByTest("navbar-user").click();
    cy.getByTest("reset-demo").click();

    cy.getByTest("post-content").first().should("not.have.text", "Temporary post");
  });
});
