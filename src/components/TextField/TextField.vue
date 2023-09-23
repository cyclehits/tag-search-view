<script setup lang="ts">
  /** Text Field */

  import { ref } from "vue";

  interface Props {
    /** placeholder */
    placeholder?: string;
    /** value */
    modelValue?: string;
  }

  interface Emits {
    (e: "add"): void;
    (e: "focus"): void;
    (e: "update:modelValue", value: string): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: "",
    modelValue: "",
  });

  const emit = defineEmits<Emits>();

  const input = ref<HTMLInputElement>();

  const focus = () => {
    input.value!.focus();
  };

  defineExpose({
    focus, // public method
  });

  const onInput = (ev: Event) => {
    emit("update:modelValue", (ev.target as HTMLInputElement).value);
  };
</script>

<template>
  <div class="text-field-container">
    <input
      ref="input"
      type="text"
      class="text-field text-field__with-button"
      :value="props.modelValue"
      :placeholder="placeholder"
      @focus="emit('focus')"
      @input="onInput"
    />
    <button class="text-field-button" @click="emit('add')">
      <span class="icon-add"></span>
    </button>
  </div>
</template>

<style scoped lang="scss">
  @use "@/assets/scss/_variables.scss" as *;

  .text-field-container {
    display: flex;
    box-sizing: border-box;
    height: $text-field-height;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow-x: auto;
    padding: 0.25rem 0;
  }
  .text-field {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 0.25rem;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;

    &:focus {
      color: #212529;
      background-color: #fff;
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.05rem rgba(13, 110, 253, 0.25);
    }

    &.text-field__with-button {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .text-field-button {
    padding: 0.5rem;
    color: #213547; // cancel dark mode
    background-color: #f9f9f9; // cancel dark mode
    border: 1px solid #ced4da;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    outline: none;
  }
</style>
