# Assignment: API Decorator (Decorator Pattern)

**Pattern:** Decorator | **Difficulty:** Medium-Hard

---

## Problem Statement

An e-commerce REST API needs logging and rate-limiting added to its endpoints. Adding these directly to the API class violates SRP and makes them hard to remove or combine. The **Decorator pattern** wraps the API in layers — each decorator adds one behaviour and delegates to the next layer in the chain.

---

## Class Structure

```
Api (interface)
 ├── SimpleEcommerceAPI          ← the real API (innermost)
 └── BaseApiDecorator            ← abstract base for all decorators
      ├── LoggingDecorator       ← adds logging
      └── RateLimitingDecorator  ← adds rate limiting
```

| Class | Role |
|-------|------|
| `Api` | Interface: `executeRequest(String)` — provided |
| `SimpleEcommerceAPI` | Concrete API, calls `ApiUtils.callAPI()` — provided |
| `BaseApiDecorator` | Abstract decorator — **you implement** (holds `nextLayer`) |
| `LoggingDecorator` | Logs the request, then delegates — **you implement** |
| `RateLimitingDecorator` | Checks rate limit, throws or delegates — **you implement** |

---

## Solution

### BaseApiDecorator.java

```java
public abstract class BaseApiDecorator implements Api {

    protected Api nextLayer;    // reference to the next layer in the chain

    public BaseApiDecorator(Api nextLayer) {
        this.nextLayer = nextLayer;
    }
}
```

### LoggingDecorator.java

```java
public class LoggingDecorator extends BaseApiDecorator {

    public LoggingDecorator(Api nextLayer) {
        super(nextLayer);
    }

    @Override
    public String executeRequest(String requestData) {
        System.out.println("Logging request: " + requestData);
        return nextLayer.executeRequest(requestData);   // delegate to next
    }
}
```

### RateLimitingDecorator.java

```java
public class RateLimitingDecorator extends BaseApiDecorator {

    public RateLimitingDecorator(Api nextLayer) {
        super(nextLayer);
    }

    @Override
    public String executeRequest(String requestData) {
        if (ApiUtils.rateLimitExceeded(requestData)) {
            throw new RateLimitExceededException("Rate limit exceeded");
        }
        return nextLayer.executeRequest(requestData);   // delegate to next
    }
}
```

---

## How Chaining Works

```java
Api api = new SimpleEcommerceAPI();                   // innermost: real API
api = new LoggingDecorator(api);                      // wraps it with logging
api = new RateLimitingDecorator(api);                 // wraps that with rate limiting

api.executeRequest("GET /products");
// Flow:
// RateLimitingDecorator.executeRequest()
//   → checks rate limit
//   → LoggingDecorator.executeRequest()
//       → logs request
//       → SimpleEcommerceAPI.executeRequest()
//           → calls actual API
```

---

## Key Rules

1. **`BaseApiDecorator` must implement `Api`** — so decorators are interchangeable with the real API.
2. **Each decorator stores `nextLayer` as `Api`** — not as a concrete type. This allows wrapping decorators inside other decorators.
3. **Always call `nextLayer.executeRequest()`** — otherwise the chain breaks and the real API never gets called.

---

## Decorator vs Inheritance

| | Inheritance | Decorator |
|---|---|---|
| Add behaviour | Subclass and override | Wrap and delegate |
| Combine behaviours | Multiple inheritance (messy) | Stack decorators |
| Add at runtime | No | Yes |
| Open/Closed | Violates | Follows |

---

## Exam Tips

- **Viva:** "Why not just subclass SimpleEcommerceAPI and add logging?" → Can't combine logging AND rate limiting without another subclass. Decorator lets you stack behaviours without explosion of subclasses.
- **Viva:** "What does BaseApiDecorator implement?" → `Api` — same interface as the thing it wraps. This is what makes them swappable.
- **MCQ trap:** The decorator MUST call `nextLayer.executeRequest()` — failing to do so means the decorated behaviour replaces the original instead of augmenting it.
- **Real-world:** Java's `BufferedReader(new FileReader(...))`, `new GZIPOutputStream(new FileOutputStream(...))`.
