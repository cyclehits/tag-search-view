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

  const state = computed(() => {
    if (props.checked) {
      return {
        style: "check-circle__checked",
        icon: "check_circle",
      };
    } else {
      return {
        style: "check-circle__empty",
        icon: "circle",
      };
    }
  });

  const onClick = (shouldCheck: boolean) => {
    emits("change", shouldCheck);
  };
</script>

<template>
  <label class="circle-checkbox">
    <span
      class="material-symbols-outlined check-circle"
      :class="state.style"
      @click="onClick(!props.checked)"
    >
      {{ state.icon }}
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
      cursor: pointer;
      &.check-circle__empty {
        &.material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 200,
            "GRAD" 0,
            "opsz" 48;
        }
      }
      &.check-circle__checked {
        color: #0d6efd;
        &.material-symbols-outlined {
          font-variation-settings:
            "FILL" 1,
            "wght" 200,
            "GRAD" 0,
            "opsz" 48;
        }
      }
    }
  }
</style>
