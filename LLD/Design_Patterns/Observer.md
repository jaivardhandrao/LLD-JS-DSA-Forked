# Observer Design Pattern

**Category:** Behavioral
**Intent:** Define a one-to-many dependency between objects so that when one object (the subject) changes state, all its dependents (observers) are notified and updated automatically.
**Use cases:** Stock price tickers, event-driven UI frameworks, notification systems, news feeds, chat rooms, sensor monitoring, pub-sub messaging, reactive streams.

---

## The Problem: Tight Coupling and Polling

### Scenario

You have a `StockExchange` that tracks stock prices. Multiple consumers need to react when prices change: a mobile app displays live prices, a web dashboard renders charts, and an email alert fires when a threshold is crossed.

### BAD Option 1: Polling (Pull-on-Timer)

```java
// BAD: Each consumer polls the stock exchange on a timer
class MobileApp {
    private StockExchange exchange;
    private double lastPrice = -1;

    void checkForUpdates() {
        // Called every 100ms by a timer -- wasteful!
        double currentPrice = exchange.getPrice("GOOG");
        if (currentPrice != lastPrice) {
            lastPrice = currentPrice;
            updateUI(currentPrice);
        }
    }
    void updateUI(double price) { System.out.println("Mobile: " + price); }
}

class WebDashboard {
    private StockExchange exchange;
    private double lastPrice = -1;

    void checkForUpdates() {
        double currentPrice = exchange.getPrice("GOOG");
        if (currentPrice != lastPrice) {
            lastPrice = currentPrice;
            renderChart(currentPrice);
        }
    }
    void renderChart(double price) { System.out.println("Web: " + price); }
}
```

**Problems:**
- **Wasted CPU:** Consumers poll even when nothing has changed
- **Latency:** Updates are delayed until the next poll cycle
- **Duplication:** Every consumer duplicates the "check-and-compare" logic
- **Scalability:** N consumers x M polls/second = N*M calls, most returning "no change"

### BAD Option 2: Subject Knows Every Consumer (Tight Coupling)

```java
// BAD: StockExchange directly calls every consumer
class StockExchange {
    private MobileApp mobileApp;
    private WebDashboard webDashboard;
    private EmailAlert emailAlert;

    void setPrice(String symbol, double price) {
        this.prices.put(symbol, price);
        // Directly coupled to every consumer type
        mobileApp.updateUI(price);
        webDashboard.renderChart(price);
        emailAlert.checkThreshold(symbol, price);
    }
}
```

**Problems:**
- **OCP violation:** Adding a new consumer (e.g., SMSAlert) requires editing `StockExchange`
- **DIP violation:** Subject depends on concrete consumer types, not abstractions
- **SRP violation:** `StockExchange` manages prices AND knows how to notify each consumer
- **Rigid:** Cannot add/remove consumers at runtime

---

## The Solution: Observer Pattern (Publish-Subscribe)

### The Insight

Invert the dependency. The subject does not know WHAT its observers are -- it only knows they implement a common `Observer` interface. Observers **register** themselves with the subject. When the subject's state changes, it iterates over registered observers and calls `update()`.

### Roles

| Role | Responsibility | Example |
|------|---------------|---------|
| **Subject (Observable)** | Maintains a list of observers; provides register/unregister/notify methods | `StockExchange` |
| **Observer** | Declares the `update()` interface that subjects call | `Observer` interface |
| **ConcreteSubject** | Stores the actual state; calls `notifyObservers()` when state changes | `StockExchange` (concrete) |
| **ConcreteObserver** | Implements `update()` to react to subject's state change | `MobileApp`, `WebDashboard`, `EmailAlert` |

### UML Relationship (Text)

```
Subject (interface)
  +register(Observer)
  +unregister(Observer)
  +notifyObservers()
         |
         | implements
         v
ConcreteSubject
  -state
  -List<Observer> observers
  +getState()
  +setState()  --> calls notifyObservers()

Observer (interface)
  +update(Subject)  // or update(data) for push model
         |
         | implements
         v
ConcreteObserverA, ConcreteObserverB, ...
```

---

## Java Example 1: Stock Price Tracker

### Step 1: Observer Interface

```java
// Observer.java
public interface Observer {
    void update(String stockSymbol, double price);
}
```

### Step 2: Subject Interface

```java
// Subject.java
import java.util.List;

public interface Subject {
    void register(Observer observer);
    void unregister(Observer observer);
    void notifyObservers();
}
```

### Step 3: Concrete Subject -- StockExchange

```java
// StockExchange.java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StockExchange implements Subject {
    private final List<Observer> observers = new ArrayList<>();
    private final Map<String, Double> prices = new HashMap<>();
    private String lastUpdatedSymbol;

    @Override
    public void register(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    @Override
    public void unregister(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        double price = prices.getOrDefault(lastUpdatedSymbol, 0.0);
        // IMPORTANT: iterate over a COPY to avoid ConcurrentModificationException
        for (Observer observer : new ArrayList<>(observers)) {
            observer.update(lastUpdatedSymbol, price);
        }
    }

    public void setPrice(String symbol, double price) {
        this.prices.put(symbol, price);
        this.lastUpdatedSymbol = symbol;
        notifyObservers();  // push notification to all observers
    }

    public double getPrice(String symbol) {
        return prices.getOrDefault(symbol, 0.0);
    }
}
```

### Step 4: Concrete Observers

