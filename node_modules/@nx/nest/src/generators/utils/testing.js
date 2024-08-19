"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTreeWithNestApplication = createTreeWithNestApplication;
const devkit_1 = require("@nx/devkit");
const testing_1 = require("@nx/devkit/testing");
function createTreeWithNestApplication(appName) {
    const tree = (0, testing_1.createTreeWithEmptyWorkspace)();
    (0, devkit_1.addProjectConfiguration)(tree, appName, {
        root: `${appName}`,
        sourceRoot: `${appName}/src`,
        projectType: 'application',
        targets: {},
    });
    return tree;
}
