"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJestConfigContent = updateJestConfigContent;
function updateJestConfigContent(content) {
    return content
        .replace('transform: {', "transform: {\n    '^(?!.*\\\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',")
        .replace(`'babel-jest'`, `['babel-jest', { presets: ['@nx/react/babel'] }]`);
}
