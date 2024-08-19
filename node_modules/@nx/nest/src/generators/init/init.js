"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGenerator = initGenerator;
const devkit_1 = require("@nx/devkit");
const lib_1 = require("./lib");
async function initGenerator(tree, options) {
    let installPackagesTask = () => { };
    if (!options.skipPackageJson) {
        installPackagesTask = (0, lib_1.addDependencies)(tree, options);
    }
    if (!options.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
    return installPackagesTask;
}
exports.default = initGenerator;
