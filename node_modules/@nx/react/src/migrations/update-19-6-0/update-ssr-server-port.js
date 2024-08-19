"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const devkit_1 = require("@nx/devkit");
const tsquery_1 = require("@phenomnomnominal/tsquery");
const ts = require("typescript");
const minimatch_1 = require("minimatch");
const executor_options_utils_1 = require("@nx/devkit/src/generators/executor-options-utils");
function update(tree) {
    const projects = (0, devkit_1.getProjects)(tree);
    const executors = [
        '@nx/webpack:ssr-dev-server',
        '@nx/react:module-federation-ssr-dev-server',
    ];
    executors.forEach((executor) => {
        (0, executor_options_utils_1.forEachExecutorOptions)(tree, executor, (options, projectName) => {
            const project = projects.get(projectName);
            if (isModuleFederationSSRProject(tree, project)) {
                const port = options.port;
                if (tree.exists((0, devkit_1.joinPathFragments)(project.root, 'server.ts'))) {
                    const serverContent = tree.read((0, devkit_1.joinPathFragments)(project.root, 'server.ts'), 'utf-8');
                    if (serverContent && port) {
                        const updatedServerContent = updateServerPort(serverContent, port);
                        if (updatedServerContent) {
                            tree.write((0, devkit_1.joinPathFragments)(project.root, 'server.ts'), updatedServerContent);
                        }
                    }
                }
            }
        });
    });
}
function updateServerPort(serverContent, port) {
    const sourceFile = tsquery_1.tsquery.ast(serverContent);
    const serverPortNode = (0, tsquery_1.tsquery)(sourceFile, `VariableDeclaration:has(Identifier[name="port"])`)[0];
    if (serverPortNode) {
        const binaryExpression = (0, tsquery_1.tsquery)(serverPortNode, 'BinaryExpression')[0];
        if (binaryExpression) {
            const leftExpression = (0, tsquery_1.tsquery)(binaryExpression, 'PropertyAccessExpression:has(Identifier[name="env"])')[0];
            const rightExpression = (0, tsquery_1.tsquery)(binaryExpression, 'NumericLiteral[text="4200"]')[0];
            if (leftExpression && rightExpression) {
                const serverPortDeclaration = serverPortNode;
                const newInitializer = ts.factory.createBinaryExpression(
                // process.env.PORT
                ts.factory.createPropertyAccessExpression(ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('process'), ts.factory.createIdentifier('env')), 'PORT'), 
                // ||
                ts.SyntaxKind.BarBarToken, 
                // port value
                ts.factory.createNumericLiteral(port.toString()));
                const updatePortDeclaration = ts.factory.updateVariableDeclaration(serverPortDeclaration, serverPortDeclaration.name, serverPortDeclaration.exclamationToken, serverPortDeclaration.type, newInitializer);
                const updatedStatements = sourceFile.statements.map((statement) => {
                    if (ts.isVariableStatement(statement)) {
                        const updatedDeclarationList = statement.declarationList.declarations.map((decl) => decl === serverPortDeclaration ? updatePortDeclaration : decl);
                        const updatedDeclList = ts.factory.updateVariableDeclarationList(statement.declarationList, updatedDeclarationList);
                        return ts.factory.updateVariableStatement(statement, statement.modifiers, updatedDeclList);
                    }
                    return statement;
                });
                const updatedSourceFile = ts.factory.updateSourceFile(sourceFile, updatedStatements);
                const printer = ts.createPrinter();
                return printer.printNode(ts.EmitHint.Unspecified, updatedSourceFile, sourceFile);
            }
        }
    }
}
function isModuleFederationSSRProject(tree, project) {
    let hasMfeServerConfig = false;
    (0, devkit_1.visitNotIgnoredFiles)(tree, project.root, (filePath) => {
        if ((0, minimatch_1.minimatch)(filePath, '**/module-federation*.server.config.*')) {
            hasMfeServerConfig = true;
        }
    });
    return hasMfeServerConfig;
}
