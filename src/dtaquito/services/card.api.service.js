import http from "@/shared/services/http-common.js";

export class CardApiService {
    getAll() {
        return http.get('/card');
    }

    getById(id){
        return http.get(`/card/${id}`);
    }

    create(card){
        return http.post('/card', card);
    }

    update(id, cardResource){
        return http.put(`/card/${id}`, cardResource);
    }

    delete(id){
        return http.delete(`/card/${id}`);
    }
}