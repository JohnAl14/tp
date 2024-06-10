import http from "@/shared/services/http-common.js";

export class FieldsApiService {
    getAll() {
        return http.get('/fields');
    }

    getById(id){
        return http.get(`/fields/${id}`);
    }

    create(field){
        return http.post('/fields', field);
    }

    update(id, fieldResource){
        return http.put(`/fields/${id}`, fieldResource);
    }

    delete(id){
        return http.delete(`/fields/${id}`);
    }
}