```java
// MobileApp.java
public class MobileApp implements Observer {
    private final String appName;

    public MobileApp(String appName) { this.appName = appName; }

    @Override
    public void update(String stockSymbol, double price) {
        System.out.println("[MobileApp:" + appName + "] "
            + stockSymbol + " is now $" + price);
    }
}

// WebDashboard.java
public class WebDashboard implements Observer {
    @Override
    public void update(String stockSymbol, double price) {
        System.out.println("[WebDashboard] Rendering chart for "
            + stockSymbol + " at $" + price);
    }
}

// EmailAlert.java
public class EmailAlert implements Observer {
    private final String email;
    private final double threshold;

    public EmailAlert(String email, double threshold) {
        this.email = email;
        this.threshold = threshold;
    }

    @Override
    public void update(String stockSymbol, double price) {
        if (price > threshold) {
            System.out.println("[EmailAlert] Sending alert to " + email
                + ": " + stockSymbol + " exceeded $" + threshold
                + " (now $" + price + ")");
        }
    }
}
```

### Step 5: Client / Demo

```java
// StockDemo.java
public class StockDemo {
    public static void main(String[] args) {
        // Create the subject
        StockExchange exchange = new StockExchange();

        // Create observers
        MobileApp app1 = new MobileApp("iPhone");
        MobileApp app2 = new MobileApp("Android");
        WebDashboard dashboard = new WebDashboard();
        EmailAlert alert = new EmailAlert("ceo@company.com", 150.0);

        // Register observers
        exchange.register(app1);
        exchange.register(app2);
        exchange.register(dashboard);
        exchange.register(alert);

        // Price changes -> all observers notified automatically
        System.out.println("--- GOOG price update ---");
        exchange.setPrice("GOOG", 142.50);

        System.out.println("\n--- GOOG price update (above threshold) ---");
        exchange.setPrice("GOOG", 155.75);

        // Unregister one observer
        System.out.println("\n--- Unregister Android app ---");
        exchange.unregister(app2);

        System.out.println("\n--- GOOG price update ---");
        exchange.setPrice("GOOG", 160.00);
    }
}
```

**Expected output:**
```
--- GOOG price update ---
[MobileApp:iPhone] GOOG is now $142.5
[MobileApp:Android] GOOG is now $142.5
[WebDashboard] Rendering chart for GOOG at $142.5

--- GOOG price update (above threshold) ---
[MobileApp:iPhone] GOOG is now $155.75
[MobileApp:Android] GOOG is now $155.75
[WebDashboard] Rendering chart for GOOG at $155.75
[EmailAlert] Sending alert to ceo@company.com: GOOG exceeded $150.0 (now $155.75)

--- Unregister Android app ---

--- GOOG price update ---
[MobileApp:iPhone] GOOG is now $160.0
[WebDashboard] Rendering chart for GOOG at $160.0
[EmailAlert] Sending alert to ceo@company.com: GOOG exceeded $150.0 (now $160.0)
```

**Why this is better than the BAD approaches:**
- **No polling:** Observers are notified only when state actually changes
- **Loose coupling:** `StockExchange` knows observers only through the `Observer` interface
- **OCP:** Adding `SMSAlert` requires ZERO changes to `StockExchange` -- just implement `Observer` and register
- **Runtime flexibility:** Observers can register/unregister dynamically

---

## Java Example 2: News Agency (Event System)

### Step 1: Interfaces

```java
// NewsObserver.java
public interface NewsObserver {
    void onBreakingNews(String headline, String content);
}

// NewsPublisher.java
import java.util.List;

public interface NewsPublisher {
    void subscribe(NewsObserver observer);
    void unsubscribe(NewsObserver observer);
    void publishBreakingNews(String headline, String content);
}
```

### Step 2: Concrete Subject -- NewsAgency

```java
// NewsAgency.java
import java.util.ArrayList;
import java.util.List;

public class NewsAgency implements NewsPublisher {
    private final String name;
    private final List<NewsObserver> subscribers = new ArrayList<>();

    public NewsAgency(String name) { this.name = name; }

    @Override
    public void subscribe(NewsObserver observer) {
        if (!subscribers.contains(observer)) {
            subscribers.add(observer);
            System.out.println("[" + name + "] New subscriber added. Total: "
                + subscribers.size());
        }
    }

    @Override
    public void unsubscribe(NewsObserver observer) {
        if (subscribers.remove(observer)) {
            System.out.println("[" + name + "] Subscriber removed. Total: "
                + subscribers.size());
        }
    }

    @Override
    public void publishBreakingNews(String headline, String content) {
        System.out.println("\n[" + name + "] BREAKING: " + headline);
        // Iterate over a copy to avoid ConcurrentModificationException
        List<NewsObserver> snapshot = new ArrayList<>(subscribers);
        for (NewsObserver observer : snapshot) {
            observer.onBreakingNews(headline, content);
        }
    }
}
```

### Step 3: Concrete Observers

