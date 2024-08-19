"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExportsToBarrelFile = addExportsToBarrelFile;
const js_1 = require("@nx/js");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
let tsModule;
function addExportsToBarrelFile(tree, options) {
    if (!tsModule) {
        tsModule = (0, ensure_typescript_1.ensureTypescript)();
    }
    const indexPath = `${options.projectRoot}/src/index.ts`;
    const indexContent = tree.read(indexPath, 'utf-8');
    let sourceFile = tsModule.createSourceFile(indexPath, indexContent, tsModule.ScriptTarget.Latest, true);
    // find the export in the source file
    const exportStatement = sourceFile.statements.find((statement) => tsModule.isExportDeclaration(statement));
    sourceFile = (0, js_1.removeChange)(tree, sourceFile, indexPath, 0, exportStatement.getFullText());
    sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexPath, `export * from './lib/${options.fileName}.module';`);
    if (options.service) {
        sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexPath, `export * from './lib/${options.fileName}.service';`);
    }
    if (options.controller) {
        sourceFile = (0, js_1.addGlobal)(tree, sourceFile, indexPath, `export * from './lib/${options.fileName}.controller';`);
    }
}
