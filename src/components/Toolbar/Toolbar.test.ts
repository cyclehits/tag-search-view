import { shallowMount } from "@vue/test-utils";
import Toolbar from ".";
import TagField from "@/components/TagField";

describe("Toolbar", () => {

    test("support default props", () => {
        const wrapper = shallowMount(Toolbar, {
            props: {
                modelValue: [],
            },
        });

        expect(wrapper.props().placeholder).toBe("");
        expect(wrapper.props().tags).toStrictEqual([]);
    });

    test("render TagField", () => {
        const wrapper = shallowMount(Toolbar, {
            props: {
                modelValue: [],
            },
        });

        const tagField = wrapper.findComponent(TagField);

        expect(tagField.classes()).include("tag-field__in-toolbar");
        expect(tagField.props().insidePopup).toBeTruthy();
    });

    test("emit close", async () => {
        const wrapper = shallowMount(Toolbar, {
            props: {
                modelValue: [],
            },
        });

        await wrapper.find(".icon-close").trigger("click");

        expect(wrapper.emitted().close[0]).toStrictEqual([]);
    });

    test("emit search", async () => {
        const wrapper = shallowMount(Toolbar, {
            props: {
                modelValue: [],
            },
        });

        await wrapper.find(".icon-search").trigger("click");

        expect(wrapper.emitted().search[0]).toStrictEqual([]);
    });

    test("update modelValue when tag has deleted", async () => {
        const value = { label: "1", value: "1" };
        const wrapper = shallowMount(Toolbar, {
            props: {
                modelValue: [value],
            },
        });

        await wrapper.findComponent(TagField).vm.$emit("delete", value);

        expect(wrapper.emitted()["update:modelValue"][0]).toStrictEqual([[]]);
    });

});
