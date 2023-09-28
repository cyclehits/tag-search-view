import { shallowMount } from "@vue/test-utils";
import TagField from ".";
import Tag from "./Tag.vue";

describe("TagField", () => {

    test("support default props", () => {
        const wrapper = shallowMount(TagField);

        expect(wrapper.props().insidePopup).toBeFalsy();
        expect(wrapper.props().placeholder).toBe("");
        expect(wrapper.props().tags).toStrictEqual([]);

        // render dummy element by default
        expect(wrapper.find("p").exists()).toBeTruthy();
    });

    test("render tags", () => {
        const tags = [
            { label: "1", value: "1" },
            { label: "2", value: "2" },
        ];
        const wrapper = shallowMount(TagField, {
            props: {
                tags,
                insidePopup: true,
            },
        });

        const components = wrapper.findAllComponents(Tag);
        expect(components.length).toBe(tags.length);

        // don't render dummy element
        expect(wrapper.find("p").exists()).toBeFalsy();
    });

    test.each([true, false])("render by props (insidePopup)", (insidePopup) => {
        const wrapper = shallowMount(TagField, {
            props: {
                tags: [{ label: "1", value: "1" }],
                insidePopup,
            },
        });

        expect(wrapper.findComponent(Tag).props().deletable).toBe(insidePopup);

        expect(wrapper.find("input").exists()).toBe(!insidePopup);
    });

    test("emit delete", () => {
        const tags = [
            { label: "1", value: "1" },
        ];
        const wrapper = shallowMount(TagField, {
            props: {
                tags,
                insidePopup: true,
            },
        });

        wrapper.findComponent(Tag).trigger("delete");

        expect(wrapper.emitted().delete[0]).toStrictEqual(tags);
    });

    test("emit focus", async () => {
        const wrapper = shallowMount(TagField);

        await wrapper.find("input").trigger("focus");

        expect(wrapper.emitted().focus[0]).toStrictEqual([]);
    });

});
