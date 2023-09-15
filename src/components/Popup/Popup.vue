<script setup lang="ts">
  /** Popup */

  import { ref, watch, watchEffect, nextTick } from "vue";

  import Toolbar from "@/components/Toolbar";
  import ListView from "@/components/ListView";
  import TextField from "@/components/TextField";

  import Item from "@/components/type/Item";

  interface Props {
    /** placeholder */
    placeholder?: string;
    /** is popup open (true / false) */
    isOpen?: boolean;
    /** options of list */
    options: Item[];
    /** value */
    value: Item[];
  }

  interface Emits {
    (e: "close"): void;
    (e: "search", value: Item[]): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: "",
    isOpen: false,
  });
  const emits = defineEmits<Emits>();

  const textfield = ref<typeof TextField>();
  const searchText = ref("");
  const selectedValue = ref<Item[]>(props.value);
  const filteredOptions = ref<Item[]>(props.options);

  watchEffect(() => {
    if (props.isOpen) {
      nextTick(() => {
        textfield.value!.focus();
      });
    } else {
      searchText.value = "";
    }
  });

  watch(searchText, () => {
    const value = searchText.value;
    filteredOptions.value = props.options.filter((option) => {
      return option.label.includes(value) || option.value.includes(value);
    });
  });

  const onToolbarClose = () => {
    selectedValue.value = props.value;
    emits("close");
  };

  const onSearch = () => {
    emits("search", selectedValue.value);
  };

  const onTextAdd = () => {
    if (!searchText.value) {
      return; // do nothing at empty
    }

    selectedValue.value.push({
      label: searchText.value,
      value: searchText.value,
    });

    searchText.value = "";
  };
</script>

<template>
  <Transition name="slide-fade">
    <div class="popup">
      <Toolbar
        v-model="selectedValue"
        @close="onToolbarClose"
        @search="onSearch"
      />
      <div class="popup-contents">
        <TextField
          ref="textfield"
          v-model="searchText"
          :placeholder="placeholder"
          @add="onTextAdd"
        />
        <div class="list-container">
          <ListView v-model="selectedValue" :items="filteredOptions" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
  @use "@/assets/scss/_variables.scss" as *;

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  .popup {
    .popup-contents {
      box-sizing: border-box;
      padding: 0.5rem;
      height: calc(100% - $toolbar-height);
      .list-container {
        height: calc(100% - $text-field-height);
        overflow: auto;
      }
    }

    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    z-index: 10000;
    overflow: hidden;
  }
</style>
./type/Item
