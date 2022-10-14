export const apps = [{
  name: "app",
  script: "./build/src/server.js",
  instances: "max",
  env: {
    NODE_ENV: "development",
  },
  env_production: {
    NODE_ENV: "production",
  }
}];

