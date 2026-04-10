# UML Diagrams -- LLD Study Notes

---

## Table of Contents

1. [What is UML and Why It Matters](#1-what-is-uml-and-why-it-matters)
2. [Class Diagrams (MAIN FOCUS)](#2-class-diagrams-main-focus)
3. [Sequence Diagrams (Brief)](#3-sequence-diagrams-brief)
4. [Relationship Comparison Table](#4-relationship-comparison-table)
5. [Java Code to Class Diagram (and Vice Versa)](#5-java-code-to-class-diagram-and-vice-versa)
6. [Exam Tips](#6-exam-tips)
7. [Viva Questions](#7-viva-questions)
8. [MCQ Quiz](#8-mcq-quiz)

---

## 1. What is UML and Why It Matters

### The Problem

You are building a Parking Lot system with 5 developers. You describe the design in English:

> "There is a ParkingLot that has multiple floors. Each floor has spots. Spots can be different types. Vehicles park in spots..."

Developer A thinks a `ParkingFloor` owns `Spot` objects (composition). Developer B thinks `Spot` exists independently (aggregation). Developer C creates a `Vehicle` class with no inheritance. Nobody agrees. The codebase becomes a mess.

**The bad way:** describe designs in plain English, leaving room for interpretation.

**The good way:** use UML -- a standardized visual language that removes ambiguity.

### Definition

- **UML** = Unified Modeling Language
- A **standardized notation** for visualizing the design of a system
- Created by Grady Booch, Ivar Jacobson, James Rumbaugh (the "Three Amigos") in the 1990s
- Maintained by the **OMG** (Object Management Group)

### Types of UML Diagrams

| Category | Diagram | What It Models |
|---|---|---|
| **Structural (Static)** | Class Diagram | Classes, attributes, methods, relationships |
| | Object Diagram | Instances of classes at a point in time |
| | Component Diagram | High-level components and dependencies |
| | Package Diagram | Grouping of classes into packages |
| **Behavioral (Dynamic)** | Sequence Diagram | Object interactions over time |
| | Activity Diagram | Workflow / control flow (like flowcharts) |
| | State Machine Diagram | States and transitions of an object |
| | Use Case Diagram | Actor-system interactions |

**For LLD exams, Class Diagrams are the most frequently tested. Sequence Diagrams come second.**

---

## 2. Class Diagrams (MAIN FOCUS)

A class diagram shows the **static structure** of a system: what classes exist, what they contain, and how they relate to each other.

### 2.1 The Class Box

Every class is drawn as a box divided into three compartments:

```
+---------------------------+
|       ClassName           |   <-- Name compartment
|---------------------------|
| - name: String            |   <-- Attributes compartment
| - age: int                |
| # id: long                |
|---------------------------|
| + getName(): String       |   <-- Methods compartment
| + setName(n: String): void|
| - validate(): boolean     |
+---------------------------+
```

### 2.2 Visibility Modifiers

| Symbol | Modifier | Meaning |
|---|---|---|
| **+** | public | Accessible from anywhere |
| **-** | private | Accessible only within the class |
| **#** | protected | Accessible within the class and subclasses |
| **~** | package-private | Accessible within the same package (Java default) |

**Exam trap:** Students often confuse `#` (protected) with `~` (package). Remember: **# = protected = subclasses allowed**.

### 2.3 Attribute and Method Notation

**Attributes:**
```
visibility name : type [multiplicity] = defaultValue
```
Examples:
- `- name : String`
- `- age : int = 0`
- `- courses : List<Course> [0..*]`

**Methods:**
```
visibility name(paramName: paramType, ...) : returnType
```
Examples:
- `+ getName() : String`
- `+ setAge(age: int) : void`
- `- calculateGPA(courses: List<Course>) : double`

**Static members** are shown with an underline:
- `- count : int` (underlined in actual UML; in text we write `{static}`)
- `+ getInstance() : Singleton {static}`

**Abstract methods** are shown in italics (or tagged `{abstract}`):
- `+ sound() : void {abstract}`

### 2.4 Abstract Classes and Interfaces

**Abstract Class** -- uses `<<abstract>>` or italicized name:

```
+---------------------------+
|    <<abstract>>           |
|       Shape               |
|---------------------------|
| - color: String           |
|---------------------------|
| + area(): double {abstract}|
| + getColor(): String      |
+---------------------------+
```

**Interface** -- uses `<<interface>>`:

```
+---------------------------+
|    <<interface>>          |
|      Flyable              |
|---------------------------|
|                           |
|---------------------------|
| + fly(): void             |
| + land(): void            |
+---------------------------+
```

**Key difference for exams:**
- Abstract class: can have state (attributes) and concrete methods
- Interface: traditionally no state, only method signatures (Java 8+ allows default methods, but UML convention stays the same)

---

### 2.5 Relationships -- The Core of Class Diagrams

This is the **most tested section** in LLD exams. Master every relationship.

---

#### 2.5.1 Association (uses / has-a, loosely)

- **Notation:** solid line
- **Meaning:** one class knows about and uses another
- **Lifetime:** independent -- both can exist on their own
- **Example:** A `Student` is associated with a `Course`

```
+------------------+                    +------------------+
|    Student       | enrolledIn         |     Course       |
|------------------|--------------------+------------------|
| - name: String   |          0..*      | - title: String  |
| - rollNo: int    |                    | - code: String   |
|------------------|                    |------------------|
| + enroll(): void |                    | + getTitle(): S  |
+------------------+                    +------------------+
```

Java code:
```java
class Student {
    private String name;
    private List<Course> enrolledIn; // Association
}
```

**A Student "knows about" Courses. Deleting a Student does NOT delete the Course.**

---

#### 2.5.2 Aggregation (has-a, part-of, can exist independently)

- **Notation:** solid line with an **empty (hollow) diamond** on the "whole" side
- **Meaning:** "whole-part" relationship, but the part CAN exist without the whole
- **Example:** A `Department` has `Employee`s, but employees can exist without the department

```
+------------------+                     +------------------+
|   Department     |  has                |    Employee      |
|------------------| <>------------------+------------------|
| - name: String   |           1..*     | - name: String   |
|------------------|                     | - empId: int     |
| + addEmp(): void |                     |------------------|
+------------------+                     | + work(): void   |
                                         +------------------+

<> = empty diamond (on Department side)
```

Java code:
```java
class Department {
    private String name;
    private List<Employee> employees; // Aggregation -- employees exist independently
}
```

**If the Department is dissolved, the Employees still exist (they can move to another department).**

---

#### 2.5.3 Composition (has-a, part-of, CANNOT exist independently)

- **Notation:** solid line with a **filled (solid) diamond** on the "whole" side
- **Meaning:** strong "whole-part" relationship -- the part CANNOT exist without the whole
- **Example:** A `House` is composed of `Room`s. Destroy the house, the rooms are gone.

```
+------------------+                     +------------------+
|     House        |  contains           |      Room        |
|------------------|*<>------------------+------------------|
| - address: String|           1..*     | - name: String   |
|------------------|                     | - area: double   |
|------------------|                     |------------------|
| + getRooms(): L  |                     | + getArea(): d   |
+------------------+                     +------------------+

*<> = filled diamond (on House side)
```

Java code:
```java
class House {
    private List<Room> rooms; // Composition -- rooms created inside House

    public House() {
        rooms = new ArrayList<>();
        rooms.add(new Room("Kitchen", 120));  // House creates its own Rooms
        rooms.add(new Room("Bedroom", 150));
    }
}
// Room objects are created by House and die with House
```

**Key code indicator for composition:** the "whole" class creates the "part" objects internally (often in the constructor).

---

#### 2.5.4 Inheritance / Generalization (is-a)

- **Notation:** solid line with a **hollow (empty) triangle arrowhead** pointing to the parent
- **Meaning:** child "is-a" type of parent; inherits attributes and methods
- **Example:** `Dog` is-a `Animal`

```
+------------------+
|     Animal       |
|------------------|
| - name: String   |
| - age: int       |
|------------------|
| + eat(): void    |
| + sound(): void  |
+------------------+
         /\
         ||
         ||
+------------------+
|       Dog        |
|------------------|
| - breed: String  |
|------------------|
| + bark(): void   |
| + sound(): void  |
+------------------+
```

```
/\
||   = hollow triangle arrowhead pointing UP (to parent)
```

Java code:
```java
class Animal {
    private String name;
    private int age;
    public void eat() { }
    public void sound() { }
}

class Dog extends Animal {
    private String breed;
    public void bark() { }
    @Override
    public void sound() { System.out.println("Woof!"); }
}
```

---

#### 2.5.5 Realization / Implementation (implements interface)

- **Notation:** **dashed** line with a **hollow triangle arrowhead** pointing to the interface
- **Meaning:** a class provides concrete implementation of an interface's methods
- **Example:** `Dog` implements `Trainable`

```
+------------------+        +-------------------+
|  <<interface>>   |        |   <<interface>>   |
|    Trainable     |        |     Feedable      |
|------------------|        |-------------------|
| + train(): void  |        | + feed(): void    |
+------------------+        +-------------------+
         /\                          /\
         ::                          ::
         ::                          ::
+----------------------------------------+
|                 Dog                     |
|----------------------------------------|
| - breed: String                        |
|----------------------------------------|
| + train(): void                        |
| + feed(): void                         |
| + bark(): void                         |
+----------------------------------------+
```

```
/\
::   = dashed line with hollow triangle (realization)
```

Java code:
```java
interface Trainable {
    void train();
}
interface Feedable {
    void feed();
}
class Dog implements Trainable, Feedable {
    public void train() { /* ... */ }
    public void feed() { /* ... */ }
}
```

---

#### 2.5.6 Dependency (uses temporarily)

- **Notation:** **dashed arrow** (---->)
- **Meaning:** one class temporarily uses another (e.g., as a method parameter, local variable, or return type) but does NOT store a reference
- **Example:** `OrderService` depends on `EmailService` to send confirmation

```
+--------------------+             +--------------------+
|   OrderService     |             |   EmailService     |
|--------------------|  - - - - -> |--------------------|
| - orders: List     |  <<uses>>   | + send(): void     |
|--------------------|             +--------------------+
| + placeOrder(): v  |
+--------------------+

- - - -> = dashed arrow (dependency)
```

Java code:
```java
class OrderService {
    public void placeOrder(Order order) {
        // EmailService is NOT a field -- just used temporarily
        EmailService emailService = new EmailService();
        emailService.send("Order placed: " + order.getId());
    }
}
```

**Dependency is the WEAKEST relationship.** The using class does not hold a permanent reference.

---

### 2.6 Multiplicity

Multiplicity tells you **how many instances** of one class relate to another.

| Notation | Meaning |
|---|---|
| `1` | Exactly one |
| `0..1` | Zero or one (optional) |
| `*` or `0..*` | Zero or more |
| `1..*` | One or more (at least one) |
| `n` | Exactly n |
| `n..m` | Between n and m |

**Example with multiplicity:**

```
+------------------+  1        0..*  +------------------+
|    Library       |-----------------|      Book        |
|------------------|                 |------------------|
| - name: String   |                 | - title: String  |
+------------------+                 +------------------+

One Library has zero or more Books.
Each Book belongs to exactly one Library.
```

**Common exam question:** "What is the multiplicity between Doctor and Patient?"
Answer: `*` to `*` (many-to-many) -- a Doctor treats many Patients, a Patient sees many Doctors.

---

### 2.7 Complete Class Diagram Example -- Library Management System

```
+-------------------------------+
|    <<interface>>              |
|    Borrowable                 |
|-------------------------------|
| + borrow(member: Member): v  |
| + returnItem(): void         |
+-------------------------------+
              /\
              ::
              ::
+-------------------------------+        +-------------------------------+
|          Book                 |        |        Member                 |
|-------------------------------|        |-------------------------------|
| - isbn: String                |        | - memberId: String            |
| - title: String               |        | - name: String                |
| - author: String              |        | - email: String               |
| - isAvailable: boolean        |        | - borrowedBooks: List<Book>   |
|-------------------------------|        |-------------------------------|
| + borrow(member: Member): v  |        | + borrowBook(b: Book): void   |
| + returnItem(): void         |        | + returnBook(b: Book): void   |
| + getTitle(): String          |        | + getName(): String           |
+-------------------------------+        +-------------------------------+
         |                                          |
         | 0..*                                     | 0..*
         |                                          |
+-------------------------------+                   |
|  1     Library                |                   |
|-------------------------------|                   |
| - name: String                |                   |
| - books: List<Book>           |-------------------+
| - members: List<Member>       |  1         0..*
| - librarian: Librarian        |
|-------------------------------|
| + addBook(b: Book): void     |
| + removeBook(b: Book): void  |
| + registerMember(m): void    |
+-------------------------------+
         *<>
          |  1
          |
+-------------------------------+
|       Librarian               |
|-------------------------------|
| - employeeId: String          |
| - name: String                |
|-------------------------------|
| + issueBook(b,m): void       |
| + collectFine(m): double     |
+-------------------------------+


RELATIONSHIPS:
  Library *<>--- Book        (Composition: Books cannot exist without the Library)
  Library ---- Member        (Association: Members exist independently)
  Library *<>--- Librarian   (Composition: Librarian role tied to this Library)
  Book ..▷ Borrowable        (Realization: Book implements Borrowable)
  Member ---- Book           (Association: Member borrows Books)
```

---

### 2.8 Complete Class Diagram Example -- Parking Lot (Classic LLD Problem)

```
+-----------------------------------+
|    <<enum>>                       |
|    VehicleType                    |
|-----------------------------------|
|  CAR                              |
|  BIKE                             |
|  TRUCK                            |
+-----------------------------------+

+-----------------------------------+
|    <<enum>>                       |
|    SpotType                       |
|-----------------------------------|
|  COMPACT                          |
|  REGULAR                          |
|  LARGE                            |
+-----------------------------------+


+-----------------------------------+
|    <<abstract>>                   |
|    Vehicle                        |
|-----------------------------------|
| - licensePlate: String            |
| - type: VehicleType               |
|-----------------------------------|
| + getType(): VehicleType          |
| + getLicensePlate(): String       |
+-----------------------------------+
         /\
         ||
    +---------+----------+
    |         |          |
+--------+ +--------+ +---------+
|  Car   | |  Bike  | |  Truck  |
+--------+ +--------+ +---------+


+-----------------------------------+        +-----------------------------------+
|         ParkingLot                |        |        ParkingFloor               |
|-----------------------------------|        |-----------------------------------|
| - name: String                    |        | - floorNumber: int                |
| - floors: List<ParkingFloor>      |        | - spots: List<ParkingSpot>        |
| - capacity: int                   |        |-----------------------------------|
|-----------------------------------|        | + getAvailableSpots(): List        |
| + addFloor(f): void              | *<>--->| + isFull(): boolean               |
| + findSpot(v: Vehicle): Spot     |  1..*  +-----------------------------------+
| + getAvailability(): int          |                    |
+-----------------------------------+                    | *<>
                                                         |  1..*
                                              +-----------------------------------+
                                              |        ParkingSpot                |
                                              |-----------------------------------|
                                              | - spotId: String                  |
                                              | - type: SpotType                  |
                                              | - isOccupied: boolean             |
                                              | - vehicle: Vehicle                |
                                              |-----------------------------------|
                                              | + park(v: Vehicle): boolean       |
                                              | + removeVehicle(): Vehicle        |
                                              | + isAvailable(): boolean          |
                                              +-----------------------------------+
                                                         |
                                                         | 0..1 (parked vehicle)
                                                         |
                                              +-----------------------------------+
                                              |    <<abstract>>                   |
                                              |    Vehicle                        |
                                              +-----------------------------------+

RELATIONSHIPS:
  ParkingLot  *<>--- ParkingFloor     (Composition: floors die with the lot)
  ParkingFloor *<>--- ParkingSpot     (Composition: spots die with the floor)
  ParkingSpot ---- Vehicle            (Association: 0..1 vehicle parked)
  Car, Bike, Truck --▷ Vehicle        (Inheritance)
```

---

## 3. Sequence Diagrams (Brief)

A sequence diagram models **dynamic behavior** -- how objects interact over time in a specific scenario.

### Key Elements

| Element | Description |
|---|---|
| **Object/Lifeline** | A vertical dashed line under each participant |
| **Message (solid arrow)** | A synchronous method call from one object to another |
| **Return (dashed arrow)** | The return value back to the caller |
| **Activation bar** | A thin rectangle on the lifeline showing when an object is active |
| **Self-message** | An arrow looping back to the same lifeline |
| **alt / opt / loop** | Fragments for conditionals and loops |

### Example: User Places an Order

```
  User          OrderService       Inventory        PaymentService      EmailService
   |                 |                 |                  |                   |
   | placeOrder(items)|                |                  |                   |
   |---------------->|                 |                  |                   |
   |                 | checkStock(items)|                  |                   |
   |                 |---------------->|                  |                   |
   |                 |   inStock: true |                  |                   |
   |                 |<----------------|                  |                   |
   |                 |                 |                  |                   |
   |                 | processPayment(amount)             |                   |
   |                 |---------------------------------->|                   |
   |                 |              paymentSuccess: true  |                   |
   |                 |<----------------------------------|                   |
   |                 |                 |                  |                   |
   |                 | reserveItems(items)                |                   |
   |                 |---------------->|                  |                   |
   |                 |    reserved: ok |                  |                   |
   |                 |<----------------|                  |                   |
   |                 |                 |                  |                   |
   |                 | sendConfirmation(email)                                |
   |                 |-------------------------------------------------------->|
   |                 |                                           sent: ok      |
   |                 |<--------------------------------------------------------|
   |                 |                 |                  |                   |
   |  orderConfirmed |                 |                  |                   |
   |<----------------|                 |                  |                   |
   |                 |                 |                  |                   |
```

**How to read this:**
1. User calls `placeOrder()` on OrderService
2. OrderService checks stock with Inventory
3. OrderService processes payment via PaymentService
4. OrderService reserves items in Inventory
5. OrderService sends email via EmailService
6. OrderService returns confirmation to User

**Key exam point:** Messages flow left-to-right (calls) and right-to-left (returns). Time flows top-to-bottom.

---

## 4. Relationship Comparison Table

This table is **heavily tested** in MCQs and vivas.

| Property | Association | Aggregation | Composition | Inheritance | Dependency |
|---|---|---|---|---|---|
| **Meaning** | "uses" / "knows about" | "has-a" (weak) | "has-a" (strong) | "is-a" | "uses temporarily" |
| **UML Notation** | Solid line | Solid line + empty diamond | Solid line + filled diamond | Solid line + hollow triangle | Dashed arrow |
| **Part exists without whole?** | Yes | Yes | **No** | N/A | N/A |
| **Ownership** | None / loose | Weak ownership | **Strong ownership** | N/A | None |
| **Lifetime coupling** | Independent | Independent | **Dependent** | Tied by type | None |
| **Java indicator** | Field reference | Field reference (passed in) | Field reference (created inside) | `extends` | Method parameter / local var |
| **Example** | Student --- Course | Department <>--- Employee | House *--- Room | Dog --▷ Animal | OrderService --> EmailService |
| **Strength (weakest to strongest)** | 2 | 3 | 4 | 5 | 1 |

**Mnemonic for strength order:** **D-A-Ag-C-I** = "Developers Always Aggregate Code Intelligently"
- **D**ependency (weakest)
- **A**ssociation
- **Ag**gregation
- **C**omposition
- **I**nheritance (strongest)

---

## 5. Java Code to Class Diagram (and Vice Versa)

### 5.1 Code to Diagram -- Step-by-Step

Given this Java code, draw the class diagram:

```java
interface Playable {
    void play();
    void stop();
}

abstract class MediaItem {
    private String title;
    private int duration;
    
    public String getTitle() { return title; }
    public abstract String getFormat();
}

class Song extends MediaItem implements Playable {
    private String artist;
    private String album;
    
    public void play() { /* ... */ }
    public void stop() { /* ... */ }
    public String getFormat() { return "MP3"; }
    public String getArtist() { return artist; }
}

class Playlist {
    private String name;
    private List<Song> songs;  // Aggregation -- songs exist without playlist
    
    public void addSong(Song s) { songs.add(s); }
    public void removeSong(Song s) { songs.remove(s); }
}
```

**Step 1:** Identify all classes and interfaces.
- Interface: `Playable`
- Abstract class: `MediaItem`
- Concrete classes: `Song`, `Playlist`

**Step 2:** Fill in each class box with attributes and methods.

**Step 3:** Identify relationships.
- `Song extends MediaItem` --> Inheritance (solid line, hollow triangle)
- `Song implements Playable` --> Realization (dashed line, hollow triangle)
- `Playlist` has `List<Song>` as a field, but songs are passed in (not created) --> Aggregation

**Step 4:** Add multiplicity.
- Playlist to Song: `1` to `0..*`

**Result:**

```
+---------------------------+       +---------------------------+
|     <<interface>>         |       |      <<abstract>>         |
|      Playable             |       |       MediaItem           |
|---------------------------|       |---------------------------|
|                           |       | - title: String           |
|---------------------------|       | - duration: int           |
| + play(): void            |       |---------------------------|
| + stop(): void            |       | + getTitle(): String      |
+---------------------------+       | + getFormat(): String {a} |
            /\                      +---------------------------+
            ::                                  /\
            ::                                  ||
            ::                                  ||
+-------------------------------------------------------+
|                     Song                              |
|-------------------------------------------------------|
| - artist: String                                      |
| - album: String                                       |
|-------------------------------------------------------|
| + play(): void                                        |
| + stop(): void                                        |
| + getFormat(): String                                  |
| + getArtist(): String                                  |
+-------------------------------------------------------+
                        0..*  |
                              |
                         <>---|
                              |
                    +-----------------------+
                    |      Playlist         |
                    |-----------------------|
                    | - name: String        |
                    | - songs: List<Song>   |
                    |-----------------------|
                    | + addSong(s): void    |
                    | + removeSong(s): void |
                    +-----------------------+

{a} = abstract method
```

### 5.2 Diagram to Code -- Step-by-Step

Given a class diagram, convert to Java:

**Rules:**
1. `<<interface>>` box --> `interface` keyword
2. `<<abstract>>` box --> `abstract class`
3. Hollow triangle + solid line --> `extends`
4. Hollow triangle + dashed line --> `implements`
5. Filled diamond --> create the part object inside the whole's constructor
6. Empty diamond --> accept the part object via constructor/setter parameter
7. Dashed arrow dependency --> use as method parameter or local variable (NOT a field)
8. Multiplicity `0..*` or `1..*` --> `List<Type>` field
9. Multiplicity `0..1` --> nullable field or `Optional<Type>`
10. Multiplicity `1` --> required field (set in constructor)

**Quick reference table:**

| UML Element | Java Translation |
|---|---|
| `- name: String` | `private String name;` |
| `+ getName(): String` | `public String getName() { ... }` |
| `# id: int` | `protected int id;` |
| `~ helper: Util` | `Util helper;` (package-private, no modifier) |
| Solid triangle to parent | `class Child extends Parent` |
| Dashed triangle to interface | `class Impl implements MyInterface` |
| Filled diamond A --> B | A creates B in constructor |
| Empty diamond A --> B | A receives B via parameter |

---

## 6. Exam Tips

1. **Always label your relationships.** If the exam asks you to draw a class diagram, write the relationship name on the line (e.g., "has", "manages", "extends"). Unlabeled lines lose marks.

2. **Composition vs. Aggregation is the #1 trap.** Ask yourself: "If I delete the whole, does the part make sense alone?" If NO --> composition (filled diamond). If YES --> aggregation (empty diamond). When in doubt on an exam, justify your choice in a one-line note.

3. **Diamond goes on the WHOLE side, not the part side.** A `House *<>--- Room` means the diamond is on `House`. Getting this backward is an instant wrong answer.

4. **Multiplicity must be on BOTH ends** of a relationship line. Missing multiplicity is a common mark deduction. If you are unsure, write `*` (zero or more) as it is the most general.

5. **Do not confuse Inheritance arrow direction.** The arrow (hollow triangle) points FROM the child TO the parent. `Dog --triangle--> Animal` means Dog extends Animal. Drawing it backward reverses the meaning entirely.

6. **Show visibility for every attribute and method.** Use `-`, `+`, `#`, `~`. Omitting visibility symbols signals you do not understand access control.

7. **For coding questions that say "draw the class diagram":** first write the Java code mentally, then convert. It is much easier to think in code first and then translate to UML than to draw UML cold.

---

## 7. Viva Questions

**Q1: What is the difference between Association and Dependency?**

**A:** Association means one class holds a reference to another as a **field** (long-term relationship). Dependency means one class uses another **temporarily** -- as a method parameter, local variable, or return type -- without storing a reference. Association is a solid line; Dependency is a dashed arrow.

---

**Q2: How do you distinguish Aggregation from Composition in code?**

**A:** In **Aggregation**, the "part" object is passed into the "whole" (via constructor or setter) and was created externally. The part can outlive the whole. In **Composition**, the "whole" creates the "part" internally (often in its constructor), and the part is destroyed when the whole is destroyed. In Java, composition often means the part object is not shared with other objects.

---

**Q3: Can an abstract class have a constructor?**

**A:** Yes. An abstract class can have a constructor. It is called when a concrete subclass is instantiated (`super()` call). You cannot instantiate an abstract class directly, but its constructor initializes inherited fields. In UML, the constructor is shown as a method in the class box.

---

**Q4: In a class diagram, where does the diamond go -- on the whole or the part?**

**A:** The diamond (both empty and filled) goes on the **whole** side. For example, in `House *<>--- Room`, the filled diamond is on `House` because `House` is the whole that contains `Room` parts.

---

**Q5: What does multiplicity `0..1` mean?**

**A:** It means zero or one -- the relationship is **optional**. For example, an `Employee` may have `0..1` `ParkingSpot` (not every employee gets a spot). In Java, this translates to a nullable field or an `Optional<ParkingSpot>`.

---

**Q6: How is an interface shown differently from an abstract class in UML?**

**A:** An interface is labeled with `<<interface>>` above its name and typically has no attributes section (only methods). An abstract class is labeled with `<<abstract>>` (or the class name is italicized) and can have both attributes and methods. Interface realization uses a **dashed** line with hollow triangle; inheritance uses a **solid** line with hollow triangle.

---

**Q7: What is the significance of the arrow direction in Inheritance?**

**A:** The arrow (hollow triangle) points **from the subclass to the superclass**. It reads as "Dog generalizes to Animal" or equivalently "Dog is-a Animal." This is counterintuitive because you might expect the arrow to point from parent to child, but UML convention is that the arrow points toward the more general (parent) class.

---

**Q8: Can a class diagram show method implementations?**

**A:** No. Class diagrams are **structural** diagrams. They show what classes exist, their attributes, method signatures, and relationships. They do NOT show logic, control flow, or method bodies. For behavioral modeling, you use Sequence Diagrams, Activity Diagrams, or State Diagrams.

---

**Q9: What is the difference between a Sequence Diagram and an Activity Diagram?**

**A:** A **Sequence Diagram** shows how specific objects interact with each other over time through messages (method calls). It focuses on the order of interactions. An **Activity Diagram** shows the workflow or control flow of a process, similar to a flowchart. It focuses on what steps happen, with decision points and parallel paths, without focusing on specific objects.

---

**Q10: If a class has a `List<Item>` field, how do you decide if it is Association, Aggregation, or Composition?**

**A:** You decide based on **ownership and lifetime semantics**, not the data structure:
- If the class just references Items created elsewhere and does not control their lifecycle --> **Association** (e.g., `Student` has a list of `Course` references)
- If the class "owns" the Items but they were created externally and can exist independently --> **Aggregation** (e.g., `Team` has a list of `Player` objects)
- If the class creates the Items internally and they should not exist without it --> **Composition** (e.g., `Order` has a list of `OrderLineItem` objects created when the order is placed)

---

## 8. MCQ Quiz

**Q1.** In UML, which symbol represents a private attribute?

- A) `+`
- B) `-`
- C) `#`
- D) `~`

<details><summary>Answer</summary>

**B) `-`**

`-` is private, `+` is public, `#` is protected, `~` is package-private.

</details>

---

**Q2.** Which relationship uses a **dashed line with a hollow triangle arrowhead**?

- A) Inheritance
- B) Composition
- C) Realization (implements)
- D) Dependency

