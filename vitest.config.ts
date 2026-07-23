import {defineConfig} from "vitest/config";

export default defineConfig({
    resolve:{
        tsconfigPaths:true,
    },
    test:{
        environment:"node",
        env:{AI_PROVIDER:"mock"},
        include:["src/**/.test.{ts,tsx}","tests/**/*.test.{ts,tsx}"],
        coverage:{
            provider:"v8",
            include:["src/lib/**","src/app/api/**"],
            exclude:["**/*.test.ts"],
        },
    },
});

