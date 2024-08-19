"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDependencies = addDependencies;
const devkit_1 = require("@nx/devkit");
const versions_1 = require("../../../utils/versions");
function addDependencies(tree, options) {
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, {
        '@nestjs/schematics': versions_1.nestJsSchematicsVersion,
        '@nx/nest': versions_1.nxVersion,
    }, undefined, options.keepExistingVersions);
}
