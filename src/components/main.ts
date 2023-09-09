import type { App } from "vue";
import { TagSearchView } from "@/components";

export default {
  install: (app: App) => {
    app.component("TagSearchView", TagSearchView);
  },
};

export { TagSearchView };
