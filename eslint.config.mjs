import next from "eslint-config-next";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config. `eslint-config-next` brings the React, hooks, a11y and Next
 * rules; the TypeScript entry layers on type-aware linting.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".data/**",
      "next-env.d.ts",
      "out/**",
      "build/**",
    ],
  },

  ...next,
  ...nextTypescript,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
    },
  },

  {
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default config;