<details><summary>Answer</summary>

**C) Realization (implements)**

Realization = dashed line + hollow triangle. Inheritance = solid line + hollow triangle. Dependency = dashed arrow (no triangle). Composition = solid line + filled diamond.

</details>

---

**Q3.** A `Car` has an `Engine`. If the `Car` is destroyed, the `Engine` is also destroyed. This is:

- A) Association
- B) Aggregation
- C) Composition
- D) Dependency

<details><summary>Answer</summary>

**C) Composition**

The Engine cannot exist without the Car (strong ownership, coupled lifetimes). This is composition, represented by a filled diamond.

</details>

---

**Q4.** In a class diagram, the diamond symbol is placed on:

- A) The part side
- B) The whole side
- C) Both sides
- D) Neither side (it floats in the middle)

<details><summary>Answer</summary>

**B) The whole side**

The diamond (both empty and filled) is always on the "whole" or "container" side of the relationship.

</details>

---

**Q5.** Which multiplicity means "one or more"?

- A) `0..1`
- B) `0..*`
- C) `1..*`
- D) `1`

<details><summary>Answer</summary>

**C) `1..*`**

`1..*` = at least one, possibly many. `0..1` = optional (zero or one). `0..*` = zero or more. `1` = exactly one.

</details>

---

**Q6.** An `OrderService` class has a method `placeOrder(EmailService es)`. The `EmailService` is NOT stored as a field. The relationship between `OrderService` and `EmailService` is:

