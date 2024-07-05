<template>
  <v-app-bar scroll-behavior="elevate" color="#9AC3CB">
    <v-avatar
      rounded="0"
      image="../../assets/logo.png"
      style="margin: 1%; cursor: pointer"
    ></v-avatar>

    <v-divider thickness="2" inset vertical></v-divider>

    <v-btn-toggle
      style="height: 100%; width: 100%"
      class="d-flex flex-row"
      divided
      variant=""
      density="comfortable"
    >
      <v-btn
        :style="
          $route.fullPath.includes('sales')
            ? 'background-color: #78A8B0; height: 100%; color: #4F3428;'
            : 'background-color: #9AC3CB; height: 100%; color: #4F3428;'
        "
        class="flex-grow-1"
        @click="$router.push(`/admin/sales`)"
        >Sales</v-btn
      >
      <v-btn
        :style="
          $route.fullPath.includes('products')
            ? 'background-color: #78A8B0; height: 100%; color: #4F3428;'
            : 'background-color: #9AC3CB; height: 100%; color: #4F3428;'
        "
        class="flex-grow-1"
        @click="$router.push(`/admin/products`)"
        >Products</v-btn
      >
      <v-btn
        :style="
          $route.fullPath.includes('graphs')
            ? 'background-color: #78A8B0; height: 100%; color: #4F3428;'
            : 'background-color: #9AC3CB; height: 100%; color: #4F3428;'
        "
        class="flex-grow-1"
        @click="$router.push(`/admin/graphs`)"
        >Graphs</v-btn
      >
    </v-btn-toggle>
    <v-btn @click="$router.push(`/`)" icon="mdi-restore" />
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  components: {},
  methods: {},
};
</script>
