<script setup lang="ts">
  /** Circular Checkbox */

  import { computed } from "vue";

  interface Props {
    /** label of checkbox */
    label: string;
    /** checked (true / false) */
    checked?: boolean;
  }

  interface Emits {
    (e: "change", value: boolean): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    label: "",
    checked: false,
  });

  const emits = defineEmits<Emits>();

  const iconName = computed(() => {
    return props.checked ? "icon-check_circle" : "icon-circle";
  });

  const onClick = (shouldCheck: boolean) => {
    emits("change", shouldCheck);
  };
</script>

<template>
  <label class="circle-checkbox">
    <span
      class="check-circle"
      :class="iconName"
      @click.stop="onClick(!props.checked)"
    >
    </span>
    {{ label }}
  </label>
</template>

<style scoped lang="scss">
  .circle-checkbox {
    display: flex;
    align-items: center;
    .check-circle {
      margin-right: 0.5rem;
      &.icon-check_circle {
        color: #0d6efd;
      }
    }
  }
</style>
