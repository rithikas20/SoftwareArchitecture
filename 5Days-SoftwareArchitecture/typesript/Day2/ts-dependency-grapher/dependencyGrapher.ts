import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

interface FileDependencies {
    file: string;
    imports: string[];
}

// Recursively collect all .ts files in a folder
function getAllTsFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllTsFiles(fullPath));
        } else if (fullPath.endsWith(".ts")) {
            results.push(fullPath);
        }
    }
    return results;
}

// Parse a single TypeScript file and collect imports
function getImports(filePath: string): string[] {
    const sourceCode = fs.readFileSync(filePath, "utf-8");
    const sourceFile = ts.createSourceFile(
        filePath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true
    );

    const imports: string[] = [];

    function visit(node: ts.Node) {
        if (ts.isImportDeclaration(node)) {
            const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
            imports.push(moduleSpecifier);
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return imports;
}

// Main function
function analyzeDependencies(folder: string): FileDependencies[] {
    const files = getAllTsFiles(folder);
    const result: FileDependencies[] = [];

    for (const file of files) {
        const imports = getImports(file);
        result.push({ file: path.relative(folder, file), imports });
    }

    return result;
}

// Usage
const folderToAnalyze = "./"; // current folder
const dependencies = analyzeDependencies(folderToAnalyze);

console.log("=== Dependency Graph ===");
dependencies.forEach(dep => {
    console.log(`${dep.file}:`);
    dep.imports.forEach(i => console.log(`  -> ${i}`));
});
