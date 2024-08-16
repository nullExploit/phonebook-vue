import { describe, it, expect, vi, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import PhoneBookButton from "../phonebooks/PhoneBookButton.vue";
import PhoneBookItem from "../phonebooks/PhoneBookItem.vue";
import PhoneBookDetail from "../phonebooks/PhoneBookDetail.vue";
import PhoneBookSearch from "../phonebooks/PhoneBookSearch.vue";
import PhoneBookAdd from "../phonebooks/PhoneBookAdd.vue";
import PhoneBookBox from "../phonebooks/PhoneBookBox.vue";

describe("PhoneBooks", () => {
  beforeAll(() => {
    createTestingPinia({
      createSpy: vi.fn,
    });
  });

  it("Should render phonebook button correctly", async () => {
    const data = mount(PhoneBookButton, {
      props: {
        id: "123",
        name: "TESTING",
        phone: "081111111",
        remove: false,
        edit: false,
      },
    });

    expect(data.html()).toMatchSnapshot();
    expect(data.props().id).toBe("123");
    expect(data.props().name).toBe("TESTING");
    expect(data.props().phone).toBe("081111111");
    expect(data.props().remove).toBe(false);
    expect(data.props().edit).toBe(false);
    expect(
      data
        .findAll(".buttons")[0]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("pen-to-square");
    expect(
      data
        .findAll(".buttons")[1]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("trash-can");
    await data.setProps({ edit: true });
    expect(
      data.get(".buttons").element.firstElementChild.getAttribute("data-icon")
    ).toBe("floppy-disk");
    await data.setProps({ edit: false, remove: true });
    expect(
      data
        .findAll(".buttons")[0]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("check");
    expect(
      data
        .findAll(".buttons")[1]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("xmark");
    await data.setProps({
      id: "1",
      name: "TESTING DONE",
      phone: "081123",
      remove: false,
    });
    expect(data.props().id).toBe("1");
    expect(data.props().name).toBe("TESTING DONE");
    expect(data.props().phone).toBe("081123");
    expect(data.props().remove).toBe(false);
    expect(data.props().edit).toBe(false);
  });

  it("Should render phonebook detail correctly", () => {
    const data = mount(PhoneBookDetail, {
      props: {
        id: "123",
        name: "TESTING",
        phone: "08123123",
      },
    });

    expect(data.html()).toMatchSnapshot();
    expect(data.props().id).toBe("123");
    expect(data.props().name).toBe("TESTING");
    expect(data.props().phone).toBe("08123123");
  });

  it("Should render phonebook item correctly", async () => {
    const data = mount(PhoneBookItem, {
      props: {
        id: "123",
        name: "TESTING",
        phone: "08111111",
      },
    });

    expect(data.html()).toMatchSnapshot();
    expect(data.props().id).toBe("123");
    expect(data.props().name).toBe("TESTING");
    expect(data.props().phone).toBe("08111111");
    await data.findAll(".buttons")[0].trigger("click");
    expect(
      data
        .findAll(".buttons")[0]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("floppy-disk");
    expect(data.findAll(".edits")[0].element.value).toBe("TESTING");
    expect(data.findAll(".edits")[1].element.value).toBe("08111111");
    expect(data.findAll(".edits")[0].element.tagName).toBe("INPUT");
    expect(data.findAll(".edits")[1].element.tagName).toBe("INPUT");
    await data.findAll(".buttons")[0].trigger("click");
    expect(
      data
        .findAll(".buttons")[0]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("pen-to-square");
    expect(
      data
        .findAll(".buttons")[1]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("trash-can");
    await data.findAll(".buttons")[1].trigger("click");
    expect(
      data
        .findAll(".buttons")[0]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("check");
    expect(
      data
        .findAll(".buttons")[1]
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("xmark");
    await data.findAll(".buttons")[1].trigger("click");
  });

  it("Should render phonebook search correctly", async () => {
    const data = mount(PhoneBookSearch, {
      props: {
        sort: false,
        limit: 0,
      },
    });

    expect(data.html()).toMatchSnapshot();
    expect(data.props().sort).toBe(false);
    expect(data.props().limit).toBe(0);
    expect(
      data
        .get(".sorting-button")
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("arrow-up-z-a");
    expect(
      data
        .get("input")
        .element.nextElementSibling.firstElementChild.getAttribute("data-icon")
    ).toBe("magnifying-glass");
    expect(
      data
        .get(".add-button")
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("user-plus");
    await data.get("input").setValue("TESTING");
    expect(data.get("input").element.value).toBe("TESTING");
  });

  it("Should render phonebook add correctly", async () => {
    const data = mount(PhoneBookAdd);

    expect(data.html()).toMatchSnapshot();
    await data.findAll("input")[0].setValue("TESTING ADD");
    await data.findAll("input")[1].setValue("08123123123");
    expect(data.findAll("input")[0].element.value).toBe("TESTING ADD");
    expect(data.findAll("input")[1].element.value).toBe("08123123123");
  });

  it("Should render phonebook box correctly", async () => {
    const data = mount(PhoneBookBox);

    expect(data.html()).toMatchSnapshot();
    expect(
      data
        .get(".sorting-button")
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("arrow-up-z-a");
    await data.get(".sorting-button").trigger("click");
    expect(
      data
        .get(".sorting-button")
        .element.firstElementChild.getAttribute("data-icon")
    ).toBe("arrow-down-a-z");
    await data.get(".sorting-button").trigger("click");
    await data.get(".search-bar").setValue("TESTING");
    expect(data.get(".search-bar").element.value).toBe("TESTING");
  });
});
