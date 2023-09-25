import { shallowMount } from "@vue/test-utils";
import TextField from ".";

describe("TextField", () => {

    test("support default props", () => {
        const wrapper = shallowMount(TextField);

        expect(wrapper.props().placeholder).toBe("");
        expect(wrapper.props().modelValue).toBe("");
    });

    test("render add icon", () => {
        const wrapper = shallowMount(TextField);
        const span = wrapper.find("span");

        expect(span.classes()).include("icon-add");
    });

    test("set placeholder", () => {
        const wrapper = shallowMount(TextField, {
            props: {
                placeholder: "placeholder",
            },
        });

        expect(wrapper.find("input").attributes().placeholder).toBe("placeholder");
    });

    test("emit focus", async () => {
        const wrapper = shallowMount(TextField);

        await wrapper.find("input").trigger("focus");

        expect(wrapper.emitted().focus[0]).toStrictEqual([]);
    });

    test("emit add", async () => {
        const wrapper = shallowMount(TextField);

        await wrapper.find("button").trigger("click");

        expect(wrapper.emitted().add[0]).toStrictEqual([]);
    });

    test("modelValue to be updated", async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const wrapper = shallowMount(TextField, {
            props: {
                modelValue: "",
                "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
            }
        });

        await wrapper.find("input").setValue("test");

        expect(wrapper.props().modelValue).toBe("test");
    });

});
