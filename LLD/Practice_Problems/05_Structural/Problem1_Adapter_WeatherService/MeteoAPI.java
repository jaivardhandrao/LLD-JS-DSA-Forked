import java.util.Map;
import java.util.HashMap;

// Third-party class - DO NOT MODIFY
public class MeteoAPI {

    public Map<String, Object> getConditions(String location, String units) {
        Map<String, Object> data = new HashMap<>();
        data.put("temp", 22.5);
        data.put("wind", 24.1);
        data.put("humidity", 65);
        return data;
    }
}
