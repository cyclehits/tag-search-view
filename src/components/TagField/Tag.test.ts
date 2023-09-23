import { shallowMount } from "@vue/test-utils";
import Tag from "./Tag.vue";

describe("Tag", () => {

    const CLOSE_ICON_SELECTOR = ".icon-close";

    test("support default props", () => {
        const wrapper = shallowMount(Tag, {
            props: {
                label: "",
            },
        });

        expect(wrapper.props().deletable).toBeTruthy();
    });

    test.each([true, false])("show/hide close icon", (deletable) => {
        const wrapper = shallowMount(Tag, {
            props: {
                label: "",
                deletable,
            },
        });

        expect(wrapper.find(CLOSE_ICON_SELECTOR).exists()).toBe(deletable);
    });

    test("render label", () => {
        const wrapper = shallowMount(Tag, {
            props: {
                label: "test",
                deletable: false,
            },
        });

        expect(wrapper.text()).toBe("test");
    });

    test("emit delete", async () => {
        const wrapper = shallowMount(Tag, {
            props: {
                label: "",
            },
        });

        await wrapper.find(CLOSE_ICON_SELECTOR).trigger("click");

        expect(wrapper.emitted().delete[0]).toStrictEqual([]); // no args
    });

});
