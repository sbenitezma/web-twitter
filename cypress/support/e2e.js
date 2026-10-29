// Adds cy.injectAxe() and cy.checkA11y() for accessibility checks
import "cypress-axe";

// Selects elements by our `data-test` attribute convention
Cypress.Commands.add("getByTest", (name, options) =>
  cy.get(`[data-test="${name}"]`, options),
);

beforeEach(() => {
  // Start every test with the original demo data
  cy.clearLocalStorage();
});
