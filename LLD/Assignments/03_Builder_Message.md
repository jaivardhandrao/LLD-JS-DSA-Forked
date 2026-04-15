# Assignment: Message Builder (Builder Pattern)

**Pattern:** Builder | **Difficulty:** Medium

---

## Problem Statement

A messaging app supports text, image, audio, and video messages. Creating message objects with overloaded constructors is error-prone. Implement the **Builder pattern** to construct `Message` objects with a clean fluent API.

---

## Architecture the Test Expects

The test uses reflection and looks for this **exact structure**:

```
@WithBuilder
class MessageBuilder          ← outer class, has same fields as Message
    └── static class Builder  ← inner builder class
            └── build()       ← returns MessageBuilder (not Message!)
```

| Class | Role |
|-------|------|
| `Message` | The product — provided, do not modify |
| `MessageBuilder` | Outer class annotated `@WithBuilder`, mirrors Message fields |
| `MessageBuilder.Builder` | Static inner class with fluent setters, `build()` returns `MessageBuilder` |

---

## Solution

```java
// MessageBuilder.java
@WithBuilder
public class MessageBuilder {

    private MessageType messageType;
    private String content;
    private String sender;
    private String recipient;
    private boolean isDelivered;
    private long timestamp;

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private MessageBuilder messageBuilder;

        public Builder() {
            messageBuilder = new MessageBuilder();
        }

        public Builder messageType(MessageType messageType) {
            messageBuilder.messageType = messageType;
            return this;
        }

        public Builder content(String content) {
            messageBuilder.content = content;
            return this;
        }

        public Builder sender(String sender) {
            messageBuilder.sender = sender;
            return this;
        }

        public Builder recipient(String recipient) {
            messageBuilder.recipient = recipient;
            return this;
        }

        public Builder isDelivered(boolean isDelivered) {
            messageBuilder.isDelivered = isDelivered;
            return this;
        }

        public Builder timestamp(long timestamp) {
            messageBuilder.timestamp = timestamp;
            return this;
        }

        public MessageBuilder build() {
            MessageBuilder result = new MessageBuilder();
            result.messageType   = this.messageBuilder.messageType;
            result.content       = this.messageBuilder.content;
            result.sender        = this.messageBuilder.sender;
            result.recipient     = this.messageBuilder.recipient;
            result.isDelivered   = this.messageBuilder.isDelivered;
            result.timestamp     = this.messageBuilder.timestamp;
            return result;
        }
    }
}
```

---

## What Each Test Checks

| Test | What it verifies |
|------|-----------------|
| `testBuilderClassHasStaticClass` | `MessageBuilder` has a `public static` inner class |
| `testBuilderClassHasAllFields` | `MessageBuilder` fields match `Message` fields (name + type) |
| `testInnerFields` | `Builder` has either a reference to `MessageBuilder` OR all Message fields directly |
| `testBuilderClassHasBuildMethod` | `Builder.build()` exists and returns `MessageBuilder` (not `Message`) |
| `testBuildMethodCopiesValues` | Values set in builder appear in the built `MessageBuilder` |

---

## Common Mistakes

| Mistake | Why it fails |
|---------|-------------|
| No static inner class | `testBuilderClassHasStaticClass` → null innerClass |
| `build()` returns `Message` | `testBuilderClassHasBuildMethod` → return type check fails |
| Fluent setters on outer class (not inner) | No `Builder` class → test cannot find it |
| `@WithBuilder` on wrong class | Reflections scan finds wrong class |

---

## Exam Tips

- **Viva:** "Why return `this` from setters?" → enables method chaining: `builder.sender("A").content("B").build()`.
- **Viva:** "Why is Builder a static inner class?" → static = can be instantiated without an outer class instance.
- **MCQ trap:** The Builder pattern separates CONSTRUCTION from REPRESENTATION. The `build()` method returns the **product**, not the builder.
