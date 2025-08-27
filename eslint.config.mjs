import js from "@eslint/js";
import globals from "globals";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                ...globals.node
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "no-unused-vars": "warn",
            "no-console": "off",
            "comma-dangle": ["error", "never"],
            "space-before-function-paren": ["error", "never"],
            "object-curly-spacing": ["error", "always"],
            "no-trailing-spaces": "error",
            "eol-last": "error"
        }
    },
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "*.log"
        ]
    }
];