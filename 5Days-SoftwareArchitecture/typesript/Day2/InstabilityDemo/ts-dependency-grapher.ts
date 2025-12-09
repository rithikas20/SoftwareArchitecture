const fs = require("fs");
const path = require("path");
const ts = require("typescript");


// Type for storing the dependency graph
type Graph = Map<string, Set<string>>;

// Recursively find all .ts/.tsx files
function walkDir(dir: string, files: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name !== "node_modules" && name !== "dist") walkDir(full, files);
    } else if (full.endsWith(".ts") || full.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

// Add a dependency edge to the graph
function addEdge(graph: Graph, from: string, to: string) {
  if (!graph.has(from)) graph.set(from, new Set());
  graph.get(from)!.add(to);
}

// Analyze a single file using AST
function analyzeFile(filePath: string, graph: Graph) {
  const content = fs.readFileSync(filePath, "utf8");

  // Parse file into AST
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

  const from = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
  if (!graph.has(from)) graph.set(from, new Set());

  // Recursive function to visit AST nodes
  function visit(node: ts.Node) {
    // Detect static import: import ... from "module"
    if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      addEdge(graph, from, node.moduleSpecifier.text);
    }
    // Detect export from "module"
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      addEdge(graph, from, node.moduleSpecifier.text);
    }
    // Detect import = require("module")
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      const expr = (node.moduleReference as ts.ExternalModuleReference).expression;
      if (expr && ts.isStringLiteral(expr)) addEdge(graph, from, expr.text);
    }
    // Detect dynamic import("module")
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg = node.arguments[0];
      if (arg && ts.isStringLiteral(arg)) addEdge(graph, from, arg.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

// Print dependency graph
function printGraph(graph: Graph) {
  console.log("TypeScript Dependency Graph:");
  for (const [file, deps] of graph) {
    if (deps.size === 0) continue;
    console.log(file + " ->");
    for (const dep of deps) console.log("  - " + dep);
  }
}

// MAIN
const rootDir = process.argv[2] || ".";
const files = walkDir(rootDir);
const graph: Graph = new Map();

files.forEach(file => analyzeFile(file, graph));
printGraph(graph);