- A) Association
- B) Aggregation
- C) Composition
- D) Dependency

<details><summary>Answer</summary>

**D) Dependency**

The EmailService is only used as a method parameter -- it is not stored as a field. This is a temporary "uses" relationship = Dependency (dashed arrow).

</details>

---

**Q7.** Which of the following is TRUE about abstract classes in UML?

- A) They cannot have attributes
- B) They are denoted with `<<interface>>`
- C) Their name or abstract methods can be shown in italics
- D) They use dashed borders

<details><summary>Answer</summary>

**C) Their name or abstract methods can be shown in italics**

Abstract classes can have attributes (unlike interfaces by convention). They are denoted with `<<abstract>>` or italicized name, not `<<interface>>`. Dashed borders are not a standard notation for abstract classes.

</details>

---

**Q8.** A `University` has many `Department`s. If the `University` shuts down, the `Department`s cease to exist. A `Department` has many `Professor`s. If a `Department` is dissolved, the `Professor`s can join another department. What are the two relationships?

- A) Both Composition
- B) Both Aggregation
- C) University-Department: Composition; Department-Professor: Aggregation
- D) University-Department: Aggregation; Department-Professor: Composition

<details><summary>Answer</summary>

**C) University-Department: Composition; Department-Professor: Aggregation**

