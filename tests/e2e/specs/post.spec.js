describe("Display Current User Twitter Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Validate current user new post textarea", () => {
    cy.get("div[id=createPost]").should("be.visible");
    cy.get("div[id=createPost]")
      .find(".v-card__title")
      .should("be.visible")
      .contains("New Post");
    cy.get("div[id=createPost]")
      .find(".v-card__text")
      .find(".v-avatar")
      .find("img")
      .should("have.attr", "src")
      .and("include", "https://i.pravatar.cc/150?u=607b8f61f1c34110937750e2");
    cy.get("div[id=createPost]")
      .find(".v-card__text")
      .find(".v-input.v-textarea")
      .should("be.visible");
    cy.get("div[id=createPost]")
      .find(".v-card__text")
      .find("label[for='postTextarea']")
      .should("be.visible")
      .contains("¿What are you thinking about?");
  });

  it("Current user publishes new post on his/her timeline", () => {
    cy.get("div[id=createPost]")
      .click()
      .type("{selectall}Hello this is a test for Lookiero");
    cy.get("button[id='postNewTweet']").click();
    cy.get("div[id=timeline]")
      .find(".v-virtual-scroll__item")
      .each(($el, $id) => {
        if ($id === 0) {
          cy.wrap($el).find(".v-list-item__avatar").should("be.visible");
          cy.wrap($el)
            .find(".v-avatar")
            .find(".v-image")
            .should("have.attr", "id")
            .and("include", "timelineUserImage-lesa");
          cy.wrap($el).find(".v-list-item__content").should("be.visible");
          cy.wrap($el)
            .find(".v-list-item__content")
            .find(".v-list-item__title.subheading")
            .should("be.visible")
            .contains("Lesa Compton");
          cy.wrap($el)
            .find(".v-list-item__content")
            .find(".v-list-item__subtitle")
            .should("be.visible")
            .contains("Hello this is a test for Lookiero");
          cy.wrap($el)
            .find(".v-list-item__action")
            .should("be.visible")
            .find(".v-list-item__action-text")
            .contains(" a few seconds ago ");
        }
      });
  });
});
