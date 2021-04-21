describe("Display Current User Twitter Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should render User Image on Navbar", () => {
    cy.get("[id^=navbarUserImage]")
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "https://i.pravatar.cc/150?u=607b8f61f1c34110937750e2");
    cy.get("[id^=userData]")
      .find("span")
      .should("have.text", " Lesa Compton @lesa");
  });

  it("Should render visible current user following people", () => {
    cy.get("[id=followingUsers]")
      .find(".v-card__text")
      .find(".v-list")
      .find(".v-list-item__title:visible")
      .should("have.length", 4);
  });

  it("Should render visible current user up to follow people", () => {
    cy.get("[id=followUsers]")
      .find(".v-card__text")
      .find(".v-list")
      .find(".v-list-item__title:visible")
      .should("have.length", 4);
  });

  it("Should render current user profile header", () => {
    cy.get("[id=profileHeaderImage]")
      .find(".v-image__image")
      .should("have.css", "background-image")
      .and("include", "https://picsum.photos/id/106/1001/300");
    cy.get("[id=profileHeaderImage]")
      .find(".v-responsive__content")
      .find(".v-image__image--cover")
      .should("have.css", "background-image")
      .and("include", "https://i.pravatar.cc/150?u");
  });

  it("Should render current user timeline", () => {
    cy.get("div[id=timeline]")
      .find(".v-card__title")
      .find("span")
      .contains("Lesa Compton -  @lesa");
    cy.get("div[id=timeline]")
      .find(".v-virtual-scroll__item")
      .should("be.visible")
      .should("have.length", 3);
  });

  it("Validate current user timeline posts", () => {
    cy.get("div[id=timeline]")
      .find(".v-virtual-scroll__item")
      .each(($el, $id) => {
        if ($id === 0) {
          cy.wrap($el).find(".v-list-item__avatar").should("be.visible");
          cy.wrap($el)
            .find(".v-avatar")
            .find(".v-image")
            .should("have.attr", "id")
            .and("include", "timelineUserImage-lesa-607b8f61c47904accfd00f8e");
          cy.wrap($el).find(".v-list-item__content").should("be.visible");
          cy.wrap($el)
            .find(".v-list-item__content")
            .find(".v-list-item__title.subheading")
            .should("be.visible")
            .contains("Lesa Compton");
          cy.wrap($el)
            .find(".v-list-item__action")
            .should("be.visible")
            .find(".v-list-item__action-text")
            .contains(" a month ago ");
        } else {
          cy.wrap($el).find(".v-list-item__avatar").should("be.visible");
          cy.wrap($el)
            .find(".v-avatar")
            .find(".v-image")
            .should("have.attr", "id");
          cy.wrap($el).find(".v-list-item__content").should("be.visible");
          cy.wrap($el)
            .find(".v-list-item__content")
            .find(".v-list-item__title.subheading")
            .should("be.visible");
          cy.wrap($el)
            .find(".v-list-item__action")
            .find(".v-list-item__action-text")
            .should("be.visible");
        }
      });
  });
});

describe("Display Follower User Timeline", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should click on first following user and display the info", () => {
    cy.get("[id=followingUsers]").find(".v-list-item__avatar").first().click();
    cy.get("div[id=timeline]")
      .find(".v-virtual-scroll__item")
      .each(($el, $id) => {
        if ($id === 0) {
          cy.wrap($el).find(".v-list-item__avatar").should("be.visible");
          cy.wrap($el)
            .find(".v-avatar")
            .find(".v-image")
            .should("have.attr", "id")
            .and("include", "timelineUserImage-pauline");
          cy.wrap($el).find(".v-list-item__content").should("be.visible");
          cy.wrap($el)
            .find(".v-list-item__content")
            .find(".v-list-item__title.subheading")
            .should("be.visible")
            .contains("Pauline Ingram");
          cy.wrap($el)
            .find(".v-list-item__action")
            .should("be.visible")
            .find(".v-list-item__action-text")
            .contains("2 months ago");
        } else {
          cy.wrap($el).find(".v-list-item__avatar").should("be.visible");
          cy.wrap($el)
            .find(".v-avatar")
            .find(".v-image")
            .should("have.attr", "id")
            .and("include", "timelineUserImage-pauline");
          cy.wrap($el).find(".v-list-item__content").should("be.visible");
          cy.wrap($el)
            .find(".v-list-item__content")
            .find(".v-list-item__title.subheading")
            .should("be.visible");
          cy.wrap($el)
            .find(".v-list-item__action")
            .find(".v-list-item__action-text")
            .should("be.visible");
        }
      });
  });
});
describe("Unfollow user", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should click on 'unfollow' user button and decrease number of following users", () => {
    cy.get("[id=followingUsers]")
      .find(".v-card__title")
      .find("span")
      .contains("6");
    cy.get("[id=followingUsers]")
      .find(".v-list-item__icon")
      .first()
      .find("button")
      .click();
    cy.get("[id=followingUsers]")
      .find(".v-card__title")
      .find("span")
      .contains("5");
  });
});

describe("Follow user", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should click on 'follow' user button and decrease number of following users", () => {
    cy.get("[id=followingUsers]")
      .find(".v-card__title")
      .find("span")
      .contains("6");
    cy.get("[id=followUsers]")
      .find(".v-list-item__icon")
      .first()
      .find("button")
      .click();
    cy.get("[id=followingUsers]")
      .find(".v-card__title")
      .find("span")
      .contains("7");
  });
});
