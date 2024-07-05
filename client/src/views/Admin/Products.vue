<template>
  <div>
    <div
      style="margin-top: 0.5%"
      class="d-flex flex-no-wrap justify-space-between align-center"
    >
      <v-spacer />
      <p style="color: #4f3428" class="text-h4">Products</p>
      <v-spacer />
    </div>
    <v-container>
      <v-row style="margin-bottom: 1%" dense>
        <v-spacer />
        <v-btn
          rounded="pill"
          variant="tonal"
          color="#357F8D"
          :loading="isCalculating"
          @click="calculateMostNeededRestock(false)"
          >Most Needed Retock</v-btn
        >
        <v-spacer />
      </v-row>
      <v-row dense>
        <v-col md="6">
          <v-combobox
            ref="searchBar"
            v-model="searchValue"
            clearable
            color="#4F3428"
            style="color: #4f3428"
            :focused="f"
            hide-details="true"
            density="compact"
            rounded="pill"
            item-value="name"
            variant="outlined"
            :custom-filter="filterSearch"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            item-title="name"
            v-on:keyup.enter="search"
            @click:prependInner="search"
            :items="productsData"
          />
        </v-col>
        <v-col md="2" />
        <v-col md="2">
          <v-btn
            width="100%"
            variant="tonal"
            color="#357F8D"
            @click="discount = true"
          >
            Discounts
          </v-btn>
        </v-col>
        <v-col md="2">
          <v-btn
            color="#357F8D"
            width="100%"
            variant="tonal"
            @click="add = true"
          >
            Add Product
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col v-for="i in filteredProducts.length" :key="i" cols="12">
          <product
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
            :product="Object.assign({}, filteredProducts[i - 1])"
            :discounts="discounts"
            :categories="categories"
            :subCategories="subCategories"
            @update="(updatedProduct) => update(updatedProduct)"
            @updateAmount="
              (updatedProduct) =>
                updateAmount(updatedProduct.productId, updatedProduct.amount)
            "
          />
        </v-col>
      </v-row>
    </v-container>
    <v-dialog transition="dialog-bottom-transition" v-model="add" width="auto">
      <add-product-form
        @addItem="(item) => addItemToList(item)"
        :discounts="discounts"
        :categories="categories"
        :subCategories="subCategories"
      />
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="discount"
      width="auto"
    >
      <discount-popup
        @add="(item) => addDiscount(item)"
        @update="(item) => updateDiscount(item)"
        @delete="(id) => deleteDiscount(id)"
        :discounts="discounts"
      />
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="showMostNeededRestock"
      width="auto"
    >
      <most-needed-details
        :product="mostNeededRestock"
        @retry="calculateMostNeededRestock(true)"
        @find="(name) => findMostNeededRestock(name)"
      />
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Product from "@/components/Admin/Products/Product.vue";
import AddProductForm from "@/components/Admin/Products/AddProductForm.vue";
import Discounts from "@/components/Admin/Products/Discounts.vue";
import MostNeededRestockVue from "@/components/Admin/Products/MostNeededRestock.vue";

