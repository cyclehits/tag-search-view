import { shallowMount } from "@vue/test-utils";
import CircleCheckbox from ".";

describe("CircleCheckbox", () => {

    test("support default props", () => {
        const wrapper = shallowMount(CircleCheckbox, {
            props: {
                label: "", // label is required props
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

    test.each([false, true])("style & icon by check state", (checked) => {
        const wrapper = shallowMount(CircleCheckbox, {
            props: {
                label: "",
                checked,
            },
        });

        const span = wrapper.find("span");

        const style = checked ? "check-circle__checked" : "check-circle__empty";
        const icon = checked ? "check_circle" : "circle";

        expect(span.classes()).include(style);
        expect(span.text()).toBe(icon);
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
        expect(wrapper.emitted()["change"][0]).toStrictEqual([!checked]);
    });

});
