<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="card in productsData"
        :key="card"
        cols="12"
        xs="12"
        sm="12"
        md="2"
      >
        <product
          v-if="load == false"
          :card="card"
          :load="load"
          class="ma-2 pa-2"
        />
        <v-skeleton-loader
          v-else
          elevation="2"
          height="350px"
          type="image, heading, subtitle, actions"
          class="mx-auto ma-2 pa-2"
          color="#F2F2DC"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Product from "@/components/Products/Product.vue";

export default {
  data: () => ({
    load: true,
    productsData: 4,
  }),
  components: {
    product: Product,
  },
  methods: {},
  mounted() {
    this.load = true;
    console.log(this.$route.query.value)
    axios
      .get(
        `${this.$serverHost}/products/name?value=${this.$route.query.value}`
      )
      .then((response) => (this.productsData = response.data.rows))
      .then(() => (this.load = false))
      .catch((error) => console.log(error));
  },
};
</script>
