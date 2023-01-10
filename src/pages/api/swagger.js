import { withSwagger } from "next-swagger-doc";

// This API route can return Swagger Spec as JSON
const swaggerHandler = withSwagger({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bad Bank",
      version: "0.0.0",
    },
  },
  schemaFolders: ["src/models"],
  apiFolder: "src/pages/api",
});

export default swaggerHandler();
