class Logic {
    // Flat structure improves readability
    // Cyclomatic Complexity = still 4 (same logic, same # paths)
    public void checkFlat(int x) {
        if (x <= 0) return;
        if (x >= 100) return;
        if (x % 2 != 0) return;

        System.out.println("Even Positive Small");
    }
}

public class low_comp {
    public static void main(String[] args) {  
        Logic logic = new Logic();             
        logic.checkFlat(10);                   
    }
}
