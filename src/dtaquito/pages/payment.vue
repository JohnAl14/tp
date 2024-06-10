<<script>
import {CardApiService} from "@/dtaquito/services/card.api.service.js";
import AddFieldForm from "@/dtaquito/components/AddFieldForm.vue";
import AddCardForm from "@/dtaquito/components/AddCardForm.vue";

export default {
  name: "payment",
  components: {AddCardForm, AddFieldForm},
  title: "Payment",
  data() {
    return {
      userId: '',
      userCards: [],
      CardService: null,
      showForm: false,
      userID: null,
    }
  },
  async created() {
    this.userId = localStorage.getItem('userId');
    this.CardService = new CardApiService();
    const allCards = await this.CardService.getAll();
    this.userCards = allCards.data.filter(card => card.userId === this.userId);

    if (this.userCards.length === 0) {
      console.log('El usuario no tiene una tarjeta asignada');
    }else {
      console.log(this.userCards);
    }
  },
}
</script>

<template>
  <h1>Payments</h1>
  <div v-if="userCards.length > 0">
    <pv-card v-for="card in userCards">
        <template #title>
        <div>{{ card.cardHolder }}</div>
      </template>
        <template #content>
        <p>Card Number: {{ card.cardNumber }}</p>
        <p>Expiry Date: {{ card.expiryDate }}</p>
        <p>Card Issuer: {{ card.cardIssuer }}</p>
        <p>CVV: {{ card.cvv }}</p>
        <p>Balance: {{ card.balance }}</p>
        </template>
    </pv-card>
  </div>
  <div v-else>
    <p>El usuario no tiene una tarjeta asignada</p>
  </div>
  <pv-button class="p-button-rounded p-button-success p-button-sticky"
             @click="showForm = true">
    Agregar Tarjeta
    <i class="pi pi-plus"></i>
  </pv-button>
  <pv-dialog v-model:visible="showForm" header="Tarjeta nueva">
    <add-card-form :userID="userId" />
  </pv-dialog>
</template>

<style scoped>

</style>