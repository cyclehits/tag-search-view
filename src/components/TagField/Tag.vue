<script setup lang="ts">
  /** Tag */

  interface Props {
    /** label of tag */
    label: string;
    /** be able to delete (true / false) */
    deletable?: boolean;
  }

  interface Emits {
    (e: "delete"): void;
  }

  withDefaults(defineProps<Props>(), {
    deletable: true,
  });

  const emits = defineEmits<Emits>();
</script>

<template>
  <span class="tag">
    <span class="tag-label">{{ label }}</span>
    <span
      v-if="deletable"
      class="material-symbols-outlined icon__close"
      @click="emits('delete')"
    >
      close
    </span>
  </span>
</template>

<style scoped lang="scss">
  .tag {
    display: inline-flex;
    align-items: center;
    background-color: #dee2e6;
    padding: 0.15rem 0.5rem;
    border-radius: 0.25rem;
    margin-right: 0.25rem;
    word-break: keep-all;
    .tag-label {
      padding-bottom: 0.25rem;
    }
    .icon__close {
      padding-left: 0.25rem;
      font-size: 18px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
