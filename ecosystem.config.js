"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apps = void 0;
exports.apps = [{
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
//# sourceMappingURL=ecosystem.config.js.map