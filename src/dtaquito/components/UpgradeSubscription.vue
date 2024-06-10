<script>
import {CardApiService} from "@/dtaquito/services/card.api.service.js";
import {Card} from "@/dtaquito/model/card.entity.js";
import {SubscriptionApiService} from "@/dtaquito/services/subscription.api.service.js";
import {Subscription} from "@/dtaquito/model/subscription.entity.js";

export default {
  props: ['userID'],
  data() {
    return {
      selectedCard: null,
      cardsService: new CardApiService(),
      subsService: new SubscriptionApiService(),
      userCards: [],
      price : 70,
    };
  },
  async created() {
    const response = await this.cardsService.getAll();
    this.userCards = response.data.filter(card => card.userId === this.userID);


  },
  methods: {
    async upgradeSub() {
      const subsres = await this.subsService.getAll();
      let userSubscription = subsres.data.find(subscription => subscription.userId === this.userID);

      userSubscription.plan = 'premium';
      userSubscription = new Subscription(userSubscription.id, userSubscription.plan, userSubscription.userId );

      let card = this.userCards.find(card => card.id === this.selectedCard);
      card.balance -= this.price;
      if(this.price> card.balance){
        alert('Insufficient funds');
        return;
      }
      card = new Card(card.id, card.cardNumber, card.expiryDate, card.cardHolder, card.cardIssuer, card.cvv, card.userId, card.balance);
      console.log(card);
      console.log(userSubscription);
      await this.cardsService.update(card.id, card);
      await this.subsService.update(userSubscription.id, userSubscription);
      location.reload();
    },
  },
};
</script>

<template>
  <form @submit.prevent="upgradeSub">
    <p>Precio del plan premium: {{ price }}</p>
    <div class="form-group">
      <label for="card">Card</label>
      <select id="card" v-model="selectedCard" required>
        <option v-for="card in this.userCards" :value="card.id">{{ card.cardNumber }}</option>
      </select>
    </div>
    <button type="submit">confirm</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: forestgreen;
  color: white;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: goldenrod;
}
</style>