var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

// Config after eject: we're in ./config/
module.exports = {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appBuildJs: resolveApp('src/modules/Layouts/index.jsx'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    applicationSrc: resolveApp('../src')
};