```java
// TVChannel.java
public class TVChannel implements NewsObserver {
    private final String channelName;

    public TVChannel(String channelName) { this.channelName = channelName; }

    @Override
    public void onBreakingNews(String headline, String content) {
        System.out.println("  [TV:" + channelName + "] LIVE TICKER: " + headline);
    }
}

// Newspaper.java
public class Newspaper implements NewsObserver {
    private final String paperName;

    public Newspaper(String paperName) { this.paperName = paperName; }

    @Override
    public void onBreakingNews(String headline, String content) {
        System.out.println("  [Print:" + paperName + "] Front page: "
            + headline + " | " + content.substring(0, Math.min(50, content.length())) + "...");
    }
}

// SocialMediaBot.java
public class SocialMediaBot implements NewsObserver {
    private final String platform;

    public SocialMediaBot(String platform) { this.platform = platform; }

    @Override
    public void onBreakingNews(String headline, String content) {
        String tweet = "BREAKING: " + headline + " #news #breaking";
        if (tweet.length() > 280) tweet = tweet.substring(0, 277) + "...";
        System.out.println("  [Bot:" + platform + "] Posted: " + tweet);
    }
}
```

### Step 4: Demo

```java
// NewsDemo.java
public class NewsDemo {
    public static void main(String[] args) {
        NewsAgency reuters = new NewsAgency("Reuters");

        TVChannel cnn = new TVChannel("CNN");
        TVChannel bbc = new TVChannel("BBC");
        Newspaper times = new Newspaper("NY Times");
        SocialMediaBot twitterBot = new SocialMediaBot("Twitter");

        // Subscribe
        reuters.subscribe(cnn);
        reuters.subscribe(bbc);
        reuters.subscribe(times);
        reuters.subscribe(twitterBot);

        // Publish -- all observers notified
        reuters.publishBreakingNews(
            "Mars rover finds water",
            "NASA confirms the Perseverance rover has detected liquid water beneath the surface."
        );

        // Unsubscribe one
        reuters.unsubscribe(bbc);

        reuters.publishBreakingNews(
            "Tech stocks rally 5%",
            "Major technology stocks see sharp gains in afternoon trading session."
        );
    }
}
```

**Expected output:**
```
[Reuters] New subscriber added. Total: 1
[Reuters] New subscriber added. Total: 2
[Reuters] New subscriber added. Total: 3
[Reuters] New subscriber added. Total: 4

[Reuters] BREAKING: Mars rover finds water
  [TV:CNN] LIVE TICKER: Mars rover finds water
  [TV:BBC] LIVE TICKER: Mars rover finds water
  [Print:NY Times] Front page: Mars rover finds water | NASA confirms the Perseverance rover has detect...
  [Bot:Twitter] Posted: BREAKING: Mars rover finds water #news #breaking
[Reuters] Subscriber removed. Total: 3

[Reuters] BREAKING: Tech stocks rally 5%
  [TV:CNN] LIVE TICKER: Tech stocks rally 5%
  [Print:NY Times] Front page: Tech stocks rally 5% | Major technology stocks see sharp gains in after...
  [Bot:Twitter] Posted: BREAKING: Tech stocks rally 5% #news #breaking
```

---

## Push vs Pull Model

The Observer pattern has two notification strategies:

### Push Model

The subject **pushes** all relevant data directly through the `update()` call.

```java
// Push: Subject sends data in the notification
public interface Observer {
    void update(String symbol, double price);  // data is pushed
}

// In Subject:
void notifyObservers() {
    for (Observer o : observers) {
        o.update(lastUpdatedSymbol, prices.get(lastUpdatedSymbol));
    }
}
```

**Pros:**
- Observer gets everything it needs immediately
- No back-call to the subject required
- Subject controls what data is shared

**Cons:**
- Observer may receive data it does not need (waste)
- Changing the pushed data requires changing the Observer interface (all observers affected)

### Pull Model

The subject sends a minimal notification (often just itself as a reference). The observer **pulls** the data it needs by calling getters on the subject.

```java
// Pull: Observer queries the subject after notification
public interface Observer {
    void update(Subject subject);  // only a reference is pushed
}

// In Observer implementation:
@Override
public void update(Subject subject) {
    // Pull only the data this observer cares about
    StockExchange exchange = (StockExchange) subject;
    double price = exchange.getPrice("GOOG");
    System.out.println("Price: " + price);
}
```

**Pros:**
- Observer pulls only what it needs -- efficient when subjects have lots of state
- Adding new data to the subject does not require changing the Observer interface

**Cons:**
- Tighter coupling: observer must know the concrete subject type (or its API) to pull data
- Extra method calls back to the subject
- Risk of inconsistent state if subject changes between notify and pull

### Comparison Table

| Aspect | Push Model | Pull Model |
|--------|-----------|-----------|
| **Data in update()** | All relevant data passed as parameters | Only subject reference (or event type) |
| **Observer coupling** | Coupled to the update signature | Coupled to the subject's getter API |
| **Efficiency** | May push unneeded data | Observer fetches only what it needs |
| **Interface stability** | Changes when pushed data changes | Stable -- only getters change |
| **Our examples** | Stock tracker (symbol + price pushed) | java.util.Observer (Observable passed) |

**Exam recommendation:** Use the **push model** unless the subject has many fields and different observers need different subsets of data. The push model keeps observers simpler and avoids the cast in pull.

---

## ConcurrentModificationException Trap

This is a **classic exam and interview pitfall**. If an observer unregisters itself (or another observer) inside `update()`, and you iterate directly over the observers list, you get a `ConcurrentModificationException`.

### BAD: Direct Iteration

```java
// BAD: modifying the list while iterating
@Override
public void notifyObservers() {
    for (Observer observer : observers) {  // iterating original list
        observer.update(data);
        // If observer calls unregister(this) inside update()...
        // ConcurrentModificationException!
    }
}
```

### GOOD: Snapshot Copy

