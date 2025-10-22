import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env.local") });

const config: CodegenConfig = {
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  },
  documents: ["src/api/gql/**/*.ts"],
  generates: {
    "./src/api/gql/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      config: {
        scalars: {
          DateTime: "string",
          Date: "string",
          JSON: "Record<string, any>",
        },
        useTypeImports: true,
        documentMode: "string",
      },
    },
  },
};

export default config;
