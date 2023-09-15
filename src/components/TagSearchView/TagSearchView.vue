<script setup lang="ts">
  /** Tag Search View */

  import "material-symbols/outlined.scss";

  import { ref } from "vue";

  import TagField from "@/components/TagField";
  import Popup from "@/components/Popup";
  import Item from "@/components/type/Item";

  interface Props {
    /** placeholder */
    placeholder?: string;
    /** options of list */
    options: Item[];
    /** value */
    modelValue: Item[];
  }

  interface Emits {
    (e: "update:modelValue", value: Item[]): void;
  }

  withDefaults(defineProps<Props>(), {
    placeholder: "",
    modelValue: () => [],
  });

  const emits = defineEmits<Emits>();

  const isPopupOpen = ref(false);

  const onTagFieldClick = () => {
    isPopupOpen.value = true;
  };

  const onPopupClose = () => {
    isPopupOpen.value = false;
  };

  const onSearch = (value: Item[]) => {
    emits("update:modelValue", value);
    isPopupOpen.value = false;
  };
</script>

<template>
  <div>
    <TagField
      :placeholder="placeholder"
      :tags="modelValue"
      should-input
      @click="onTagFieldClick"
    />
    <Popup
      v-show="isPopupOpen"
      :placeholder="placeholder"
      :is-open="isPopupOpen"
      :options="options"
      :value="modelValue"
      @search="onSearch"
      @close="onPopupClose"
    />
  </div>
</template>
./type/Item
