// flightTypes.ts
export interface Flight {
	id: number;
	airline: string;
	departuretime: string;
	arrivaltime: string;
	duration: string;
	price: string;
	departure: string;
	arrival: string;
	date: string;
	icons: string[];
  }
  export interface BookingId {
	userID: string;
	flightID: string;
	bookingDate: string;
	bookingStatus: 'confirmed' | 'pending' | 'canceled';
  }