export class Reservation {
    constructor(id , idField, idUser, startTime, endTime, date, total ) {
        this.id = id;
        this.idField = idField;
        this.idUser = idUser;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
        this.total = total;
    }

    static FromDisplayableReservation(displayableReservation) {
        return new Reservation(
            displayableReservation.id,
            displayableReservation.idField,
            displayableReservation.idUser,
            displayableReservation.startTime,
            displayableReservation.endTime,
            displayableReservation.date,
            displayableReservation.total,
        );
    }

    static toDisplayableReservation(Reservation) {
        return {
            id: Reservation.id,
            idField: Reservation.idField,
            idUser: Reservation.idUser,
            startTime: Reservation.startTime,
            endTime: Reservation.endTime,
            date: Reservation.date,
            total: Reservation.total,
        };
    }
}