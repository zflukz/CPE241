SELECT 
    COUNT(B.bookingID) AS `Total Canceled Tickets`,
    SUM(T.price) AS `Revenue (THB)`,
    (COUNT(B.bookingID) * 100.0 / 
     (SELECT COUNT(*) FROM Bookings WHERE bookingDate 
     BETWEEN '2025-03-01' AND '2025-03-31')) AS `% of Total Cancellations`
FROM Bookings B
JOIN Tickets T ON B.bookingID = T.bookingID
WHERE B.bookingStatus = 'canceled' 
AND B.bookingDate BETWEEN '2025-03-01' AND '2025-03-31';