<script>
import {Reservation} from "@/dtaquito/model/reservation.entity.js";
import {CardApiService} from "@/dtaquito/services/card.api.service.js";
import {ReservationApiService} from "@/dtaquito/services/reservation.api.service.js";
import {Card} from "@/dtaquito/model/card.entity.js";
import {SubscriptionApiService} from "@/dtaquito/services/subscription.api.service.js";

export default {
  props: ['userID','fieldId', 'totalCost', 'startTime', 'endTime', 'date'],
  data() {
    return {
      userCards: [],
      cardsService: new CardApiService(),
      ReservationService: new ReservationApiService(),
      subsService: new SubscriptionApiService(),
      userSubscription: null,
      selectedCard: null,
      localTotalCost: 0,
    };
  },
  async created() {
    const response = await this.cardsService.getAll();
    this.userCards = response.data.filter(card => card.userId === this.userID);
    const subsResponse = await this.subsService.getAll();
    this.userSubscription = subsResponse.data.find(subscription => subscription.userId === this.userID);
    this.localTotalCost = this.totalCost;
    if (this.userSubscription.plan === 'premium') {
      this.localTotalCost = this.localTotalCost * 0.5;
      console.log("Total cost after discount: ", this.localTotalCost);
    }
  },
  methods: {
    async addReservation() {

        console.log('Reserving field with userId:', this.userID, 'and fieldId:', this.fieldId, 'cardid', this.selectedCard);
        console.log(this.startTime, this.endTime, this.date, this.localTotalCost, this.fieldId, this.userID);



        const id = Math.random().toString().slice(2);
        const reservation = new Reservation(id, this.fieldId, this.userID, this.startTime, this.endTime, this.date, this.localTotalCost);
        await this.ReservationService.create(reservation);

        let card = this.userCards.find(card => card.id === this.selectedCard);
        card.balance -= this.localTotalCost;
      if(this.localTotalCost>= card.balance){
        alert('Insufficient funds');
        return;
      }
      card = new Card(card.id, card.cardNumber, card.expiryDate, card.cardHolder, card.cardIssuer, card.cvv, card.userId, card.balance);
      await this.cardsService.update(card.id, card);
      alert('Field reserved successfully');
      this.$router.push('/myreserve');
    },
  },
};
</script>

<template>
  <div v-if="this.userSubscription && this.userCards">
  <form @submit.prevent="addReservation">
    <div v-if="this.userSubscription.plan==='premium'">
      <p>Half price discount for premium customer!!!</p>
    </div>
    <p>Total Cost: {{ localTotalCost }}</p>
    <div class="form-group">
      <label for="card">Card</label>
      <select id="card" v-model="selectedCard" required>
        <option v-for="card in userCards" :value="card.id">{{ card.cardNumber }}</option>
      </select>
    </div>
    <button type="submit">confirm</button>
  </form>
  </div>
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