public interface Theme {
    Theme copy();
    String name();
    void setName(String name);
    String describe();
}
