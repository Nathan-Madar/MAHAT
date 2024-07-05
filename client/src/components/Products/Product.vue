<template>
  <v-card
    @click="dialog = true"
    color="#F2F2DC"
    rounded="lg"
    hover
    class="mx-auto"
    max-width="300"
  >
    <v-container class="container">
      <v-img
        :src="card.image"
        height="200px"
        cover
        :style="card.amount <= 0 ? 'opacity: 0.2;' : ''"
      ></v-img>
      <v-card-title v-if="card.amount <= 0" class="centered">Out Of Stock</v-card-title>
    </v-container>

    <v-card-title style="color: #4f3428"> {{ card.name }} </v-card-title>

    <v-card-subtitle style="color: #4f3428">
      {{ card.category }} - {{ card.sub_category }}
    </v-card-subtitle>

    <v-card-actions style="padding-left: 10%">
      <div v-if="card.discount_percent != null" class="d-flex">
        <div style="color: #8eb04a; margin-bottom: 0%" class="text-h6 price">
          {{ card.actual_price }}$
        </div>
        <div
          style="color: #f97b7b; margin-top: 3%; margin-left: 10%"
          class="text-decoration-line-through text-subtitle-1 price"
        >
          {{ Math.round(card.price) }}$
        </div>
      </div>

      <div style="color: #4f3428" v-else class="text-h6 price">
        {{ card.price }}$
      </div>

      <v-spacer></v-spacer>

      <v-tooltip text="Add to cart" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            @click.stop="addItemToCart(card)"
            :disabled="card.amount <= 0"
            v-bind="props"
            icon="mdi-cart-plus"
            color="#4F3428"
          ></v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      width="auto"
    >
      <product-details
        @add="(product) => addItemToCart(product)"
        :product="card"
      />
    </v-dialog>

    <v-snackbar
      location="bottom right"
      color="#8EB04A"
      timeout="2000"
      v-model="addedToCart"
      transition="slide-x-reverse-transition"
    >
      Added to cart
    </v-snackbar>
  </v-card>
</template>

<script>
import { useAppStore } from "@/store/app";
import { mapState, mapActions } from "pinia";
import ProductDetails from "./ProductDetails.vue";

export default {
  props: {
    card: {
      type: Object,
      loadinga: Boolean,
    },
  },
  components: {
    "product-details": ProductDetails,
  },
  data: () => ({
    dialog: false,
    addedToCart: false,
    loader: null,
  }),
  computed: {
    ...mapState(useAppStore, ["price"]),
  },
  methods: {
    ...mapActions(useAppStore, ["addItem"]),
    addItemToCart(item) {
      this.addItem(item);
      this.addedToCart = true;
    },
  },
  watch: {
    loadinga(newVal, oldVal) {
      console.log("sijfoijflis");
      this.loader = newVal;
    },
  },
};
</script>

<style scoped>
.price {
  cursor: context-menu;
}
.centered {
  position: absolute;
  top: 40%;
  left: 8%;
  color: #f97b7b;
  font-size: 150%;
  transform: translate(-50%, -50%);
  transform: rotate(-45deg);
  font-weight: bold;
}
.container {
  position: relative;
  text-align: center;
}
</style>
