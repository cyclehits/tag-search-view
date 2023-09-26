import { shallowMount } from "@vue/test-utils";
import Popup from ".";

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

});
