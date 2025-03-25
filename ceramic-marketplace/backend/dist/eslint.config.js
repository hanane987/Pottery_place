import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
export default defineConfig([{
  files: ["**/*.{js,mjs,cjs,jsx}"],
  languageOptions: {
    globals: {
      ...globals.browser,
      require: true,
      module: true,
      process: true,
      exports: true,
      jest: true,
      describe: true,
      it: true,
      expect: true,
      beforeEach: true,
      afterEach: true
    }
  }
}, {
  files: ["**/*.{js,mjs,cjs,jsx}"],
  plugins: {
    js
  },
  extends: ["js/recommended"]
}, pluginReact.configs.flat.recommended, {
  settings: {
    react: {
      version: "detect"
    }
  }
}]);