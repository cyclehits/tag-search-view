# Tag-Search-View

Vue Component to filter tags for Smartphones.

## Demo
https://github.com/cyclehits/tag-search-view/assets/47079859/041b044c-4c15-401e-947f-bf205732b1dd

## Installation

```bash
npm install --save tag-search-view
```

## Usage

Use in Vue Single-File Components.

```ts
<script>
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
   <TagSearchView :options="options" v-model="value" />
</templates>
```

## Setup

### Props

| Name                 | Type   | Default | Description                |
| -------------------- | ------ | ------- | -------------------------- |
| v-model (_required_) | Item[] | -       | two-way binding value.     |
| options              | Item[] | -       | choices in this component. |

### Interface

#### Item

| property | Type   |
| -------- | ------ |
| label    | string |
| value    | string |

## Development

### Launch Lint

```bash
npm run lint
```

### Launch Unit Test

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
