import {SubscriptionApiService} from "@/dtaquito/services/subscription.api.service.js";

export class Subscription {
    constructor(id,  plan, userId) {
        this.id = id;
        this.userId = userId;
        this.plan = plan;
    }

    static FromDisplayableSubscription(displayableField) {
        return new Subscription(
            displayableField.id,
            displayableField.userId,
            displayableField.plan
        );
    }

    static toDisplayableSubscription(Subscription) {
        return {
            id: Subscription.id,
            userId: Subscription.userId,
            plan: Subscription.plan
        };
    }
}