```java
// GOOD: iterate over a defensive copy
@Override
public void notifyObservers() {
    List<Observer> snapshot = new ArrayList<>(observers);  // copy
    for (Observer observer : snapshot) {
        observer.update(data);
        // Safe: even if observer unregisters, we're iterating the copy
    }
}
```

### GOOD: CopyOnWriteArrayList (Thread-Safe)

```java
// GOOD: thread-safe alternative for concurrent access
private final List<Observer> observers = new CopyOnWriteArrayList<>();

@Override
public void notifyObservers() {
    for (Observer observer : observers) {
        observer.update(data);  // safe -- CopyOnWriteArrayList handles it
    }
}
```

**Exam tip:** Always mention the snapshot/copy approach when discussing Observer. It shows you understand the pattern's real-world pitfalls.

---

## Java Built-in Observer (Deprecated)

Java had `java.util.Observable` (class) and `java.util.Observer` (interface) since JDK 1.0. They were **deprecated in Java 9** but you should know they exist for exam purposes.

**Why deprecated:**
- `Observable` is a **class**, not an interface -- forces single inheritance, cannot extend another class
- No generics support -- `update(Observable o, Object arg)` requires ugly casts
- Thread safety issues -- `setChanged()` / `notifyObservers()` is not atomic
- Notification order is unspecified

**Modern alternatives:**
- `java.beans.PropertyChangeSupport` / `PropertyChangeListener`
- Reactive libraries: RxJava, Project Reactor
- `java.util.concurrent.Flow` (JDK 9+) -- reactive streams
- Or simply: implement your own Observer interface (as shown above)

---

## SOLID Connection

| Principle | How Observer Relates |
|-----------|---------------------|
| **SRP** | Subject manages state + observer list. Each observer handles its own reaction logic. Notification concern is separated from business logic. |
| **OCP** | New observer types can be added WITHOUT modifying the subject. Just implement `Observer` and call `register()`. |
| **LSP** | All concrete observers are substitutable through the `Observer` interface. The subject treats them uniformly. |
| **ISP** | The `Observer` interface is minimal -- typically one `update()` method. Observers are not forced to implement methods they don't need. |
| **DIP** | Subject depends on the `Observer` abstraction, not on `MobileApp`, `WebDashboard`, or `EmailAlert` directly. High-level module (subject) depends on abstraction. |

---

## Observer vs Related Patterns

| Aspect | Observer | Mediator | Event Bus | Pub-Sub (Messaging) |
|--------|----------|----------|-----------|---------------------|
| **Coupling** | Subject knows observers exist (holds list) | Colleagues know only the mediator | Publishers and subscribers know only the bus | Publishers and subscribers are fully decoupled via broker |
| **Direction** | One-to-many (subject to observers) | Many-to-many (via central mediator) | Many-to-many (via central bus) | Many-to-many (via message broker) |
| **Registration** | Observers register with the subject directly | Colleagues register with the mediator | Handlers register by event type on the bus | Subscribers subscribe to topics/channels on the broker |
| **Scope** | In-process, same JVM | In-process, same JVM | In-process (usually) | Cross-process, distributed |
| **Subject awareness** | Subject knows it has observers | Mediator orchestrates interactions | Publisher fires events, unaware of handlers | Publisher sends messages, fully unaware of subscribers |
| **Use case** | UI data binding, stock tickers | Chat room, air traffic control | GUI frameworks, Spring ApplicationEvent | Kafka, RabbitMQ, cloud messaging |
| **Pattern type** | Behavioral (GoF) | Behavioral (GoF) | Architectural variation of Observer | Architectural / Integration pattern |

**Key distinction:** Observer is a direct one-to-many relationship (subject holds observer references). Pub-Sub adds an intermediary (broker/bus) so publishers and subscribers never reference each other.

---

## When to Use Observer

- A change in one object must trigger updates in multiple other objects
- The set of dependents is **not known at compile time** or changes at runtime
- You want **loose coupling** between the source of events and the consumers
- You are building event-driven systems, reactive UIs, or notification pipelines

## When NOT to Use Observer

- **Only one consumer** -- direct method call is simpler; Observer adds unnecessary indirection
- **Guaranteed delivery required** -- Observer does not guarantee delivery (e.g., if an observer throws an exception, subsequent observers may not be notified unless you handle it)
- **Complex event filtering** -- if observers need to filter by event type/topic, a full Event Bus or Pub-Sub system is more appropriate
- **Circular dependencies** -- if A observes B and B observes A, you risk infinite notification loops
- **Order-sensitive reactions** -- Observer does not guarantee notification order (unless you enforce it explicitly)
- **Performance-critical hot paths** -- notifying 1000 observers synchronously on every state change can be a bottleneck; consider async or batched approaches

---

## Big Picture

- Observer is a **Behavioral** pattern that establishes a **one-to-many dependency**
- The subject (publisher) maintains a list of observers (subscribers) and notifies them on state change
- **Loose coupling** is the core benefit: the subject depends on the `Observer` abstraction, not concrete types
- The **register/unregister/notify** lifecycle enables dynamic, runtime-configurable subscriptions
- **Push model** sends data in the notification; **Pull model** lets observers query the subject
- Always use a **snapshot copy** when iterating observers to avoid `ConcurrentModificationException`
- Java's built-in `java.util.Observable` is deprecated since Java 9 -- roll your own or use modern alternatives
- Observer is the foundation for reactive programming, event-driven architectures, and the Pub-Sub pattern

---

