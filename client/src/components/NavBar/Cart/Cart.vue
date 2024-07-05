<template>
  <v-stepper
    rounded="xl"
    style="background-color: #ffffe8"
    alt-labels
    width="50vw"
    height="80dvh"
  >
    <template v-slot:default="{ prev, next }">
      <v-stepper-header style="height: 13dvh; background-color: #9ac3cb">
        <!-- eslint-disable-next-line vue/no-v-for-template-key -->
        <template v-for="tab in items.length" :key="tab">
          <v-stepper-item
            :title="items[tab - 1]"
            :value="tab"
            color="#4f3428"
            style="color: #4f3428"
          ></v-stepper-item>

          <v-divider v-if="tab !== items.length" :key="tab"></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-window style="background-color: #ffffe8">
        <v-stepper-window-item
          style="background-color: #ffffe8"
          v-for="tab in items.length"
          :key="tab"
          :value="tab"
        >
          <review-order v-if="tab === 1" @nextTab="next" />

          <order-details
            v-else-if="tab === 2"
            @prevTab="prev"
            @nextTab="
              (Details) => {
                orderDetailsObject = Details;
                pay();
                next();
              }
            "
          />
          <payment
            v-else-if="tab === 3"
            :orderDetails="orderDetailsObject"
            @prevTab="prev"
            @closeDialog="$emit('close')"
          />
        </v-stepper-window-item>
      </v-stepper-window>
    </template>
  </v-stepper>
</template>

<script>
import ReviewOrder from "./ReviewOrder.vue";
import OrderDetails from "./OrderDetails.vue";
import Payment from "./Payment.vue";

export default {
  components: {
    "review-order": ReviewOrder,
    "order-details": OrderDetails,
    payment: Payment,
  },
  data: () => ({
    items: ["Review Order", "Shipping Details", "Payment"],
    orderDetailsObject: null,
  }),
  methods: {
    pay: () => {
      alert("No payment method. Add payment method.");
    },
  },
};
</script>