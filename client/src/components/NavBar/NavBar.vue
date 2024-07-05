<template>
  <v-app-bar
    scroll-behavior="elevate"
    color="#9AC3CB"
    @mouseleave="category = null"
    :extension-height="!showExtention ? 0 : 50"
  >
    <v-avatar
      rounded="0"
      @mouseover="category = null"
      @click="$router.push('/')"
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
      v-model="currentCategory"
    >
      <v-btn
        v-for="n in categories"
        :key="n"
        :value="n"
        :active="false"
        class="flex-grow-1"
        :style="
          b == n
            ? 'background-color: #78A8B0; height: 100%; color: #4F3428;'
            : 'background-color: #9AC3CB; height: 100%; color: #4F3428;'
        "
        @click="
          $router.push(`/category?value=${n.id}`);
          console.log(b);
        "
        @mouseover="
          showSubCategories = true;
          category = n;
        "
        @mouseleave="showSubCategories = false"
      >
        {{ n.name }}
      </v-btn>
    </v-btn-toggle>

    <search-bar />

    <v-badge
      v-if="badgeVisible"
      :model-value="!showCart && totalAmount > 0"
      color="#F97B7B"
      offset-x="10"
      offset-y="10"
      :content="amount"
    >
      <v-btn @click="showCart = true" icon="mdi-cart-outline" />
    </v-badge>

    <v-dialog width="50vw" v-model="showCart">
      <cart @close="showCart = false" />
    </v-dialog>

    <v-btn @click="$router.push(`/admin/sales`)" icon="mdi-account-outline" />

    <template v-slot:extension>
      <v-btn-toggle
        style="background-color: #78a8b0; width: 100%; height: 100%"
        v-show="showSubCategories"
        variant=""
        v-model="currentCategory"
        class="d-flex flex-row"
      >
        <v-btn
          v-for="n in subCategoriesComputed"
          :key="n"
          :value="n"
          :active="false"
          class="flex-grow-1"
          style="color: #4f3428"
          @mouseover="
            showSubCategories = true;
            subCategory = n.id;
          "
          @mouseleave="
            showSubCategories = false;
            subCategory = null;
          "
          @click="$router.push(`/subcategory?value=${n.id}`)"
        >
          {{ n.name }}
        </v-btn>
      </v-btn-toggle>
    </template>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/store/app";
import SearchBar from "./SearchBar.vue";
import Cart from "./Cart/Cart.vue";

export default {
  data: () => ({
    showSearch: false,
    searchValue: "",
    currentCategory: null,
    numOfCategories: 4,
    numOfSubCategories: 5,
    showSubCategories: false,
    subCategory: null,
    category: null,
    showCart: false,
    categories: 4,
    subCategories: 4,
    badgeVisible: true,
  }),
  components: {
    "search-bar": SearchBar,
    cart: Cart,
  },
  methods: {
    ...mapActions(useAppStore, ["clear", "remove", "cleanse"]),
  },
  computed: {
    ...mapState(useAppStore, ["totalAmount"]),
    amount() {
      if (this.showCart) {
        return null;
      } else {
        return this.totalAmount;
      }
    },
    subCategoriesComputed() {
      if (this.subCategories == 4) {
        return this.subCategories;
      } else {
        return this.subCategories.filter(
          (sub) => sub.parent_category_id == this.category.id
        );
      }
    },
    showExtention() {
      if (this.$route.fullPath.includes("category")) {
        return true;
      } else {
        return this.showSubCategories;
      }
    },
    b() {
      if (this.$route.fullPath.includes("subcategory")) {
        return this.categories.filter(
          (c) =>
            c.id ==
            this.subCategories.filter((s) => s.id == this.$route.query.value)[0]
              .parent_category_id
        )[0];
      } else if (this.$route.fullPath.includes("category")) {
        return this.categories.filter(
          (c) => c.id == this.$route.query.value
        )[0];
      } else {
        return this.category;
      }
    },
  },
  mounted() {
    axios
      .get(`${this.$serverHost}/categories/category`)
      .then((response) => (this.categories = response.data.rows))
      .catch((error) => console.log(error));
    axios
      .get(`${this.$serverHost}/categories/subcategory`)
      .then((response) => (this.subCategories = response.data.rows))
      .catch((error) => console.log(error));
  },
  watch: {
    totalAmount(newVal, oldVal) {
      if (newVal === 0 && oldVal > 0) {
        this.badgeVisible = false;
        this.$nextTick(() => {
          this.badgeVisible = true;
        });
      }
    },
  },
};
</script>
