// Coordinator.ts
import { AuthSystem } from "./Auth";   // Ce += 1
import { Database } from "./DB";       // Ce += 1
import { Emailer } from "./Email";     // Ce += 1

export class Coordinator {
    doWork(): void {
        new AuthSystem();
        new Database();
        new Emailer();
        console.log("Coordinator working...");
    }
}
