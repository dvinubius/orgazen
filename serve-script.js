const { LiveReloadCompiler } = require("@nestjs/ng-universal");

const compiler = new LiveReloadCompiler({
  projectName: "dvn-firestarter",
});
compiler.run();
