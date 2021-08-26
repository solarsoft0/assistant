const withTM = require("next-transpile-modules")([
  // _firstparty
  "@assistant-fp/analytics",
  "@assistant-fp/auth",

  // UI
  "@ui/core",
  "@assistant/icons",
  "@assistant/lint-icons",

  // @app
  "app",
  "@app/design-lint",
  "@app/icons-loader",
  "@app/scene-view",

  "@plugin-sdk/app",
  "@plugin-sdk/core",
  "@plugin-sdk/service",
  "@plugin-sdk/draggable",
  "plugin-app",

  "@designto/config",
  "@designto/code",
  "@designto/token",
  "@designto/flutter",
  "@designto/web",
  "@designto/react",
  // design-sdk
  "@design-sdk/key-annotations",
  "@design-sdk/core",
  "@design-sdk/core-types",
  "@design-sdk/universal",
  "@design-sdk/figma",
  "@design-sdk/figma-url",
  "@design-sdk/url-analysis",
  "@design-sdk/sketch",
  // reflect-ui
  "@reflect-ui/core",
  "@reflect-ui/detection",

  // base sdk
  "@base-sdk/core",
  "@base-sdk/base",
  "@base-sdk/url",
  "@base-sdk/hosting",
  "@base-sdk/build",
  "@base-sdk/scene-store",
  "@base-sdk/resources",

  // baes sdk fp
  "@base-sdk-fp/auth",

  // region coli
  "coli",
  "@coli.codes/escape-string",
  "@coli.codes/web-builder",
  "@coli.codes/web-builder-core",
  "@coli.codes/nodejs-builder",
  "@coli.codes/react-builder",
  "@web-builder/styled",
  "@web-builder/styles",
  "@bridged.xyz/flutter-builder",
  // endregion coli
]);

module.exports = withTM();
