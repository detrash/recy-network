"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNestSchematic = runNestSchematic;
const devkit_1 = require("@nx/devkit");
async function runNestSchematic(tree, schematic, options) {
    const { skipFormat, ...schematicOptions } = options;
    const { wrapAngularDevkitSchematic } = require('@nx/devkit/ngcli-adapter');
    const nestSchematic = wrapAngularDevkitSchematic('@nestjs/schematics', schematic);
    const result = await nestSchematic(tree, schematicOptions);
    if (!skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
    return result;
}
