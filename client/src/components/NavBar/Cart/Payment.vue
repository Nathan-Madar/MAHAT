<template>
  <v-card
    color="#ffffe8"
    class="d-flex flex-column"
    style="height: 58dvh"
    density="compact"
    elevated
  >
    <v-card-title style="color: #4f3428" class="text-h4">
      Payment
    </v-card-title>

    <v-card-actions
      style="margin-bottom: -2%; padding-bottom: 2%"
      class="mt-auto"
    >
      <v-btn
        prepend-icon="mdi-chevron-left"
        color="blue"
        variant="tonal"
        @click="$emit('prevTab')"
        >Back To Shipping</v-btn
      >
      <v-spacer />
      <v-btn
        append-icon="mdi-check-circle-outline"
        color="green"
        variant="tonal"
        @click="buy()"
        :loading="isLoad"
        :disabled="isLoad"
        >Place Order</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { useAppStore } from "@/store/app";
import { mapActions, mapWritableState } from "pinia";

export default {
  props: {
    orderDetails: "orderDetails",
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["clear", "remove", "cleanse"]),
    buy() {
      this.loading = true;
      console.log(this.orderDetails.customersName);
      axios
        .post(`${this.$serverHost}/sales/sale`, {
          totalPrice: this.totalPrice,
          description: this.saleDescription,
          paymentMethod: "CREDIT",
          soldOnline: true,
          discountOnSaleId: null,
          productReceived: false,
          customersName: this.orderDetails.customersName,
          customersPhone: this.orderDetails.customersPhone,
          customersEmail: this.orderDetails.customersEmail,
          customersCountry: this.orderDetails.customersCountry,
          customersCity: this.orderDetails.customersCity,
          customersZip: this.orderDetails.customersZip,
          customersAddress: this.orderDetails.customersAddress,
          products: JSON.stringify(this.productsPost),
        })
        .then(() => {
          this.loading = false;
          this.clear();
          this.$emit("closeDialog");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapWritableState(useAppStore, ["products", "totalPrice", "totalAmount"]),
    productsPost() {
      let list = [];
      this.products.forEach((product) => {
        let productObject = {
          id: product.product_id,
          quantity: product.amount,
          sellingPrice: product.price,
          discountId: product.discount_id,
        };

        list.push(productObject);
      });

      return list;
    },
    saleDescription() {
      let names = "";
      this.products.forEach((product) => {
        if (names === "") {
          names = product.name;
        } else {
          names = names + " | " + product.name;
        }
      });

      return names;
    },
    isLoad() {
      return this.loading;
    },
  },
};
</script>