<script setup lang="ts">
  /** List View */

  import { ref, toRefs, watch } from "vue";

  import CircleCheckbox from "./CircleCheckbox";
  import Item from "./type/Item";

  interface CheckedItem extends Item {
    /** checked (true / false) */
    checked: boolean;
  }

  interface Props {
    /** items */
    items: Item[];
    /** value */
    modelValue: Item[];
  }

  interface Emits {
    (e: "update:modelValue", value: Item[]): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
  });

  const emits = defineEmits<Emits>();

  const { modelValue, items } = toRefs(props);
  const checkedItems = ref<CheckedItem[]>([]);

  const onChange = (value: boolean, index: number) => {
    checkedItems.value[index].checked = value;
    const items = insertOrDeleteItems(value, index);
    emits("update:modelValue", items);
  };

  const onClick = (checked: boolean, index: number) => {
    const value = !checked;
    checkedItems.value[index].checked = value;
    const items = insertOrDeleteItems(value, index);
    emits("update:modelValue", items);
  };

  const insertOrDeleteItems = (value: boolean, index: number) => {
    let items = [...modelValue.value];
    if (value) {
      const { label, value } = checkedItems.value[index];
      items.push({ label, value });
    } else {
      items = items.filter(
        (itemValue) => itemValue.value !== checkedItems.value[index].value,
      );
    }

    return items;
  };

  const updateItems = (newModelValue: Item[], newItems: Item[]) => {
    return newItems.map((item) => {
      const checked = newModelValue.some(
        (modelVal) => modelVal.value === item.value,
      );
      return {
        label: item.label,
        value: item.value,
        checked,
      };
    });
  };

  watch(
    [modelValue, items],
    ([newModelValue, newItems]) => {
      checkedItems.value = updateItems(newModelValue, newItems);
    },
    { immediate: true },
  );
</script>

<template>
  <ul class="list-view">
    <li
      v-for="(item, index) in checkedItems"
      :key="index"
      class="list-item"
      @click="onClick(item.checked, index)"
    >
      <CircleCheckbox
        :label="item.label"
        :checked="item.checked"
        @change="(value) => onChange(value, index)"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .list-view {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    .list-item {
      position: relative;
      display: block;
      padding: 0.5rem 1rem;
      color: #212529;
      text-align: left;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-width: 0 0 1px;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }
  }
</style>
./type/Item
