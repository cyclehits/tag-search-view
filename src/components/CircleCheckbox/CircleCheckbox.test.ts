import { shallowMount } from "@vue/test-utils";
import CircleCheckbox from ".";

describe("CircleCheckbox", () => {

    test("support default props", () => {
        const wrapper = shallowMount(CircleCheckbox, {
            props: {
                label: "",
            }
        });

        expect(wrapper.props().checked).toBeFalsy();
    });

    test("render label", () => {
        const label = "test";

        const wrapper = shallowMount(CircleCheckbox, {
            props: {
                label,
            },
        });

        // include icon name (see below case), so use <include> not <toBe>.
        expect(wrapper.text()).include(label);
    });

    test.each([false, true])("icon name", (checked) => {
        const wrapper = shallowMount(CircleCheckbox, {
            props: {
                label: "",
                checked,
            },
        });

        const span = wrapper.find("span");

        const iconName = checked ? "icon-check_circle" : "icon-circle";

        expect(span.classes()).include(iconName);
    });

    test.each([false, true])("emit change", async (checked) => {
        const wrapper = shallowMount(CircleCheckbox, {
            props: {
                label: "",
                checked,
            },
        });

        await wrapper.find("span").trigger("click");

        // check if not checked, clear if checked
        expect(wrapper.emitted().change[0]).toStrictEqual([!checked]);
    });

});
