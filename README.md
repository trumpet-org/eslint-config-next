# Trumpet ESLint Config NextJS

This is an extensive ESLint configurations for NextJS based projects. Its compatible with ESLint >=9.

## Installation

```sh
npm install --save-dev eslint typescript-eslint @trumpet/eslint-config-next
```

## Usage

In an ´eslint.config.mjs´ file:

```javascript
import eslintConfigTrumpet from "@trumpet/eslint-config-next";

export default eslintConfigTrumpet;
```

Or

```javascript
import eslintConfigTrumpet from "@trumpet/eslint-config-next";

export default [
  ...eslintConfigTrumpet,
  // other configurations below, for example:
  {
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
];
```
