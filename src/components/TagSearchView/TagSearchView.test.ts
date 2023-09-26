import { shallowMount } from "@vue/test-utils";
import TagSearchView from ".";
import TagField from "@/components/TagField";
import Popup from "../Popup";

describe("TagSearchView", () => {

    test("support default props", () => {
        const wrapper = shallowMount(TagSearchView, {
            props: {
                options: [],
                modelValue: [],
            }
        });

        expect(wrapper.props().placeholder).toBe("");
    });

    test("open Popup when TagField has clicked", async () => {
        const wrapper = shallowMount(TagSearchView, {
            props: {
                options: [],
                modelValue: [],
            }
        });

        await wrapper.findComponent(TagField).trigger("click");

        expect(wrapper.findComponent(Popup).isVisible()).toBeTruthy();
    });

    test("close Popup when Popup has emitted close", async () => {
        const wrapper = shallowMount(TagSearchView, {
            props: {
                options: [],
                modelValue: [],
            }
        });

        await wrapper.findComponent(TagField).trigger("click");
        await wrapper.findComponent(Popup).vm.$emit("close");

        expect(wrapper.findComponent(Popup).attributes("style")).toStrictEqual("display: none;");
    });

    test("update modelValue when Popup emitted search", async () => {
        const wrapper = shallowMount(TagSearchView, {
            props: {
                options: [],
                modelValue: [],
            }
        });

        const value = [
            { label: "1", value: "1" },
        ];
        await wrapper.findComponent(Popup).vm.$emit("search", value);

        expect(wrapper.emitted()["update:modelValue"][0]).toStrictEqual([value]);
    });

});
