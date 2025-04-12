SELECT
    route.departure_airport,
    route.arrival_airport,
    (SELECT SUM(T.price)
     FROM Tickets T
     WHERE T.bookingID IN
         (SELECT b.bookingID
          FROM Bookings b
          JOIN Flights f ON b.flightID = f.flightID
          WHERE f.source = route.departure_airport
          AND f.destination = route.arrival_airport)) AS total_revenue
FROM
    (SELECT DISTINCT f.source AS departure_airport,
                     f.destination AS arrival_airport
     FROM Flights f) AS route
ORDER BY total_revenue DESC;