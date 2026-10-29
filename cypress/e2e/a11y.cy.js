// Runs axe-core on every page against WCAG 2.1 AA
const pages = [
  { name: "home timeline", path: "/", ready: "timeline" },
  { name: "user profile", path: "/user/pauline", ready: "timeline" },
  { name: "unknown user", path: "/user/ghost", ready: "user-not-found" },
  { name: "page not found", path: "/does-not-exist", ready: "not-found" },
];

describe("Accessibility", () => {
  pages.forEach(({ name, path, ready }) => {
    it(`has no detectable violations on the ${name}`, () => {
      cy.visit(path);
      cy.getByTest(ready).should("be.visible");
      cy.injectAxe();
      cy.checkA11y(
        null,
        { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] },
        (violations) =>
          cy.task(
            "log",
            violations
              .map((v) => `${v.id}: ${v.help} (${v.nodes[0].target})`)
              .join("\n"),
          ),
      );
    });
  });
});
