import { shallowMount } from "@vue/test-utils";
import ListView from ".";
import CircleCheckbox from "@/components/CircleCheckbox";

describe("ListView", () => {

    const TEST_VALUES = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
    ];

    test("render list items", () => {
        const wrapper = shallowMount(ListView, {
            props: {
                items: TEST_VALUES,
                modelValue: [TEST_VALUES[0]],
            },
        });

        expect(wrapper.findAll("li").length).toBe(TEST_VALUES.length);
        expect(wrapper.findAllComponents(CircleCheckbox)[0].props().checked).toBeTruthy();
        expect(wrapper.findAllComponents(CircleCheckbox)[1].props().checked).toBeFalsy();
    });

    test.each([false, true])("update modelValue when list item has clicked", async (checked) => {
        const wrapper = shallowMount(ListView, {
            props: {
                items: [TEST_VALUES[0]],
                modelValue: checked ? [TEST_VALUES[0]] : [],
            },
        });

        await wrapper.find("li").trigger("click");

        const expected = checked ? [] : [TEST_VALUES[0]];
        expect(wrapper.emitted()["update:modelValue"][0]).toStrictEqual([expected]);
    });

    test.each([false, true])("update modelValue when CircleCheckbox has changed", (checked) => {
        const wrapper = shallowMount(ListView, {
            props: {
                items: [TEST_VALUES[0]],
                modelValue: checked ? [TEST_VALUES[0]] : [],
            },
        });

        wrapper.findComponent(CircleCheckbox).vm.$emit("change", !checked);

        const expected = checked ? [] : [TEST_VALUES[0]];
        expect(wrapper.emitted()["update:modelValue"][0]).toStrictEqual([expected]);
    });

});
