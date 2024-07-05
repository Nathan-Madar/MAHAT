<template>
  <v-card color="#F2F2DC">
    <div class="d-flex flex-no-wrap align-center">
      <div>
        <v-card-title
          :style="
            !saleObject.product_received ? 'color: #f97b7b;' : 'color: #4f3428;'
          "
        >
          {{ saleObject.full_name }}
        </v-card-title>

        <v-card-text :style="isLate ? 'color: #f97b7b' : 'color: #4f3428'">{{
          saleTime
        }}</v-card-text>
      </div>
      <v-spacer />
      <v-card-title style="color: #4f3428">
        {{ saleObject.total_price }} $
      </v-card-title>
    </div>
    <v-expand-transition>
      <div style="background-color: #f2f2dc" v-if="expand">
        <v-container>
          <v-row style="padding-bottom: 0%">
            <v-col style="padding-bottom: 0%">
              <v-btn
                @click.stop="copyAddress"
                color="#4f3428"
                height="100%"
                width="100%"
                variant="tonal"
              >
                <div>
                  <v-card-title style="padding-bottom: 0%; padding-top: 1%">
                    {{ saleObject.country }} - {{ saleObject.city }} -
                    {{ saleObject.address }}</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 1%"
                    >Address</v-card-subtitle
                  >
                </div>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                @click.stop="copyPhone"
                color="#4f3428"
                height="100%"
                width="100%"
                variant="tonal"
              >
                <div>
                  <v-card-title style="padding-bottom: 0%; padding-top: 1%">
                    {{ saleObject.phone_number }}</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 1%"
                    >Phone Number</v-card-subtitle
                  >
                </div>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                @click.stop="copyEmail"
                color="#4f3428"
                height="100%"
                width="100%"
                variant="tonal"
              >
                <div>
                  <v-card-title style="padding-bottom: 0%; padding-top: 1%">
                    {{ saleObject.email }}</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 1%"
                    >Email</v-card-subtitle
                  >
                </div>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-list bg-color="#F2F2DC" lines="two" select-strategy="classic">
          <v-list-subheader>Products:</v-list-subheader>

          <v-list-item
            v-for="product in saleObject.products"
            :key="product"
            @click.stop
            :value="product.name"
            @click="checkProduct(product.name)"
          >
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
              </v-list-item-action>
            </template>

            <v-list-item-title
              >{{ product.quantity_sold }}x
              {{ product.name }}</v-list-item-title
            >
          </v-list-item>
        </v-list>

        <v-btn
          @click.stop="isSaleReady ? handleSale() : (uncompleteSale = true)"
          block
          color="#8eb04a"
          variant="tonal"
          >Handle Sale</v-btn
        >
      </div>
    </v-expand-transition>

    <v-dialog
      width="auto"
      v-model="uncompleteSale"
      transition="dialog-bottom-transition"
    >
      <v-card width="25vw" rounded="xl" color="#FFFFE8">
        <v-container>
          <v-row>
            <v-col style="padding-bottom: 4%" offset="2" cols="8">
              <v-card-title style="color: #4f3428; text-align: center"
                >Are you sure?</v-card-title
              >
            </v-col>
            <v-col cols="2">
              <v-btn
                color="#f97b7b"
                size="small"
                variant="plain"
                icon="mdi-window-close"
                @click="uncompleteSale = false"
              />
            </v-col>
          </v-row>
          <v-row style="padding-top: 0%">
            <v-spacer />
            <v-card-text
              style="color: #4f3428; padding-top: 0%; padding-bottom: 7%"
            >
              The sale is missing the following products:
            </v-card-text>
            <v-spacer />
          </v-row>
          <v-card-subtitle
            style="color: #4f3428"
            v-for="product in missingItems"
            :key="product"
            >- {{ product }}</v-card-subtitle
          >
        </v-container>
        <v-btn @click="handleSale" color="#8eb04a" variant="tonal"
          >Handle Sale</v-btn
        >
      </v-card>
    </v-dialog>

    <v-snackbar
      location="bottom right"
      color="#8EB04A"
      timeout="2000"
      v-model="copiedEmail"
      transition="slide-x-reverse-transition"
    >
      Email copied to clipboard
    </v-snackbar>
    <v-snackbar
      location="bottom right"
      color="#8EB04A"
      timeout="2000"
      v-model="copiedPhone"
      transition="slide-x-reverse-transition"
    >
      Phone copied to clipboard
    </v-snackbar>
    <v-snackbar
      location="bottom right"
      color="#8EB04A"
      timeout="2000"
      v-model="copiedAddress"
      transition="slide-x-reverse-transition"
    >
      Address copied to clipboard
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from "axios";

const daysToHandleSale = 1;

export default {
  props: {
    expand: Boolean,
    saleObject: Object,
  },
  data() {
    return {
      copiedEmail: false,
      copiedPhone: false,
      copiedAddress: false,
      missingItems: [],
      uncompleteSale: false,
    };
  },
  methods: {
    checkProduct(product) {
      if (this.missingItems.includes(product)) {
        this.missingItems = this.missingItems.filter((p) => p !== product);
      } else {
        this.missingItems.push(product);
      }
    },
    handleSale() {
      axios
        .put(`${this.$serverHost}/sales/handle`, { sale: this.saleObject.id })
        .then(() => {
          this.saleObject.product_received = true;
          this.uncompleteSale = false;
        });
    },
    copyEmail() {
      navigator.clipboard.writeText(this.saleObject.email);
      this.copiedEmail = true;
    },
    copyPhone() {
      navigator.clipboard.writeText(this.saleObject.phone_number);
      this.copiedPhone = true;
    },
    copyAddress() {
      console.log(this.saleObject);
      navigator.clipboard.writeText(
        `${this.saleObject.country} - ${this.saleObject.city} - ${this.saleObject.address}`
      );
      this.copiedAddress = true;
    },
  },
  computed: {
    isLate() {
      let time = this.saleObject.time_of_sale;

      let milli = Date.parse(time);

      let date = new Date(milli);

      let pending = Date.now() - date;

      return (
        pending > 1000 * 60 * 60 * 24 * daysToHandleSale &&
        !this.saleObject.product_received
      );
    },
    saleTime() {
      let time = this.saleObject.time_of_sale;

      let milli = Date.parse(time);

      let date = new Date(milli);

      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;

      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();

      let minute =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

      if (this.saleObject.product_received) {
        return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}`;
      }

      let pending = Date.now() - date;

      let pendingString = "";

      if (pending < 1000 * 60) {
        pendingString = `now`;
      } else if (pending < 1000 * 60 * 60) {
        pendingString = `${Math.floor(pending / (1000 * 60))} minutes ago`;
      } else if (pending < 1000 * 60 * 60 * 24) {
        pendingString = `${Math.floor(pending / (1000 * 60 * 60))} hours ago`;
      } else {
        pendingString = `${Math.floor(
          pending / (1000 * 60 * 60 * 24)
        )} days ago`;
      }

      return `${date.getFullYear()}-${month}-${day} ${hour}:${minute} (${pendingString})`;
    },
    isSaleReady() {
      return this.missingItems.length == 0;
    },
  },
  mounted() {
    this.saleObject.products.forEach((product) => {
      this.missingItems.push(product.name);
    });
  },
};
</script>