const {createDefaultPreset} = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;


/** @type {import("jest").config} **/

module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  verbose: true,
  testPathIgnorePatterns: ["./src/config", "./src/database", "__tests__/integration_test"],


    testMatch: ["**/__tests__/unit_test/**/*.test.ts"],
};

