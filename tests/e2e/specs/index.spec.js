describe("Display Web Twitter Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should render Navbar", () => {
    cy.get("[id^=navbarUserImage]")
      .should("be.visible")
      .should("have.attr", "src")
      .should("not.be.empty");
    cy.get("[class='v-toolbar__title']").should("be.visible");
    cy.get("[id^=userData]").find("span").should("be.visible");
    cy.get("[id=webTwitter]").should("be.visible");
  });

  it("Should render Following Users section", () => {
    cy.get("[id=followingUsers]").should("be.visible");
    cy.get("[id=followingUsers]").find(".v-card__title").should("be.visible");
    cy.get("[id=followingUsers]")
      .find(".v-card__text")
      .find(".v-list")
      .should("be.visible");
  });

  it("Should render Follow Users section", () => {
    cy.get("[id=followUsers]").should("be.visible");
    cy.get("[id=followUsers]").find(".v-card__title").should("be.visible");
    cy.get("[id=followUsers]")
      .find(".v-card__text")
      .find(".v-list")
      .should("be.visible");
  });

  it("Should render profile header", () => {
    cy.get("[id=profileHeaderImage]").should("be.visible");
    cy.get("[id=profileHeaderImage]")
      .find(".v-image__image")
      .should("have.css", "background-image");
    cy.get("[id=profileHeaderImage]")
      .find(".v-responsive__content")
      .find(".v-image__image--cover")
      .should("have.css", "background-image");
  });

  it("Should render timeline", () => {
    cy.get("div[id=timeline]")
      .find(".v-card__title")
      .find(".v-list-item__title.title")
      .should("be.visible");
    cy.get("div[id=timeline]").find(".v-card__text").should("be.visible");
    cy.get("div[id=timeline]")
      .find(".v-virtual-scroll__item")
      .should("be.visible");
  });
});
