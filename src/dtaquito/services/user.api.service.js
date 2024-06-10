import http from "@/shared/services/http-common.js";

export class UserApiService {
    getAll() {
        return http.get('/user');
    }

    getById(id){
        return http.get(`/user/${id}`);
    }

    create(user){
        return http.post('/user', user);
    }

    update(id, user){
        return http.put(`/user/${id}`, user);
    }

    delete(id){
        return http.delete(`/user/${id}`);
    }
}