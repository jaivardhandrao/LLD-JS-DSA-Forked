public class Main {
    public static void main(String[] args) {
        // Config A: Timestamp + Console
        // TODO: new TimestampDecorator(new ConsoleLogger())

        // Config B: LevelFilter + Timestamp + Console
        // TODO: new LevelFilterDecorator(new TimestampDecorator(new ConsoleLogger()))

        // Config C: FileDecorator + EncryptionDecorator + Console
        // TODO: new FileDecorator(new EncryptionDecorator(new ConsoleLogger()))

        // TODO: Test each config with DEBUG, INFO, WARNING, ERROR messages
    }
}
