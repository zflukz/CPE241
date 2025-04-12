SELECT Flights.airline_name AS `Most Market Share Airline`, 
       ROUND((SUM(price) * 100.0 / 
              (SELECT SUM(price) FROM Tickets 
               WHERE flightID IN 
                (SELECT flightID FROM Flights WHERE departTime ))), 2) AS `Market Share (%)`
FROM Flights
Left JOIN Tickets ON Flights.flightID = Tickets.flightID
GROUP BY Flights.airline_name
ORDER BY `Market Share (%)` DESC
