import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/",
  documents: ["src/queries/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/types.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
      },
    },
  },
};

export default config;
