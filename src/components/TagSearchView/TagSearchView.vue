<script setup lang="ts">
  /** Tag Search View */

  import "material-symbols";

  import { ref } from "vue";

  import TagField from "@/components/TagField";
  import Popup from "@/components/Popup";
  import Item from "@/components/type/Item";

  interface Props {
    /** options of list */
    options: Item[];
    /** value */
    modelValue: Item[];
  }

  interface Emits {
    (e: "update:modelValue", value: Item[]): void;
  }

  withDefaults(defineProps<Props>(), {
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
      placeholder="検索"
      :tags="modelValue"
      should-input
      @click="onTagFieldClick"
    />
    <Popup
      v-show="isPopupOpen"
      :is-open="isPopupOpen"
      :options="options"
      :value="modelValue"
      @search="onSearch"
      @close="onPopupClose"
    />
  </div>
</template>
./type/Item
