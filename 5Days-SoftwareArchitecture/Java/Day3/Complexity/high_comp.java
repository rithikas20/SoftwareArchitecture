class Logic {
    // POOR readability due to deep nesting
    // Cyclomatic Complexity = 4
    public void checkNested(int x) {
        if (x > 0) {
            if (x < 100) {
                if (x % 2 == 0) {
                    System.out.println("Even Positive Small");
                }
            }
        }
    }
}
class high_comp {
    public static void main(String[] args)
    {
        var logic = new Logic();
        logic.checkNested(10);
      
    }
}
