import { config } from "../config/config.js";

export const info = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "e-commerce API CoderHouse",
        version: "1.0.0",
        description: "API CoderHouse Backend Avanzado",
      },
      servers: [
        {
          url: `http://localhost:${config.PORT}`,
        },
      ],
    },
    apis: ["./src/docs/userDocs/*.yml"],
  };
  