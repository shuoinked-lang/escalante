export type Reservation = {
  confirmationCode: string;
  guestFirstName: string;
  guestLastName: string;
  yurtId: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  partySize: number;
  doorCode: string;
};

export const DEMO_RESERVATION: Reservation = {
  confirmationCode: 'EY-39271',
  guestFirstName: 'Maya',
  guestLastName: 'Whitfield',
  yurtId: 'cedar',
  checkInDate: 'Fri, Apr 24',
  checkOutDate: 'Mon, Apr 27',
  nights: 3,
  partySize: 5,
  doorCode: '4827',
};
