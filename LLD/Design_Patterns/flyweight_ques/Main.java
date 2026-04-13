// // BAD: Each character duplicates the shared style information
// class Character {
//     private final char ch;
//     private final String fontFamily;  // "Arial" -- duplicated 100,000 times
//     private final int fontSize;       // 12 -- duplicated 100,000 times
//     private final String color;       // "#000000" -- duplicated 100,000 times
//     private final boolean bold;       // false -- duplicated 100,000 times
//     private final boolean italic;     // false -- duplicated 100,000 times
//     private final int row;            // unique per character
//     private final int col;            // unique per character

//     Character(char ch, String fontFamily, int fontSize, String color,
//               boolean bold, boolean italic, int row, int col) {
//         this.ch = ch;
//         this.fontFamily = fontFamily;
//         this.fontSize = fontSize;
//         this.color = color;
//         this.bold = bold;
//         this.italic = italic;
//         this.row = row;
//         this.col = col;
//     }

//     void render() {
//         System.out.println("Render '" + ch + "' at (" + row + "," + col
//             + ") in " + fontFamily + " " + fontSize + "pt " + color);
//     }
// }


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class CharacterStyle {
  
    private final String fontFamily; 
    private final int fontSize;       
    private final String color;       
    private final boolean bold;      
    private final boolean italic;     

    public CharacterStyle(String fontFamily,int fontSize , String color , boolean bold , boolean italic) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
        this.bold = bold;
        this.italic = italic;
    }





}

class StyleFactory {
    // your code here

    public static Map<String , CharacterStyle> sharedStyles = new HashMap<>();

    public static CharacterStyle getStyleForCharacter(String fontFamily,int fontSize , String color , boolean bold , boolean italic){

        String key = makeKey(fontFamily, fontSize ,  color ,  bold ,  italic);
        if(!sharedStyles.containsKey(key)){
            CharacterStyle newStyle = new CharacterStyle(fontFamily, fontSize ,  color ,  bold ,  italic);
            sharedStyles.put(key , newStyle);
        }

        return sharedStyles.get(key);
    }

    public static String makeKey(String fontFamily,int fontSize , String color , boolean bold , boolean italic){
        String key = fontFamily + "_" +fontSize+ "_" +color+ "_" +bold+ "_" +italic;
        return key;
    }

    public static int getTotalStyles(){
        return sharedStyles.size();
    }
    
}

class Character {
    // your code here
    CharacterStyle style;
    public char ch;
    public int row;
    public int col;

    Character(char ch, String fontFamily, int fontSize, String color, boolean bold, boolean italic, int row, int col){
        this.style = StyleFactory.getStyleForCharacter(fontFamily, fontSize ,  color ,  bold ,  italic);
        this.row = row;
        this.col = col;
        this.ch = ch;
    }

}

public class Main {
    public static void main(String[] args) {
        List<Character> document = new ArrayList<>();

        // Style 1: Arial, 12pt, black, normal
        document.add(new Character('H', "Arial", 12, "#000000", false, false, 0, 0));
        document.add(new Character('e', "Arial", 12, "#000000", false, false, 0, 1));
        document.add(new Character('l', "Arial", 12, "#000000", false, false, 0, 2));

        // Style 2: Arial, 16pt, red, bold
        document.add(new Character('W', "Arial", 16, "#FF0000", true, false, 1, 0));
        document.add(new Character('o', "Arial", 16, "#FF0000", true, false, 1, 1));
        document.add(new Character('r', "Arial", 16, "#FF0000", true, false, 1, 2));

        System.out.println("\nTotal characters: " + document.size());
        System.out.println("Total styles created: " + StyleFactory.getTotalStyles());
        System.out.println("H and e same style? " + (document.get(0).style == document.get(1).style));
        System.out.println("W and r same style? " + (document.get(3).style == document.get(5).style));
        System.out.println("H and W same style? " + (document.get(0).style == document.get(3).style));
    }
}