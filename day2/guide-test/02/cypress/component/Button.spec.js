import Button from "../../src/components/Button.vue";

import { mount } from "@cypress/vue";

describe("Button", () => {
    it("should contains Button", () => {
        mount(Button);

        cy.contains("Button");
    });
});
