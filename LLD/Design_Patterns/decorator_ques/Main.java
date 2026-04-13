// Component interface
interface Character {
    String getAbilities();
    int getPower();
}

// Concrete component
class Mario implements Character {
    public String getAbilities() { return "Mario"; }
    public int getPower() { return 10; }
}

// Abstract decorator
abstract class PowerUp implements Character {
    protected Character character;
    public PowerUp(Character c) { this.character = c; }
    public String getAbilities() { return character.getAbilities(); }
    public int getPower() { return character.getPower(); }
}

// Concrete decorators — each adds ONE responsibility
class HeightUp extends PowerUp {
    public HeightUp(Character c) { super(c); }
    public String getAbilities() { return character.getAbilities() + " + HeightUp"; }
    public int getPower() { return character.getPower() + 5; }
}

class GunPowerUp extends PowerUp {
    public GunPowerUp(Character c) { super(c); }
    public String getAbilities() { return character.getAbilities() + " + Gun"; }
    public int getPower() { return character.getPower() + 15; }
}

class StarPowerUp extends PowerUp {
    public StarPowerUp(Character c) { super(c); }
    public String getAbilities() { return character.getAbilities() + " + Star"; }
    public int getPower() { return character.getPower() + 30; }
}

class FireFlower extends PowerUp {
    public FireFlower(Character c) { super(c); }
    public String getAbilities() { return character.getAbilities() + " + Fire"; }
    public int getPower() { return character.getPower() + 20; }
}

public class Main {
    public static void main(String[] args) {
        // Start with basic Mario
        Character mario = new Mario();
        System.out.println(mario.getAbilities() + " | Power: " + mario.getPower());

        // Stack power-ups dynamically!
        mario = new HeightUp(mario);
        System.out.println(mario.getAbilities() + " | Power: " + mario.getPower());

        mario = new GunPowerUp(mario);
        System.out.println(mario.getAbilities() + " | Power: " + mario.getPower());

        mario = new StarPowerUp(mario);
        System.out.println(mario.getAbilities() + " | Power: " + mario.getPower());

        mario = new FireFlower(mario);
        System.out.println(mario.getAbilities() + " | Power: " + mario.getPower());

        System.out.println("\n--- Different combination, different order ---");

        // Completely different build — no new classes needed!
        Character luigi = new Mario();
        luigi = new FireFlower(luigi);
        luigi = new StarPowerUp(luigi);
        System.out.println(luigi.getAbilities() + " | Power: " + luigi.getPower());
    }
}