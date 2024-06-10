<script>
import {FieldsApiService} from "@/dtaquito/services/field.api.service.js";
import {ReservationApiService} from "@/dtaquito/services/reservation.api.service.js";
import AddReservationForm from "@/dtaquito/components/AddReservationForm.vue";
import addReservationForm from "@/dtaquito/components/AddReservationForm.vue";

export default {
  name: "field-detail",
  computed: {
    addReservationForm() {
      return addReservationForm
    }
  },
  components: {AddReservationForm},
  title: "Field Details",
  data() {
    return {
      startTime: "",
      endTime: "",
      date: "",
      field: null,
      FieldsService: null,
      ReservationService: null,
      userId: localStorage.getItem('userId'),
      showForm: false,
      userID: null,
      totalCost: 0,

    }
  },
  async created() {
    this.userId = localStorage.getItem('userId');
    this.ReservationService = new ReservationApiService();
    this.FieldsService = new FieldsApiService();
    const fieldId = this.$route.params.id;
    const response = await this.FieldsService.getById(fieldId);
    this.field = response.data;


  },
  methods: {
    async reserveField() {
      if (!this.startTime || !this.endTime   || !this.date  ){
        alert('Por favor, complete todos los campos.');
        return;
      }

      const currentDate = new Date();
      const reservationDate = new Date(this.date);

      if (reservationDate < currentDate) {
        alert('La fecha invalida');
        return;
      }
      this.startTime = new Date(`1970-01-01T${this.startTime}:00Z`);
      this.endTime = new Date(`1970-01-01T${this.endTime}:00Z`);
      const durationHours = (this.endTime - this.startTime) / (1000 * 60 * 60);
      this.totalCost = (this.field.price * durationHours).toFixed(2);
      console.log(this.totalCost);
      console.log(this.startTime);

      if (durationHours < 1 || !durationHours) {
        alert('La reserva debe ser de al menos 1 hora.');
        return;
      }
      if ( durationHours > 3 ){
        alert('La reserva no puede ser mayor a 3 horas.');
        return;
      }

      this.showForm = true;

      //console.log('Reserving field with userId:', this.userId, 'and fieldId:', this.field.id);
      //const reservation= new Reservation("",this.field.id, this.userId);
      //await this.ReservationService.create(reservation);
      //this.$router.push('/fields');
    },
    cancel() {
      this.$router.push('/fields');
    }
  }
}
</script>
<template>
  <div v-if="field" class="field-detail">
    <div class="image-container">
      <img :src="field.image" alt="field image">
    </div>
    <div class="info-container">

      <h1>{{ field.name }}</h1>
      <p>ID: {{ field.id }}</p>
      <p>Price: {{ field.price }}</p>
      <p>Rating: {{ field.rating }}</p>
      <p>Descripción: {{ field.descripcion }}</p>
      <p>Capacidad: {{ field.capacidad }}</p>

      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input type="time" id="startTime" v-model="startTime" required>
      </div>
      <div class="form-group">
        <label for="endTime">End Time</label>
        <input type="time" id="endTime" v-model="endTime" required>
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="date" required>
      </div>

      <button  @click="reserveField">Reservar</button>
      <button @click="cancel">Cancelar</button>
      <pv-dialog v-model:visible="showForm" header="New reservation">
        <add-reservation-form :userID="userId" :fieldId="field.id"
                              :totalCost="totalCost" :startTime="startTime"
                              :endTime="endTime" :date="date" />
      </pv-dialog>
    </div>
  </div>

</template>

<style scoped>
.field-detail {
  display: flex;
  height: 100vh;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

p {
  margin: 10px 0;
}

button {
  padding: 5px;
  margin: 10px 0;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  background-color: forestgreen;
  color: white;
  cursor: pointer;
  width: 50%;
  align-items: center;
}

button:hover {
  background-color: goldenrod;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 17%;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>