const { LiveReloadCompiler } = require("@nestjs/ng-universal");

const compiler = new LiveReloadCompiler({
  projectName: "zenorga",
});
compiler.run();