## Exam Tips (Quick Recall)

1. Observer = **one-to-many dependency** where subject notifies all registered observers on state change
2. Subject holds a **list of Observer references** (the abstraction, not concrete types) -- this is the loose coupling
3. The **register/unregister/notify** trio is the lifecycle: observers opt in and out dynamically
4. **Push model:** subject sends data in `update(data)`. **Pull model:** subject sends itself in `update(subject)`, observer calls getters
5. **ConcurrentModificationException:** if an observer unregisters during notification, iterate over a **snapshot copy** of the list
6. `java.util.Observable` is **deprecated since Java 9** because it's a class (not interface), lacks generics, and has thread-safety issues
7. Observer vs Pub-Sub: Observer is **direct** (subject holds observer references). Pub-Sub has an **intermediary broker** so publisher and subscriber never reference each other

---

## Viva Questions

**Q1: What is the Observer pattern?**
It is a behavioral design pattern that defines a one-to-many dependency between objects. When the subject (observable) changes state, all registered observers are notified and updated automatically. The subject does not know the concrete types of its observers -- it only knows they implement the Observer interface.

**Q2: What problem does Observer solve?**
It eliminates two bad alternatives: (1) polling, where consumers waste CPU checking for changes that may not have happened, and (2) tight coupling, where the subject directly calls specific consumer methods, violating OCP and DIP. Observer provides a loosely coupled, event-driven notification mechanism.

**Q3: What are the four roles in Observer?**
- **Subject (Observable):** Declares the interface for managing observers (register, unregister, notify)
- **ConcreteSubject:** Stores state and calls notifyObservers() when state changes
- **Observer:** Declares the update interface that subjects call
- **ConcreteObserver:** Implements the update method to react to the subject's state change

**Q4: Explain push vs pull model in Observer.**
In the **push model**, the subject sends all relevant data as parameters in the update() call (e.g., `update(symbol, price)`). The observer gets everything immediately but may receive unneeded data. In the **pull model**, the subject sends only a reference to itself (e.g., `update(subject)`), and the observer calls getters to pull the specific data it needs. Pull is more flexible but couples the observer to the subject's API.

**Q5: What is the ConcurrentModificationException trap in Observer?**
If an observer calls `unregister()` on the subject inside its `update()` method, and the subject is iterating over the original observers list using a for-each loop, Java throws a ConcurrentModificationException because the list is modified during iteration. The fix is to iterate over a **defensive copy** (`new ArrayList<>(observers)`) or use a `CopyOnWriteArrayList`.

**Q6: Why was java.util.Observable deprecated?**
Three reasons: (1) `Observable` is a class, not an interface, so it forces single inheritance and you cannot make an existing class observable without restructuring its hierarchy. (2) No generics support -- `update(Observable, Object)` requires unsafe casts. (3) Thread-safety issues -- `setChanged()` and `notifyObservers()` are not atomic, leading to race conditions in multi-threaded code.

**Q7: How does Observer support OCP?**
Adding a new observer type (e.g., `SMSAlert`) requires ZERO changes to the subject. You simply create a new class implementing the Observer interface and register it. The subject's code remains untouched -- open for extension (new observers), closed for modification.

**Q8: How is Observer different from Mediator?**
Observer establishes a one-to-many relationship: one subject notifies many observers. The subject knows it has observers. Mediator establishes many-to-many communication: multiple colleagues interact through a central mediator, and no colleague knows about the others. Observer is unidirectional (subject to observers); Mediator is bidirectional (any colleague can trigger actions on others via the mediator).

**Q9: Can an observer observe multiple subjects?**
Yes. An observer can register with multiple subjects. In that case, the update() method typically needs to identify which subject sent the notification -- either by receiving the subject reference as a parameter (pull model) or by including an identifier in the pushed data.

**Q10: What are the risks of circular observation?**
If object A observes B and object B observes A, a state change in A notifies B, which may change its own state and notify A, which notifies B again -- creating an infinite loop. Solutions include: (1) a `notifying` flag that prevents re-entrant notification, (2) breaking the cycle by using an intermediary (Mediator/Event Bus), or (3) deferring notifications and batching them.

---

## MCQ Quiz

**1. Observer pattern is classified as:**
a) Creational
b) Structural
c) Behavioral
d) Concurrency

<details><summary>Answer</summary>c) Behavioral</details>

**2. The primary intent of Observer is to:**
a) Create objects by cloning
b) Define a one-to-many dependency so dependents are notified on state change
c) Convert an incompatible interface
d) Add behavior by wrapping

<details><summary>Answer</summary>b) Define a one-to-many dependency so dependents are notified on state change</details>

**3. In Observer, the "Subject" is:**
a) The object that reacts to changes
b) The object that maintains state and notifies observers when it changes
c) The interface that defines update()
d) The client that creates observers

<details><summary>Answer</summary>b) The object that maintains state and notifies observers when it changes</details>

**4. Which method is NOT part of the Subject's standard interface?**
a) register(Observer)
b) unregister(Observer)
c) notifyObservers()
d) update(data)

<details><summary>Answer</summary>d) update(data) belongs to the Observer interface, not the Subject</details>

**5. In the push model, the update() method receives:**
a) Only a reference to the subject
b) All relevant data as parameters
c) Nothing
d) A callback function

<details><summary>Answer</summary>b) All relevant data as parameters -- the subject pushes data to the observer</details>

