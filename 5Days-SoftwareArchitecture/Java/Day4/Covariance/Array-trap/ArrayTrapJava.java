public class ArrayTrapJava {
    public static void main(String[] args) {
        // FALLACY: Array covariance is "unsafe" at runtime
        String[] strings = { "a", "b" };

        // COVARIANCE: String[] IS-A Object[]
        Object[] objects = strings; // allowed in Java

        try {
            // CRASH: ArrayStoreException
            // We try to put an Integer into what the runtime knows is strictly a String array
            objects[0] = 123; 
        } catch (ArrayStoreException ex) {
            System.out.println("Runtime Safety Check Failed: " + ex);
        }
    }
}
