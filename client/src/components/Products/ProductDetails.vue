<template>
  <v-card
    color="#FFFFE8"
    class="d-flex flex-column"
    width="50vw"
    height="80vh"
    rounded="xl"
  >
    <div>
      <v-container class="container">
        <v-img
          :style="
            product.amount <= 0
              ? 'opacity: 0.2;margin-top: 2%;'
              : 'margin-top: 2%;'
          "
          :src="product.image"
          height="40vh"
        ></v-img>
        <v-card-title v-if="product.amount <= 0" class="centered"
          >Out Of Stock</v-card-title
        >
      </v-container>
      <v-card-title style="color: #4f3428; margin-left: 1%">
        {{ product.name }}
      </v-card-title>

      <v-card-subtitle style="color: #4f3428; margin-left: 1%">
        {{ product.category }} - {{ product.sub_category }}
      </v-card-subtitle>

      <v-card-text
        style="
          color: #4f3428;
          margin-left: 1%;
          overflow: auto;
          max-height: 16vh;
        "
      >
        {{ product.description }}
      </v-card-text>
    </div>

    <v-card-actions class="mt-auto">
      <div
        v-if="product.discount_percent != null"
        style="padding-left: 1%"
        class="d-flex justify-space-between"
      >
        <div style="color: #8eb04a" class="text-h5 price">
          {{ product.actual_price }}$
        </div>
        <div
          style="margin-top: 3%; margin-left: 10%; color: #f97b7b"
          class="text-decoration-line-through text-subtitle-1 price"
        >
          {{ Math.round(product.price) }}$
        </div>
        <v-tooltip style="margin-left: 10%" activator="parent" location="end"
          >Discount: {{ product.discount_description }}</v-tooltip
        >
      </div>

      <div v-else style="color: #4f3428" class="text-h6 price">
        {{ product.price }}$
      </div>

      <v-spacer />

      <v-tooltip text="Add to cart" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            size="x-large"
            color="#4f3428"
            @click="$emit('add', product)"
            v-bind="props"
            :disabled="product.amount <= 0"
            icon="mdi-cart-plus"
          ></v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useAppStore } from "@/store/app";
import { mapActions } from "pinia";

export default {
  props: {
    product: Object,
  },
  methods: {
    ...mapActions(useAppStore, ["addItem"]),
    addItemToCart(item) {
      this.addItem(item);
    },
  },
};
</script>

<style scoped>
.centered {
  position: absolute;
  top: 45%;
  left: 32%;
  color: #f97b7b;
  font-size: 250%;
  transform: translate(-50%, -50%);
  transform: rotate(-45deg);
  font-weight: bold;
}
.container {
  position: relative;
  text-align: center;
  padding: 0%;
}
</style>