export default {
  components: {
    "add-product-form": AddProductForm,
    product: Product,
    "discount-popup": Discounts,
    "most-needed-details": MostNeededRestockVue,
  },
  data() {
    return {
      expand: null,
      productsData: [],
      add: false,
      discounts: [],
      categories: [],
      subCategories: [],
      discount: false,
      searchValue: null,
      filteredProducts: [],
      f: false,
      isCalculating: false,
      mostNeededRestock: null,
      showMostNeededRestock: false,
    };
  },
  methods: {
    findMostNeededRestock(name) {
      this.showMostNeededRestock = false;
      this.searchValue = name;
      this.search();
    },
    calculateMostNeededRestock(retry) {
      if (this.mostNeededRestock === null || retry) {
        this.isCalculating = true;

        axios.get(`${this.$serverHost}/algo/product`).then((res) => {
          this.isCalculating = false;
          this.mostNeededRestock = res.data;
          this.showMostNeededRestock = true;
        });
      } else {
        this.showMostNeededRestock = true;
      }
    },
    addItemToList(item) {
      axios
        .post(`${this.$serverHost}/products/add`, {
          name: item.name,
          amount: item.amount,
          sellingPrice: item.price,
          costPrice: item.costPrice,
          upc: item.upc,
          image: item.image,
          minAmountBeforeRestock: item.minAmountBeforeRestock,
          isHidden: item.isHidden,
          displayQuantity: null,
          displayPrice: null,
          description: item.description,
          category_id: item.sub_category_id,
          discount_id: item.discount_id,
        })
        .then(() => {
          this.loading = false;
          this.productsData.push(item);
          this.add = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update(updatedProduct) {
      let product = this.productsData.filter(
        (product) => product.product_id === updatedProduct.product_id
      )[0];
      product.amount = parseInt(updatedProduct.amount);
      product.name = updatedProduct.name;
      product.restock_at = updatedProduct.restock_at;
      product.upc = updatedProduct.upc;
      product.category = updatedProduct.category;
      product.category_id = updatedProduct.category_id;
      product.sub_category = updatedProduct.sub_category;
      product.sub_category_id = updatedProduct.sub_category_id;
      product.selling_price = updatedProduct.selling_price;
      product.cost_price = updatedProduct.cost_price;
      product.actual_price = updatedProduct.actual_price;
      product.discount_id = updatedProduct.discount_id;
      product.discount_percent = updatedProduct.discount_percent;
      product.discount_description = updatedProduct.discount_description;
      product.discount_origin = updatedProduct.discount_origin;
      product.image = updatedProduct.image;
      product.description = updatedProduct.description;
    },
    updateAmount(id, amount) {
      let product = this.productsData.filter(
        (product) => product.product_id === id
      )[0];

      product.amount = amount;
    },
    filterSearch(itemList, search, item) {
      let filterValue = search.toLowerCase().replace(/[\,\-\_]/g, " ");
      let itemName = item.raw.name.toLowerCase().replace(/[\,\-\_]/g, " ");
      let itemUPC = item.raw.upc;

      if (itemName.includes(filterValue) || itemUPC.includes(filterValue)) {
        return true;
      } else {
        return false;
      }
    },
    search() {
      if (this.searchValue === null) {
        this.filteredProducts = this.productsData;
        this.expand = null;
      } else if (typeof this.searchValue === "object") {
        this.filteredProducts = [this.searchValue];
        this.expand = 1;
      } else {
        this.filteredProducts = this.productsData.filter((product) => {
          let filterValue = this.searchValue
            .toLowerCase()
            .replace(/[\,\-\_]/g, " ");
          let itemName = product.name.toLowerCase().replace(/[\,\-\_]/g, " ");
          let itemUPC = product.upc;

          if (itemName.includes(filterValue) || itemUPC.includes(filterValue)) {
            return true;
          } else {
            return false;
          }
        });
        this.expand = null;
      }

      this.$refs.searchBar.blur();

      this.f = false;
    },
    addDiscount(discount) {
      this.discounts.push(discount);
    },
    updateDiscount(updatedDiscount) {
      let discount = this.discounts.filter(
        (filteredDiscount) => filteredDiscount.id === updatedDiscount.id
      )[0];

      discount.name = updatedDiscount.name;
      discount.description = updatedDiscount.description;
      discount.percent = parseFloat(updatedDiscount.percent);
    },
    deleteDiscount(id) {
      this.discounts = this.discounts.filter(
        (filteredDiscount) => filteredDiscount.id != id
      );
    },
  },
  mounted() {
    this.load = true;
    axios
      .get(`${this.$serverHost}/products/admin`)
      .then((response) => {
        this.productsData = response.data.rows;
        this.filteredProducts = this.productsData;
      })
      .then(() => (this.load = false))
      .catch((error) => console.log(error));
    axios
      .get(`${this.$serverHost}/discounts/`)
      .then((response) => (this.discounts = response.data.rows))
      .then(() => (this.load = false))
      .catch((error) => console.log(error));
    axios
      .get(`${this.$serverHost}/categories/category/`)
      .then((response) => (this.categories = response.data.rows))
      .then(() => (this.load = false))
      .catch((error) => console.log(error));
    axios
      .get(`${this.$serverHost}/categories/subcategory/`)
      .then((response) => (this.subCategories = response.data.rows))
      .then(() => (this.load = false))
      .catch((error) => console.log(error));
  },
};
</script>