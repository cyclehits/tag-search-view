<script setup lang="ts">
  /** Toolbar */

  import TagField from "@/components/TagField";
  import Item from "@/components/type/Item";

  interface Props {
    /** placeholder */
    placeholder?: string;
    /** tag infos */
    tags?: Item[];
    /** value */
    modelValue: Item[];
  }

  interface Emits {
    (e: "update:modelValue", value: Item[]): void;
    (e: "search"): void;
    (e: "close"): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: "",
    tags: () => [],
  });

  const emits = defineEmits<Emits>();

  const onTagDelete = (tag: Item) => {
    const value = props.modelValue.filter(
      (selectedTag) => selectedTag.value !== tag.value,
    );
    emits("update:modelValue", value);
  };
</script>

<template>
  <nav class="toolbar-container">
    <div class="toolbar">
      <span
        class="material-symbols-outlined icon__close"
        @click="emits('close')"
      >
        close
      </span>
      <TagField
        class="tag-field__in-toolbar"
        inside-popup
        :placeholder="placeholder"
        :tags="modelValue"
        @delete="onTagDelete"
      />
      <button class="button__search" @click="emits('search')">
        <span class="material-symbols-outlined">search</span>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  @use "@/assets/scss/_variables.scss" as *;

  .toolbar-container {
    box-sizing: border-box;
    height: $toolbar-height;
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.25rem;
    background-color: #e9ecef;
    .toolbar {
      box-sizing: border-box;
      display: flex;
      flex-wrap: inherit;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      .tag-field__in-toolbar {
        box-sizing: border-box;
        width: calc(100% - 4.5rem);
      }
    }
    .icon__close {
      box-sizing: border-box;
      width: 2rem;
      padding-right: 0.75rem;
      color: #213547; // cancel dark mode
    }
    .button__search {
      box-sizing: border-box;
      width: 2.5rem;
      padding: 0.525rem;
      border: 1px solid #0d6efd;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      color: #fff;
      background-color: #0d6efd;
      outline: none;
    }
  }
</style>
