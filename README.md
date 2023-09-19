# Tag-Search-View

Vue Component to filter tags for Smartphones.

## Demo

![](./demo/demo.gif)

## Installation

```bash
npm install --save tag-search-view
```

## Usage

Use in Vue Single-File Components.

```ts
<script setup lang="ts">
   import { ref } from "vue";

   import { TagSearchView } from "tag-search-view";
   import "tag-search-view/dist/tag-search-view.css";

   const value = ref([
      {
         label: "apple",
         value: "1"
      }
   ]);

   const options = ref([
      {
         label: "apple",
         value: "1"
      },
      {
         label: "apricot",
         value: "2"
      },
      {
         label: "avocado",
         value: "3"
      }
   ]);
</script>

<temlpates>
   <TagSearchView :options="options" v-model="value" placeholder="Search..." />
</templates>
```

### Props

| Name                 | Type   | Default | Description                |
| -------------------- | ------ | ------- | -------------------------- |
| v-model (_required_) | Item[] | -       | two-way binding value.     |
| options              | Item[] | -       | choices in this component. |
| placeholder          | string |         | placeholder of text field. |

### Interface

#### Item

| Property | Type   |
| -------- | ------ |
| label    | string |
| value    | string |

### Dependencies

| Module           | Version |
| ---------------- | ------- |
| vue              | 3.3.4   |
| material-symbols | 0.11.0  |

## Setup

## Development

### Lint

```bash
npm run lint
```

### Unit Test

```bash
npm run test
npm run test:watch
```

### Launch Demo

```bash
npm run dev
```

### Buld

Bundle the js and css to the `dist` directory.

```bash
npm run build
```

## License

[The MIT License](http://opensource.org/licenses/MIT)
