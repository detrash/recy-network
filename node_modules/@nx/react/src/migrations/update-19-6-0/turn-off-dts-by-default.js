"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const devkit_1 = require("@nx/devkit");
const minimatch_1 = require("minimatch");
const tsquery_1 = require("@phenomnomnominal/tsquery");
async function default_1(tree) {
    (0, devkit_1.visitNotIgnoredFiles)(tree, '', (path) => {
        const webpackConfigGlob = '**/webpack*.config*.{js,ts,mjs,cjs}';
        const result = (0, minimatch_1.minimatch)(path, webpackConfigGlob);
        if (!result) {
            return;
        }
        let webpackConfigContents = tree.read(path, 'utf-8');
        if (!/withModuleFederationSSR|withModuleFederation/.test(webpackConfigContents)) {
            return;
        }
        const WITH_MODULE_FEDERATION_SELECTOR = 'CallExpression:has(Identifier[name=composePlugins]) > CallExpression:has(Identifier[name=withModuleFederation]),CallExpression:has(Identifier[name=composePlugins]) > CallExpression:has(Identifier[name=withModuleFederationForSSR])';
        const EXISTING_MF_OVERRIDES_SELECTOR = 'ObjectLiteralExpression';
        const ast = tsquery_1.tsquery.ast(webpackConfigContents);
        const withModuleFederationNodes = (0, tsquery_1.tsquery)(ast, WITH_MODULE_FEDERATION_SELECTOR, { visitAllChildren: true });
        if (!withModuleFederationNodes.length) {
            return;
        }
        const withModuleFederationNode = withModuleFederationNodes[0];
        const existingOverridesNodes = (0, tsquery_1.tsquery)(withModuleFederationNode, EXISTING_MF_OVERRIDES_SELECTOR, { visitAllChildren: true });
        if (!existingOverridesNodes.length) {
            // doesn't exist, add it
            webpackConfigContents = `${webpackConfigContents.slice(0, withModuleFederationNode.getEnd() - 1)},${JSON.stringify({ dts: false })}${webpackConfigContents.slice(withModuleFederationNode.getEnd() - 1)}`;
        }
        else {
            let existingOverrideNode;
            for (const node of existingOverridesNodes) {
                if (!existingOverrideNode) {
                    existingOverrideNode = node;
                }
                if (existingOverrideNode.getText().includes(node.getText())) {
                    continue;
                }
                existingOverrideNode = node;
            }
            const DTS_PROPERTY_SELECTOR = 'PropertyAssignment > Identifier[name=dts]';
            const dtsPropertyNode = (0, tsquery_1.tsquery)(existingOverrideNode, DTS_PROPERTY_SELECTOR);
            if (dtsPropertyNode.length) {
                // dts already exists, do nothing
                return;
            }
            const newOverrides = `{ dts: false, ${existingOverrideNode
                .getText()
                .slice(1)}`;
            webpackConfigContents = `${webpackConfigContents.slice(0, existingOverrideNode.getStart())}${newOverrides}${webpackConfigContents.slice(existingOverrideNode.getEnd())}`;
        }
        tree.write(path, webpackConfigContents);
    });
    await (0, devkit_1.formatFiles)(tree);
}
