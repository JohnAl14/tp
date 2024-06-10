import http from "@/shared/services/http-common.js";

export class SubscriptionApiService {
    getAll() {
        return http.get('/subscription');
    }

    getById(id){
        return http.get(`/subscription/${id}`);
    }

    create(Subscription){
        return http.post('/subscription', Subscription);
    }

    update(id, SubscriptionResource){
        return http.put(`/subscription/${id}`, SubscriptionResource);
    }

    delete(id){
        return http.delete(`/subscription/${id}`);
    }
}