Departments cannot exist without the University (Composition). Professors can exist without their Department (Aggregation).

</details>

---

**Q9.** In a Sequence Diagram, time flows:

- A) Left to right
- B) Right to left
- C) Top to bottom
- D) Bottom to top

<details><summary>Answer</summary>

**C) Top to bottom**

In a sequence diagram, the vertical axis represents time flowing downward. The horizontal axis shows different objects/participants.

</details>

---

**Q10.** Which UML diagram is BEST suited for modeling the static structure of a system?

- A) Sequence Diagram
- B) Activity Diagram
- C) Class Diagram
- D) State Machine Diagram

<details><summary>Answer</summary>

**C) Class Diagram**

Class diagrams model static structure (classes, attributes, relationships). Sequence, Activity, and State Machine diagrams model dynamic behavior.

</details>

---

**Q11.** A `Team <>--- Player` relationship means:

- A) A Player cannot exist without a Team
- B) A Player can exist without a Team
- C) Team inherits from Player
- D) Team depends on Player temporarily

<details><summary>Answer</summary>

**B) A Player can exist without a Team**

The empty diamond (`<>`) represents Aggregation. In aggregation, the part (Player) can exist independently of the whole (Team).

</details>

---

**Q12.** Which keyword in Java corresponds to the Realization relationship in UML?

