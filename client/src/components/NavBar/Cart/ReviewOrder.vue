<template>
  <v-card
    class="d-flex flex-column"
    style="height: 58dvh; background-color: #ffffe8"
    elevated
  >
    <v-card-title style="color: #4f3428" class="text-h4"> Cart </v-card-title>
    <v-list style="background-color: #ffffe8" lines="three">
      <v-list-item v-for="product in products" :key="product">
        <template v-slot:prepend>
          <div class="d-inline-flex flex-nowrap">
            <v-text-field
              color="#4F3428"
              style="width: 12dvh; color: #4F3428;"
              class="align-self-start"
              v-model="product.amount"
              hide-details
              variant="flat"
              single-line
              type="number"
            />
            <v-avatar
              class="align-self-center"
              style="border-radius: 25%; margin-right: 7%"
              :image="product.image"
            ></v-avatar>
          </div>
        </template>

        <v-list-item-title style="color: #4f3428">{{
          product.name
        }}</v-list-item-title>

        <template v-slot:append>
          <v-list-item-title style="color: #4f3428"
            >{{
              (product.actual_price * product.amount).toFixed(2)
            }}$</v-list-item-title
          >
          <v-btn
            @click="remove(product.name)"
            variant="text"
            color="#F97B7B"
            icon="mdi-delete-outline"
          />
        </template>

        <v-divider color="#4F3428" />
      </v-list-item>
    </v-list>

    <v-spacer />

    <v-card-actions
      class="mt-auto"
      style="margin-bottom: -2%; padding-bottom: 2%"
    >
      <card-text style="color: #4f3428" class="text-h4"
        >Total: {{ totalPrice }}$</card-text
      >
      <v-spacer />
      <v-btn
        prepend-icon="mdi-delete-outline"
        color="#F97B7B"
        variant="tonal"
        @click="clear"
        >Clear Cart</v-btn
      >
      <v-btn
        append-icon="mdi-chevron-right"
        color="#357F8D"
        :disabled="totalAmount == 0"
        variant="tonal"
        @click="$emit('nextTab')"
        >Checkout</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { useAppStore } from "@/store/app";
import { mapActions, mapWritableState } from "pinia";

export default {
  computed: {
    ...mapWritableState(useAppStore, ["products", "totalPrice", "totalAmount"]),
  },
  methods: {
    ...mapActions(useAppStore, ["clear", "remove", "cleanse"]),
  },
  watch: {
    products: {
      handler: function (after, before) {
        this.cleanse();
      },
      deep: true,
    },
  },
};
</script>