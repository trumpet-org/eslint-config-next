/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fixupPluginRules } from "@eslint/compat";
import eslintJS from "@eslint/js";
import eslintPluginJSDoc from "eslint-plugin-jsdoc";
// @ts-expect-error, untyped import
import eslintPluginMarkdown from "eslint-plugin-markdown";
import eslintPluginNode from "eslint-plugin-n";
// @ts-expect-error, untyped import
import eslintPluginPromise from "eslint-plugin-promise";
// @ts-expect-error, untyped import
import eslintPluginReact from "eslint-plugin-react";
// @ts-expect-error, untyped import
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginVitest from "eslint-plugin-vitest";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import eslintTS from "typescript-eslint";
// @ts-expect-error, untyped import
import eslintPluginNext from "@next/eslint-plugin-next";
import type { Linter } from "eslint";
import eslintConfigOxlint from "eslint-plugin-oxlint";

export default [
  eslintJS.configs.recommended,
  ...eslintTS.configs.strictTypeChecked,
  ...eslintTS.configs.stylisticTypeChecked,
  eslintPluginNode.configs["flat/recommended-module"],
  eslintPluginPromise.configs["flat/recommended"],
  eslintPluginUnicorn.configs["flat/recommended"],
  eslintPluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
      },
      parserOptions: {
        project: "./tsconfig.json",
        parser: "@typescript-eslint/parser",
        tsconfigRootDir: "./",
        ecmaVersion: 2024,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
      markdown: eslintPluginMarkdown,
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
      "@next/next": fixupPluginRules(eslintPluginNext),
    },
    rules: {
      // JavaScript rules
      "no-console": "warn",
      "prefer-destructuring": "error",
      curly: "error",
      eqeqeq: "error",
      "prefer-const": ["error", { destructuring: "all" }],
      "no-unused-vars": "error",
      "object-shorthand": "error",
      "prefer-template": "warn",

      // TypeScript rules
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/consistent-type-definitions": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
      ],
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-floating-promises": [
        "error",
        { ignoreIIFE: true, ignoreVoid: true },
      ],
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "warn",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "all", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/no-useless-empty-export": "warn",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/prefer-includes": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/restrict-template-expressions": "off",

      // Node.js rules
      "n/no-extraneous-import": "error",
      "n/no-missing-import": "off",
      "n/no-process-exit": "error",

      // Unicorn rules
      "unicorn/catch-error-name": "off",
      "unicorn/explicit-length-check": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/no-process-exit": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-string-raw": "off",

      // Unused imports rule
      "unused-imports/no-unused-imports": "error",

      // React
      "react/react-in-jsx-scope": "off"
    },
  },
  {
    files: ["**/*.md"],
    processor: "markdown/markdown",
  },
  {
    files: [
      "**/*.md/*.{ts,js,mts,mjs,cjs,cts,}",
      "**/*.md/*.js",
      "**/*.md/*.tsx",
      "**/*.md/*.jsx",
      "**/*.md/*.mtsx",
      "**/*.md/*.mjsx",
    ],
    processor: "markdown/markdown",
  },
  {
    ...eslintPluginJSDoc.configs["flat/recommended-typescript"],
    ignores: ["**/*.tsx"],
    rules: {
      "jsdoc/no-defaults": "off",
      "jsdoc/no-types": "off",
      "jsdoc/require-jsdoc": ["error", { publicOnly: true }],
    },
  },
  {
    files: ["*.*"],
    rules: {
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
  {
    files: ["**/*.tsx"],
    rules: {
      "@typescript-eslint/no-misused-promises": "off",
    },
    ignores: ["coverage", "gen"],
  },
  {
    files: [
      "**/*.{spec,test}.{ts,tsx}",
      "**/{tests,test,__tests__,__mock__,__mocks__,testing}/*.ts",
    ],
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      ...eslintPluginVitest.configs.recommended.rules,
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/prefer-as-const": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "typescript-eslint/no-confusing-void-expression": "off",
      "unicorn/error-message": "off",
      "unicorn/no-await-expression-member": "off",
    },
  },
  {
    ignores: [
      ".next",
      ".turbo",
      "__tmp__",
      "_next",
      "node_modules",
      "target",
      "gen",
      "coverage",
      ".coverage",
    ],
  },
  eslintConfigOxlint.configs["flat/recommended"],
] as Linter.Config[];
