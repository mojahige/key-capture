import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVitest from "@vitest/eslint-plugin";
import pluginStylistic from "@stylistic/eslint-plugin";

export default [
  pluginStylistic.configs.customize({
    semi: true,
    quotes: "double",
  }),

  {
    name: "app/files-to-lint",
    plugins: {
      "@stylistic": pluginStylistic,
    },
    files: ["**/*.{js,ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "src-tauri/**"],
  },

  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },
];
