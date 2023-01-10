import React from "react";
import { createSwaggerSpec } from "next-swagger-doc"; // generates Swagger Spec
import dynamic from "next/dynamic";

import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false }); // Renders UI for generated Spec

export default function ApiDoc({ spec }) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Bad Bank",
        description: "See spec at https://bad-bank.vercel.com/api/swagger",
        version: "0.0.0",
      },
    },
    schemaFolders: ["src/models"],
    apiFolder: "src/pages/api",
  });

  return {
    props: {
      spec,
    },
  };
};
