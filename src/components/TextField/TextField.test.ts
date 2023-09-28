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

    test("update modelValue when text has entered", () => {
        const wrapper = shallowMount(TextField, {
            props: {
                modelValue: "",
            }
        });

        const value = "test";
        wrapper.find("input").setValue(value);

        expect(wrapper.emitted()["update:modelValue"][0]).toStrictEqual([value]);
    });

});
