import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web-Game-Developers-Platform API",
      version: "1.0.0",
      description: "A simple Game-Developers-Platform",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec