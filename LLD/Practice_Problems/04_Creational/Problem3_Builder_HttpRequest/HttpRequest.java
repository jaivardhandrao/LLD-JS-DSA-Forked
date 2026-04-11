import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

public final class HttpRequest {

    private final String method;   // GET, POST, PUT, DELETE
    private final String url;
    private final Map<String, String> headers;
    private final byte[] body;
    private final int timeoutMs;
    private final boolean followRedirects;

    // TODO: Private constructor(Builder builder) - defensive copies

    // TODO: Getters for all fields (headers returns unmodifiable, body returns copy)

    // TODO: toString()

    public static class Builder {

        // Required
        private String method;
        private String url;

        // Optional with defaults
        private Map<String, String> headers = new HashMap<>();
        private byte[] body = null;
        private int timeoutMs = 30000;
        private boolean followRedirects = true;

        // TODO: Builder(String method, String url)

        // TODO: Builder addHeader(String key, String value) - return this

        // TODO: Builder body(byte[] body) - return this

        // TODO: Builder timeoutMs(int ms) - return this

        // TODO: Builder followRedirects(boolean follow) - return this

        // TODO: HttpRequest build() - validate method/url not blank, timeout > 0
    }
}
