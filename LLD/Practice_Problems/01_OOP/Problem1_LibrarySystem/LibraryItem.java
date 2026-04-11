public abstract class LibraryItem {

    private String id;
    private String title;
    private boolean isBorrowed;

    // TODO: Constructor - validate id/title not null/blank

    // TODO: borrow() - set isBorrowed true, throw if already borrowed

    // TODO: returnItem() - set isBorrowed false, throw if not borrowed

    // TODO: abstract double calculateLateFee(int daysLate)

    // TODO: Getters for id, title, isBorrowed (no setters for id/title)
}
