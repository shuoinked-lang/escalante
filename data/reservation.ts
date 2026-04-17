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

// All seven yurts now have keypad locks. In production, ResNexus emails
// the door code to the guest on booking — by convention the last four
// digits of their phone number. The value below is fixed sample data so
// we can demo the keypad flow without touching ResNexus.
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
