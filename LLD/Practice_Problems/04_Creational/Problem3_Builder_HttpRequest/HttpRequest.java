import java.util.*;

public final class HttpRequest {

    private final String method;   // GET, POST, PUT, DELETE
    private final String url;
    private final Map<String, String> headers;
    private final byte[] body;
    private final int timeoutMs;
    private final boolean followRedirects;

    // TODO: Private constructor(Builder builder) - defensive copies
    private HttpRequest(Builder builder) {
        this.method = builder.method;
        this.url = builder.url;
        this.headers = new HashMap<>(builder.headers);
        this.body = builder.body != null ? Arrays.copyOf(builder.body, builder.body.length) : null;
        this.timeoutMs = builder.timeoutMs;
        this.followRedirects = builder.followRedirects;
    }


    // TODO: Getters for all fields (headers returns unmodifiable, body returns copy)

    @Override
    public String toString() {
        return "HttpRequest{" +
                "method='" + method + '\'' +
                ", url='" + url + '\'' +
                ", headers=" + headers +
                ", timeoutMs=" + timeoutMs +
                ", followRedirects=" + followRedirects +
                '}';
    }


    public String getMethod(){
        return this.method;
    }

    public String getUrl(){
        return this.url;
    }

    public Map<String, String> getHeaders(){
        return Collections.unmodifiableMap(this.headers);
    }

    public byte[] getBody(){
        if(this.body == null){
            return null;
        }
        return this.body.clone();
        // return Arrays.copyOf(this.body , this.body.length); // we can use this as well
    }
    public int getTimeoutMs(){
        return this.timeoutMs;
    }
    public boolean getFollowRedirects(){
        return this.followRedirects;
    }

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

        public Builder(String method, String url){
            this.method = method;
            this.url = url;
        }

        public Builder addHeader(String key, String value){
            this.headers.put(key , value);
            return this;
        }

        public Builder body(byte[] body){
            this.body = body;
            return this;
        }

        public Builder timeoutMs(int ms) {
            this.timeoutMs = ms;
            return this;
        }

        public Builder followRedirects(boolean follow) {
            this.followRedirects = follow;
            return this;
        }

        public HttpRequest build(){
            if(this.method == null){
                throw new IllegalArgumentException("Please provide proper method");
            }
            else if(this.url == null){
                throw new IllegalArgumentException("Please provide proper url");
            }
            else if(this.timeoutMs <= 0){
                throw new IllegalArgumentException("Timeout should be greater that 0");

            }
            return new HttpRequest(this);
        }
    }
}
