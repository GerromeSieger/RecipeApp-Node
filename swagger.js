import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RecipeApp API",
      description:
        "API endpoints for the backend services implemented on swagger",
      contact: {
        name: "Test",
        email: "vsifah@gmail.com",
        url: "https://github.com",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./router/*.{js,ts}"], // Include both .js and .ts files
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;