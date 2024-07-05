<template>
  <div>
    <div style="margin-top: 0.5%;" class="d-flex flex-no-wrap justify-space-between align-center">
      <v-spacer />
      <p class="text-h4" style="color: #4F3428;">Sales</p>
      <v-spacer />
    </div>
    <v-container>
      <v-row dense>
        <v-col v-for="i in sales.length" :key="i" cols="12">
          <sale
            @click="
              () => {
                if (expand === null || expand !== i) {
                  expand = i;
                } else {
                  expand = null;
                }
              }
            "
            :expand="expand == i"
            :saleObject="sales[i - 1]"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Sale from "@/components/Admin/Sales/Sale.vue";

export default {
  components: {
    sale: Sale,
  },
  data() {
    return {
      expand: null,
      sales: [],
    };
  },
  methods: {},
  mounted() {
    this.load = true;
    axios
      .get(`${this.$serverHost}/sales/sales/`)
      .then((response) => (this.sales = response.data.rows))
      .then(() => (this.load = false))
      .catch((error) => console.log(error));
  },
};
</script>