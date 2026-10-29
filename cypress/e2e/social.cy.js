describe("Follow and unfollow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const followingCount = () => cy.getByTest("following-count");

  it("shows the initial following count from the demo data", () => {
    followingCount().should("contain", "6");
    cy.getByTest("following-users")
      .find('[data-test="user-list-item"]')
      .should("have.length", 6);
  });

  it("unfollows a user", () => {
    cy.getByTest("following-users")
      .find('[data-test="unfollow-button"]')
      .first()
      .click();
    followingCount().should("contain", "5");
    cy.getByTest("suggested-users")
      .find('[data-test="user-list-item"]')
      .should("have.length", 7);
  });

  it("follows a user and remembers it after reloading", () => {
    cy.getByTest("suggested-users")
      .find('[data-test="follow-button"]')
      .first()
      .click();
    followingCount().should("contain", "7");

    cy.reload();
    followingCount().should("contain", "7");
  });
});

describe("User profile", () => {
  it("opens a followed user's profile and shows only their posts", () => {
    cy.visit("/");
    cy.getByTest("following-users").find('[data-test="user-link"]').first().as("firstUser");

    cy.get("@firstUser")
      .invoke("text")
      .then((name) => {
        cy.get("@firstUser").click();
        cy.location("pathname").should("match", /^\/user\//);
        cy.getByTest("post-author").each(($author) => {
          expect($author.text().trim()).to.eq(name.trim());
        });
      });
  });

  it("works when opening a profile URL directly (Netlify SPA redirect)", () => {
    cy.visit("/user/pauline");
    cy.getByTest("profile-header").should("contain", "Pauline Ingram");
  });

  it("shows a friendly message for unknown users", () => {
    cy.visit("/user/ghost");
    cy.getByTest("user-not-found").should("contain", "@ghost doesn't exist");
  });

  it("shows a not found page for unknown routes", () => {
    cy.visit("/this/does/not/exist");
    cy.getByTest("not-found").should("be.visible");
  });
});

describe("Mobile layout", () => {
  it("shows the timeline before the social area", () => {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.getByTest("post-composer").then(($composer) => {
      cy.getByTest("following-users").then(($following) => {
        expect($composer[0].getBoundingClientRect().top).to.be.lessThan(
          $following[0].getBoundingClientRect().top,
        );
      });
    });
  });
});
