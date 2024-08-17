import ErrorView from "@/views/ErrorView.vue";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";


describe("Error page", () => {
  it("Should return error page", () => {
    const data = mount(ErrorView);

    expect(data.html()).toMatchSnapshot()
  });
});
