import http from "@/shared/services/http-common.js";

export class ReservationApiService {
    getAll() {
        return http.get('/reservation');
    }

    getById(id){
        return http.get(`/reservation/${id}`);
    }

    create(reservation){
        return http.post('/reservation', reservation);
    }

    update(id, reservationResource){
        return http.put(`/reservation/${id}`, reservationResource);
    }

    delete(id){
        return http.delete(`/reservation/${id}`);
    }
}