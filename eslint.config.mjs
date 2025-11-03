import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "quotes": ["error", "single"],
            "@typescript-eslint/no-unused-vars": ["warn"],
        },
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
        ],
    },
];

export default eslintConfig;
