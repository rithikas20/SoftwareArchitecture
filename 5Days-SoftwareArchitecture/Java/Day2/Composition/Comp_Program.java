public class Comp_Program {
    public static void main(String[] args) {
        CountedListWrapper list = new CountedListWrapper();
        list.add("test");
        list.add("bank");
        list.add("system");

        System.out.println("Count = " + list.getCount());
    }
}
