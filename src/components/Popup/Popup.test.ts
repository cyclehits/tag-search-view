import { shallowMount, mount } from "@vue/test-utils";
import Popup from ".";
import Toolbar from "@/components/Toolbar";
import TextField from "@/components/TextField";
import ListView from "@/components/ListView";

describe("Popup", () => {

    test("support default props", () => {
        const wrapper = shallowMount(Popup, {
            props: {
                options: [],
                value: [],
            },
        });

        expect(wrapper.props().placeholder).toBe("");
        expect(wrapper.props().isOpen).toBeFalsy();
    });

    test("emit close", () => {
        const wrapper = shallowMount(Popup, {
            props: {
                options: [],
                value: [],
            },
        });

        wrapper.findComponent(Toolbar).vm.$emit("close");

        expect(wrapper.emitted().close[0]).toStrictEqual([]);
    });

    test("emit search", () => {
        const value = [
            { label: "1", value: "1" },
        ];
        const wrapper = shallowMount(Popup, {
            props: {
                options: [],
                value,
            },
        });

        wrapper.findComponent(Toolbar).vm.$emit("search", value);

        expect(wrapper.emitted().search[0]).toStrictEqual([value]);
    });

    test("add tag when add event has emitted", () => {
        const wrapper = shallowMount(Popup, {
            props: {
                options: [],
                value: [],
            },
        });

        const text = "test";
        const textField = wrapper.findComponent(TextField);
        textField.setValue(text);
        textField.vm.$emit("add");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const vm = wrapper.vm as any;
        expect(vm.selectedValue).toStrictEqual([{ label: text, value: text }]);
        expect(vm.searchText).toBe(""); // clear text after added
    });

    test("clear text when Popup has closed", async () => {
        const wrapper = mount(Popup, {
            props: {
                options: [],
                value: [],
                isOpen: true,
            },
        });

        wrapper.findComponent(TextField).setValue("test");
        await wrapper.setProps({ isOpen: false });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((wrapper.vm as any).searchText).toBe("");
    });

    test.each(["l2", "v2"])("filter options when text has entered", async (text) => {
        const options = [
            { label: "l1", value: "v1" },
            { label: "l2", value: "v2" },
        ];
        const wrapper = shallowMount(Popup, {
            props: {
                options,
                value: [],
            },
        });

        expect(wrapper.findComponent(ListView).props().items).toStrictEqual(options);

        await wrapper.findComponent(TextField).setValue(text); // filtering

        expect(wrapper.findComponent(ListView).props().items).toStrictEqual([options[1]]);
    });

});