- A) `extends`
- B) `implements`
- C) `new`
- D) `import`

<details><summary>Answer</summary>

**B) `implements`**

Realization (dashed line + hollow triangle) maps to `implements` in Java. Generalization (solid line + hollow triangle) maps to `extends`.

</details>

---

**Q13.** In UML, an underlined attribute indicates:

- A) It is abstract
- B) It is final
- C) It is static
- D) It is deprecated

<details><summary>Answer</summary>

**C) It is static**

Underlined attributes and methods in UML represent static (class-level) members. This matches the Java `static` keyword.

</details>

---

**Q14.** What is the correct order of relationships from WEAKEST to STRONGEST coupling?

- A) Dependency, Association, Aggregation, Composition, Inheritance
- B) Association, Dependency, Aggregation, Inheritance, Composition
- C) Dependency, Aggregation, Association, Composition, Inheritance
- D) Inheritance, Composition, Aggregation, Association, Dependency

<details><summary>Answer</summary>

**A) Dependency, Association, Aggregation, Composition, Inheritance**

Dependency is the weakest (temporary usage). Inheritance is the strongest (tight type coupling). The order is: Dependency < Association < Aggregation < Composition < Inheritance.

</details>

---

**Q15.** A class diagram shows `# balance : double` in the Account class. This means:

- A) balance is public and of type double
- B) balance is private and of type double
- C) balance is protected and of type double
- D) balance is a constant

<details><summary>Answer</summary>

**C) balance is protected and of type double**

`#` is the UML symbol for protected visibility. Protected means accessible within the class and its subclasses (and same package in Java).

</details>

---

*End of UML Diagrams Study Notes*
