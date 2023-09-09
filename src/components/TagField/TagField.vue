<script setup lang="ts">
  /** Tag Field */

  import Tag from "./Tag.vue";
  import Item from "@/components/type/Item";

  interface Props {
    /** inside popup (true / false) */
    insidePopup?: boolean;
    /** placeholder */
    placeholder?: string;
    /** tag infos */
    tags?: Item[];
  }

  interface Emits {
    (e: "delete", tag: Item): void;
    (e: "focus"): void;
  }

  withDefaults(defineProps<Props>(), {
    insidePopup: false,
    placeholder: "",
    tags: () => [],
  });

  const emits = defineEmits<Emits>();

  const onTagDelete = (tag: Item) => {
    emits("delete", tag);
  };
</script>

<template>
  <div class="tag-field">
    <!-- dummy element -->
    <p v-if="tags.length === 0" />

    <Tag
      v-for="(tag, index) in tags"
      :key="index"
      :label="tag.label"
      :deletable="insidePopup"
      @delete="onTagDelete(tag)"
    />
    <input
      v-if="!insidePopup"
      type="text"
      class="tag-field-text"
      :placeholder="placeholder"
      @focus="emits('focus')"
    />
  </div>
</template>

<style scoped lang="scss">
  .tag-field {
    overflow-x: auto;
    flex-grow: 4;
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    border: 1px solid #ced4da;
    appearance: none;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    .tag-field-text {
      font-size: 1rem;
      padding: 0.25rem;
      margin-left: 0.5rem;
      border: none;
      outline: none;
      background-color: #fff; // cancel dark mode
    }
  }
</style>
