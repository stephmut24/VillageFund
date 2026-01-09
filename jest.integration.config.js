const { createDefaultPreset } = require("ts-jest");
const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/__tests__/integration_test/setup.ts"], // DB, supertest
  testMatch: ["**/__tests__/integration_test/**/*.test.ts"], // ne matcher que integration
};
