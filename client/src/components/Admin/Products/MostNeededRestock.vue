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

      <!-- <v-card-text
        style="
          color: #4f3428;
          margin-left: 1%;
          overflow: auto;
          max-height: 16vh;
        "
      >
        {{ product.description }}
      </v-card-text> -->
      <v-container>
        <v-row>
          <v-col>
            <v-btn
              @click.stop
              color="#4f3428"
              height="100%"
              width="100%"
              variant="tonal"
            >
              <div>
                <v-card-title style="padding-bottom: 0%">{{
                  product.amount
                }}</v-card-title>
                <v-card-subtitle style="padding-bottom: 5%"
                  >In Stock</v-card-subtitle
                >
              </div>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              @click.stop
              color="#4f3428"
              height="100%"
              width="100%"
              variant="tonal"
            >
              <div>
                <v-card-title style="padding-bottom: 0%"
                  >{{ product.daysToResock }} days</v-card-title
                >
                <v-card-subtitle style="padding-bottom: 5%"
                  >Until Out of Stock</v-card-subtitle
                >
              </div>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-card-actions class="mt-auto">
      <v-tooltip text="Calculate again" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            size="x-large"
            color="#4f3428"
            @click="$emit('retry')"
            v-bind="props"
            :disabled="product.amount <= 0"
            icon="mdi-sync"
          ></v-btn>
        </template>
      </v-tooltip>

      <v-spacer />

      <v-tooltip text="Search Product" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            size="x-large"
            color="#4f3428"
            @click="$emit('find', product.name)"
            v-bind="props"
            :disabled="product.amount <= 0"
            icon="mdi-magnify"
          ></v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: Object,
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