**6. In the pull model, the observer:**
a) Receives all data directly
b) Receives a reference to the subject and calls getters to pull needed data
c) Polls the subject on a timer
d) Never receives any data

<details><summary>Answer</summary>b) Receives a reference to the subject and calls getters to pull only the data it needs</details>

**7. What happens if an observer calls unregister() during notification without a defensive copy?**
a) Nothing, it works fine
b) The observer is silently skipped
c) ConcurrentModificationException is thrown
d) NullPointerException is thrown

<details><summary>Answer</summary>c) ConcurrentModificationException -- modifying a list while iterating over it with for-each</details>

**8. Which is the correct fix for the ConcurrentModificationException in Observer?**
a) Use a synchronized block
b) Iterate over a snapshot copy: new ArrayList<>(observers)
c) Catch and ignore the exception
d) Use a LinkedList instead of ArrayList

<details><summary>Answer</summary>b) Iterate over a snapshot copy. A CopyOnWriteArrayList also works for concurrent scenarios.</details>

**9. Why was java.util.Observable deprecated in Java 9?**
a) It was too fast
b) It is a class (not interface), lacks generics, and has thread-safety issues
c) It was never part of the JDK
d) It uses too much memory

<details><summary>Answer</summary>b) Being a class forces single inheritance, no generics means unsafe casts, and setChanged()/notifyObservers() is not atomic</details>

**10. Which SOLID principle does Observer MOST directly support?**
a) SRP
b) OCP -- new observers can be added without modifying the subject
c) LSP
d) ISP

<details><summary>Answer</summary>b) OCP -- adding a new observer requires zero changes to the subject class</details>

**11. How is Observer different from Pub-Sub?**
a) They are identical
b) Observer is direct (subject holds observer references); Pub-Sub uses an intermediary broker
c) Pub-Sub is synchronous; Observer is asynchronous
d) Observer works across processes; Pub-Sub is in-process only

<details><summary>Answer</summary>b) Observer is a direct one-to-many relationship. Pub-Sub decouples publishers and subscribers through a broker/bus.</details>

**12. In the stock price example, what type does StockExchange depend on?**
a) MobileApp
b) WebDashboard
c) Observer (the interface)
d) EmailAlert

<details><summary>Answer</summary>c) Observer -- the subject depends only on the abstraction, not concrete types (DIP)</details>

**13. What is the main disadvantage of the push model?**
a) Observer cannot get any data
b) Observer may receive data it does not need
c) Observer must know the subject's concrete type
d) It is slower than polling

<details><summary>Answer</summary>b) The subject pushes all data, but some observers may not need all of it</details>

**14. What is the main disadvantage of the pull model?**
a) Observer gets too much data
b) Observer must know the subject's API to call getters, creating tighter coupling
c) It does not work in Java
d) The subject cannot store state

<details><summary>Answer</summary>b) The observer needs to know the subject's concrete type or API to pull data, which increases coupling</details>

**15. An observer can observe:**
a) Exactly one subject
b) Multiple subjects
c) Only subjects of the same type
d) Only itself

<details><summary>Answer</summary>b) Multiple subjects -- an observer can register with any number of subjects</details>

**16. What risk arises when A observes B and B observes A?**
a) Compilation error
b) Infinite notification loop
c) Memory leak only
d) No risk at all

<details><summary>Answer</summary>b) Infinite notification loop -- A notifies B, which changes state and notifies A, which notifies B, and so on</details>

**17. Which is NOT a valid use case for Observer?**
a) Stock price ticker
b) Event-driven UI updates
c) Sorting a list with different algorithms
d) News feed subscription

<details><summary>Answer</summary>c) Sorting with different algorithms is the Strategy pattern, not Observer</details>

**18. In Observer, "loose coupling" means:**
a) The subject knows the concrete type of each observer
b) The subject only knows observers through the Observer interface
c) Observers directly modify the subject's state
d) The subject and observers share the same class hierarchy

<details><summary>Answer</summary>b) The subject depends on the Observer abstraction, not concrete types</details>

**19. Which Java class is a thread-safe alternative for the observers list?**
a) LinkedList
b) Vector
c) CopyOnWriteArrayList
d) TreeSet

<details><summary>Answer</summary>c) CopyOnWriteArrayList -- it creates a copy of the internal array on every write, making iteration safe during concurrent modification</details>

**20. When should you NOT use the Observer pattern?**
a) When there are many observers that change at runtime
b) When only one consumer exists and will never change
c) When you need event-driven updates
d) When building a reactive UI

<details><summary>Answer</summary>b) When there is only one fixed consumer, a direct method call is simpler -- Observer adds unnecessary indirection</details>

### Self-Scoring Table

| Score | Level | Action |
|-------|-------|--------|
| **18-20** | Observer mastered | You're exam-ready |
| **14-17** | Good foundation | Review push vs pull and ConcurrentModificationException trap |
| **10-13** | Needs work | Revisit the roles, lifecycle, and SOLID connections |
| **Below 10** | Start over | Re-read from "The Problem" section |

---

## Coding Exam Questions

### Problem 1: Implement a Weather Station

Design a weather monitoring system using Observer:
- `WeatherStation` (subject) tracks temperature, humidity, and pressure
- `PhoneDisplay`, `WindowDisplay`, `Logger` (observers) react to weather changes
- Support register, unregister, and notify
- Use the push model
- Handle the ConcurrentModificationException trap correctly

```java
// Starter code
class WeatherStation {
    private double temperature;
    private double humidity;
    private double pressure;
    // TODO: implement Subject behavior
}
```

