import java.util.List;
import java.time.Instant;

public final class MovieTicket {

    private final String movieName;
    private final String seatNumber;
    private final double price;
    private final List<String> addOns;
    private final Instant bookedAt;

    // TODO: Constructor - validate movieName/seatNumber not null/blank, price >= 0
    //       Defensive copy of addOns list

    // TODO: Getters for all fields
    //       getAddOns() must return unmodifiable view

    // TODO: toString()
}
