<script setup>
import { ref } from "vue";

import { TagSearchView } from "@/components";

  // test data
  import fruits from "./data/fruits.json";

  const value = ref([
    {
      label: "apple",
      value: "1",
    },
  ]);

  const options = ref(fruits);
</script>

<template>
  <h1>Tag Search View</h1>
  <TagSearchView>
    <span>hoge</span>
  </TagSearchView>
  <div class="message">
    <span>値</span>
    <div v-for="v in value" :key="v.value">
      <span>label&nbsp;:&nbsp;{{ v.label }}</span>
      &nbsp;
      <span>value&nbsp;:&nbsp;{{ v.value }}</span>
    </div>
  </div>
</template>

<style scoped>
  .message {
    margin: 3rem 0;
  }
</style>