<details><summary>Solution</summary>

```java
import java.util.ArrayList;
import java.util.List;

// Observer interface
interface WeatherObserver {
    void onWeatherUpdate(double temperature, double humidity, double pressure);
}

// Subject interface
interface WeatherSubject {
    void register(WeatherObserver o);
    void unregister(WeatherObserver o);
    void notifyObservers();
}

// Concrete Subject
class WeatherStation implements WeatherSubject {
    private final List<WeatherObserver> observers = new ArrayList<>();
    private double temperature;
    private double humidity;
    private double pressure;

    @Override
    public void register(WeatherObserver o) {
        if (!observers.contains(o)) observers.add(o);
    }

    @Override
    public void unregister(WeatherObserver o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        // Defensive copy to avoid ConcurrentModificationException
        for (WeatherObserver o : new ArrayList<>(observers)) {
            o.onWeatherUpdate(temperature, humidity, pressure);
        }
    }

    public void setMeasurements(double temp, double humidity, double pressure) {
        this.temperature = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers();
    }
}

// Concrete Observers
class PhoneDisplay implements WeatherObserver {
    @Override
    public void onWeatherUpdate(double temp, double humidity, double pressure) {
        System.out.printf("[Phone] Temp: %.1fC | Humidity: %.1f%%%n", temp, humidity);
    }
}

class WindowDisplay implements WeatherObserver {
    @Override
    public void onWeatherUpdate(double temp, double humidity, double pressure) {
        System.out.printf("[Window] Forecast: %s%n",
            pressure > 1013 ? "Sunny" : "Rainy");
    }
}

class Logger implements WeatherObserver {
    @Override
    public void onWeatherUpdate(double temp, double humidity, double pressure) {
        System.out.printf("[Log] T=%.1f H=%.1f P=%.1f%n", temp, humidity, pressure);
    }
}

// Demo
public class WeatherDemo {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();

        PhoneDisplay phone = new PhoneDisplay();
        WindowDisplay window = new WindowDisplay();
        Logger logger = new Logger();

        station.register(phone);
        station.register(window);
        station.register(logger);

        station.setMeasurements(25.0, 65.0, 1015.0);
        // Output:
        // [Phone] Temp: 25.0C | Humidity: 65.0%
        // [Window] Forecast: Sunny
        // [Log] T=25.0 H=65.0 P=1015.0

        station.unregister(window);
        station.setMeasurements(18.0, 80.0, 1005.0);
        // Output:
        // [Phone] Temp: 18.0C | Humidity: 80.0%
        // [Log] T=18.0 H=80.0 P=1005.0
    }
}
```
</details>

---

### Problem 2: Observer with Self-Unregistration

An observer wants to unregister itself after receiving 3 notifications. Implement this without causing a ConcurrentModificationException.

```java
// Starter: this observer should auto-unregister after 3 updates
class LimitedObserver implements Observer {
    private int count = 0;
    private Subject subject;

    LimitedObserver(Subject subject) {
        this.subject = subject;
        subject.register(this);
    }

    @Override
    public void update(String data) {
        count++;
        System.out.println("Received (" + count + "): " + data);
        if (count >= 3) {
            subject.unregister(this);  // DANGER: are we safe?
            System.out.println("Auto-unregistered after 3 notifications.");
        }
    }
}
```

<details><summary>Solution</summary>

```java
import java.util.ArrayList;
import java.util.List;

// Observer interface
interface Observer {
    void update(String data);
}

// Subject interface
interface Subject {
    void register(Observer o);
    void unregister(Observer o);
    void notifyObservers(String data);
}

// Concrete Subject -- SAFE implementation
class EventSource implements Subject {
    private final List<Observer> observers = new ArrayList<>();

    @Override
    public void register(Observer o) {
        if (!observers.contains(o)) observers.add(o);
    }

    @Override
    public void unregister(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers(String data) {
        // KEY: snapshot copy makes self-unregistration safe
        List<Observer> snapshot = new ArrayList<>(observers);
        for (Observer o : snapshot) {
            o.update(data);
            // Even if o calls unregister(o) inside update(),
            // we are iterating 'snapshot', not 'observers'.
            // The original 'observers' list is safely modified.
        }
    }

    public void emit(String data) {
        System.out.println("--- Event: " + data + " ---");
        notifyObservers(data);
    }
}

// Self-unregistering observer
class LimitedObserver implements Observer {
    private final String name;
    private final Subject subject;
    private final int maxNotifications;
    private int count = 0;

    LimitedObserver(String name, Subject subject, int maxNotifications) {
        this.name = name;
        this.subject = subject;
        this.maxNotifications = maxNotifications;
        subject.register(this);
    }

    @Override
    public void update(String data) {
        count++;
        System.out.println("  [" + name + "] Received (" + count + "/" + maxNotifications + "): " + data);
        if (count >= maxNotifications) {
            subject.unregister(this);  // SAFE: subject uses snapshot in notifyObservers
            System.out.println("  [" + name + "] Auto-unregistered.");
        }
    }
}

// Permanent observer for comparison
class PermanentObserver implements Observer {
    private final String name;
    PermanentObserver(String name) { this.name = name; }

    @Override
    public void update(String data) {
        System.out.println("  [" + name + "] Received: " + data);
    }
}

// Demo
public class SelfUnregisterDemo {
    public static void main(String[] args) {
        EventSource source = new EventSource();

        new LimitedObserver("TempSub", source, 3);    // unregisters after 3
        PermanentObserver perm = new PermanentObserver("PermSub");
        source.register(perm);

        source.emit("Event-A");  // both receive
        source.emit("Event-B");  // both receive
        source.emit("Event-C");  // both receive, TempSub auto-unregisters
        source.emit("Event-D");  // only PermSub receives
        source.emit("Event-E");  // only PermSub receives
    }
}
```

