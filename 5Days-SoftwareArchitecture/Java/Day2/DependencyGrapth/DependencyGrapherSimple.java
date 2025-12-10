import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class DependencyGrapherSimple {
    public static void main(String[] args) throws IOException {
        Path root = Paths.get(args.length > 0 ? args[0] : ".");
        Map<String, Set<String>> graph = new TreeMap<>();

        Files.walk(root)
             .filter(p -> p.toString().endsWith(".java"))
             .forEach(p -> {
                 String rel = root.relativize(p).toString().replace(File.separatorChar, '/');
                 graph.putIfAbsent(rel, new TreeSet<>());
                 try (BufferedReader r = Files.newBufferedReader(p)) {
                     String line;
                     while ((line = r.readLine()) != null) {
                         line = line.trim();
                         if (line.startsWith("import ")) {
                             // remove "import" and trailing semicolon
                             String imp = line.substring(7).replace(";", "").trim();
                             graph.get(rel).add(imp);
                         }
                     }
                 } catch (IOException e) {
                     System.err.println("Read error: " + p + " -> " + e.getMessage());
                 }
             });

        // print adjacency list
        System.out.println("Java imports adjacency:");
        graph.forEach((from, tos) -> {
            if (tos.isEmpty()) return;
            System.out.println(from + " ->");
            tos.forEach(to -> System.out.println("  - " + to));
        });
    }
}
