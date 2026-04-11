public interface Exporter {
    String export(ReportData data);
    String format(); // returns "CSV", "JSON", "PDF"
}