**Key takeaway:** The snapshot copy in `notifyObservers()` is what makes self-unregistration safe. Without it, `unregister()` modifies the list during iteration, causing `ConcurrentModificationException`.
</details>

---

### Problem 3: Convert Pull Model to Push Model

The following code uses the pull model. Refactor it to use the push model. Explain the trade-offs.

```java
// PULL MODEL -- refactor to PUSH
interface PullObserver {
    void update(PullSubject subject);
}

class InventorySystem implements PullSubject {
    private final List<PullObserver> observers = new ArrayList<>();
    private String productName;
    private int quantity;
    private double price;

    // ... register, unregister, notify ...

    void notifyObservers() {
        for (PullObserver o : new ArrayList<>(observers)) {
            o.update(this);  // PULL: only sends 'this'
        }
    }

    // Getters for observers to pull data
    public String getProductName() { return productName; }
    public int getQuantity() { return quantity; }
    public double getPrice() { return price; }
}

class QuantityDisplay implements PullObserver {
    @Override
    public void update(PullSubject subject) {
        InventorySystem inv = (InventorySystem) subject;  // UGLY CAST
        System.out.println("Qty of " + inv.getProductName()
            + ": " + inv.getQuantity());
    }
}

class PriceDisplay implements PullObserver {
    @Override
    public void update(PullSubject subject) {
        InventorySystem inv = (InventorySystem) subject;  // UGLY CAST
        System.out.println("Price of " + inv.getProductName()
            + ": $" + inv.getPrice());
    }
}
```

<details><summary>Solution</summary>

```java
import java.util.ArrayList;
import java.util.List;

// PUSH MODEL: data is sent directly in the update call

// Immutable data object carrying the pushed state
class InventoryUpdate {
    private final String productName;
    private final int quantity;
    private final double price;

    InventoryUpdate(String productName, int quantity, double price) {
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    public String getProductName() { return productName; }
    public int getQuantity() { return quantity; }
    public double getPrice() { return price; }
}

// Push Observer -- receives data, no need to query subject
interface InventoryObserver {
    void onInventoryUpdate(InventoryUpdate update);
}

// Subject interface
interface InventorySubject {
    void register(InventoryObserver o);
    void unregister(InventoryObserver o);
    void notifyObservers();
}

// Concrete Subject
class InventorySystem implements InventorySubject {
    private final List<InventoryObserver> observers = new ArrayList<>();
    private String productName;
    private int quantity;
    private double price;

    @Override
    public void register(InventoryObserver o) {
        if (!observers.contains(o)) observers.add(o);
    }

    @Override
    public void unregister(InventoryObserver o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        // PUSH: create an immutable snapshot of the state
        InventoryUpdate update = new InventoryUpdate(productName, quantity, price);
        for (InventoryObserver o : new ArrayList<>(observers)) {
            o.onInventoryUpdate(update);  // data pushed -- no cast needed
        }
    }

    public void updateProduct(String name, int qty, double price) {
        this.productName = name;
        this.quantity = qty;
        this.price = price;
        notifyObservers();
    }
}

// Concrete Observers -- no casting, no subject dependency
class QuantityDisplay implements InventoryObserver {
    @Override
    public void onInventoryUpdate(InventoryUpdate update) {
        System.out.println("Qty of " + update.getProductName()
            + ": " + update.getQuantity());
    }
}

class PriceDisplay implements InventoryObserver {
    @Override
    public void onInventoryUpdate(InventoryUpdate update) {
        System.out.println("Price of " + update.getProductName()
            + ": $" + update.getPrice());
    }
}

// Demo
public class PushModelDemo {
    public static void main(String[] args) {
        InventorySystem inventory = new InventorySystem();
        inventory.register(new QuantityDisplay());
        inventory.register(new PriceDisplay());

        inventory.updateProduct("Laptop", 50, 999.99);
        // Output:
        // Qty of Laptop: 50
        // Price of Laptop: $999.99

        inventory.updateProduct("Laptop", 45, 949.99);
        // Output:
        // Qty of Laptop: 45
        // Price of Laptop: $949.99
    }
}
```

**Trade-offs of the refactoring:**

| Aspect | Pull Model (Before) | Push Model (After) |
|--------|--------------------|--------------------|
| **Casting** | Observers must cast subject to concrete type | No casting -- data is typed in InventoryUpdate |
| **Coupling** | Observers coupled to subject's getter API | Observers coupled only to InventoryUpdate DTO |
| **Data efficiency** | Observers pull only what they need | All data is pushed, even if unused |
| **Consistency** | Risk of inconsistent reads if subject changes between pulls | InventoryUpdate is an immutable snapshot -- always consistent |
| **Interface stability** | Adding new fields = new getters (Observer interface stable) | Adding new fields = changing InventoryUpdate (may require Observer changes) |

**Best practice shown:** Using an immutable data transfer object (`InventoryUpdate`) for the push model eliminates casting, ensures consistency, and makes the notification payload explicit.
</details>
