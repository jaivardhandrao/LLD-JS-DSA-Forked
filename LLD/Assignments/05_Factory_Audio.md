# Assignment: Audio Player Factory (Simple Factory Pattern)

**Pattern:** Simple Factory | **Difficulty:** Easy-Medium

---

## Problem Statement

An audio player app supports MP3, WAV, and FLAC formats. Each format has its own player implementation. A **Simple Factory** should create the right player based on the format enum — so the client never calls `new MP3Player()` directly.

---

## Class Structure

| Class | Role |
|-------|------|
| `MediaFormat` | Enum: `MP3`, `WAV`, `FLAC` |
| `AudioPlayer` | Abstract base class — provided |
| `MP3Player`, `WAVPlayer`, `FLACPlayer` | Concrete players — provided |
| `AudioPlayerFactory` | **You implement** — the factory |

---

## Solution

```java
// AudioPlayerFactory.java
public class AudioPlayerFactory {

    public static AudioPlayer getAudioPlayer(MediaFormat mediaFormat,
                                             int volume,
                                             double playBackRate) {
        return switch (mediaFormat) {
            case MP3  -> new MP3Player(volume, playBackRate);
            case WAV  -> new WAVPlayer(volume, playBackRate);
            case FLAC -> new FLACPlayer(volume, playBackRate);
            default   -> throw new IllegalArgumentException("Invalid media format");
        };
    }
}
```

---

## Abstract Base Class (provided)

```java
public abstract class AudioPlayer {
    private int volume;
    private double playBackRate;

    public AudioPlayer(int volume, double playBackRate) { ... }

    public abstract MediaFormat supportsType();
    public abstract void play();
    public abstract void pause();
    public abstract void stop();
    public int getVolume() { ... }
    public double getPlayBackRate() { ... }
}
```

---

## How the Factory Is Used

```java
// Client code — no knowledge of MP3Player, WAVPlayer, etc.
AudioPlayer player = AudioPlayerFactory.getAudioPlayer(MediaFormat.MP3, 80, 1.0);
player.play();
```

---

## Simple Factory vs Factory Method

| | Simple Factory | Factory Method |
|---|---|---|
| Where creation logic lives | One static method | Subclass overrides a method |
| Adding a new type | Edit the factory class | Add a new subclass |
| Is it a GoF pattern? | No (not official) | Yes |
| Used here | Yes | No |

---

## Exam Tips

- **Viva:** "What does the factory return?" → The abstract type `AudioPlayer`, never a concrete type — client is decoupled.
- **Viva:** "What's the difference between Simple Factory and Factory Method?" → Simple Factory = one class with a static method; Factory Method = abstract method in a base class, overridden by subclasses.
- **MCQ trap:** Simple Factory is NOT one of the 23 GoF patterns — it's a programming idiom. Factory Method IS a GoF pattern.
- **Why `throw` in default?** → Fail fast if an unknown format is passed — better than silently returning null.
