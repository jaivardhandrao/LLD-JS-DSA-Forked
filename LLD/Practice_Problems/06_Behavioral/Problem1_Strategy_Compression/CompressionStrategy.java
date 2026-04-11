public interface CompressionStrategy {
    String compress(String data);
    String name();
}
