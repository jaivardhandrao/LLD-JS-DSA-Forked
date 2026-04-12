public class Main {
    public static void main(String[] args) {

        // Simple GET request (only required fields)
        HttpRequest getRequest = new HttpRequest.Builder("GET", "https://api.example.com/users")
                .build();

        System.out.println("GET Request:");
        System.out.println("Method: "          + getRequest.getMethod());
        System.out.println("URL: "             + getRequest.getUrl());
        System.out.println("Timeout: "         + getRequest.getTimeoutMs());
        System.out.println("FollowRedirects: " + getRequest.getFollowRedirects());

        System.out.println("\n=============================\n");

        // POST request with headers, body, custom timeout
        byte[] body = "{\"name\":\"Jai\"}".getBytes();

        HttpRequest postRequest = new HttpRequest.Builder("POST", "https://api.example.com/users")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer token123")
                .body(body)
                .timeoutMs(5000)
                .followRedirects(false)
                .build();

        System.out.println("POST Request:");
        System.out.println("Method: "          + postRequest.getMethod());
        System.out.println("URL: "             + postRequest.getUrl());
        System.out.println("Headers: "         + postRequest.getHeaders());
        System.out.println("Timeout: "         + postRequest.getTimeoutMs());
        System.out.println("FollowRedirects: " + postRequest.getFollowRedirects());
    }
}
