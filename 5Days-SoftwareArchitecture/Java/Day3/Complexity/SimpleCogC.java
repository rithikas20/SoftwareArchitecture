import java.util.List;

public class SimpleCogC {

    // Calculate sum of positive numbers
    int sumPositive(List<Integer> numbers) {
        int sum = 0; // CCog = 0 (simple statement)

        for (int num : numbers) { // +1 (loop)
            if (num > 0) {         // +1 (if) +1 (nested inside loop) = 2
                sum += num;        // 0 (simple statement)
            }
        }

        return sum; // 0
    }

    public static void main(String[] args) {
        SimpleCogC example = new SimpleCogC();
        List<Integer> numbers = List.of(-5, 0, 2, 3, -1);
        int result = example.sumPositive(numbers);

        System.out.println("Sum of positive numbers: " + result);
        System.out.println("Cognitive Complexity: Loop(1) + if(2) = 3");
    }
}
