<template>
  <v-card color="#F2F2DC">
    <div style="margin-left: 1%" class="d-flex flex-no-wrap align-center">
      <v-avatar rounded="0">
        <v-img @click.stop="dialog = true" :src="product.image" />
      </v-avatar>
      <div>
        <v-card-title
          :style="trueAmount <= 0 ? 'color: #f97b7b;' : 'color: #4f3428;'"
        >
          {{ product.name }}
        </v-card-title>
        <v-card-subtitle style="color: #4f3428">
          Restock when
          {{ product.restock_at }} left
        </v-card-subtitle>
      </div>
      <v-spacer />
      <div
        @click.stop="showAmountModifier = true"
        style="text-align: center; margin-top: 1%"
      >
        <v-card-subtitle style="color: #4f3428;">Stock:</v-card-subtitle>
        <v-card-title
          v-if="!updatingAmount"
          :style="
            product.restock_at - trueAmount > 0
              ? 'color: #f97b7b;padding-top: 0%;'
              : 'color: #4f3428;padding-top: 0%;'
          "
        >
          {{ trueAmount }}
        </v-card-title>
        <v-progress-circular
          v-else
          :size="20"
          :width="2"
          color="#357F8D"
          indeterminate
          style="margin-top: 10%; margin-bottom: 18%"
        ></v-progress-circular>
      </div>
    </div>
    <v-expand-transition>
      <div v-if="expand">
        <v-container>
          <v-row>
            <v-col>
              <v-btn
                :color="hoverCategory ? '#4f3428' : 'transparent'"
                style="
                  background-image: linear-gradient(
                    to bottom,
                    #f2f2dc,
                    #dedbc6
                  );
                "
                @click.stop
                height="100%"
                width="100%"
                variant="tonal"
                @mouseover="hoverCategory = true"
                @mouseleave="hoverCategory = false"
              >
                <div>
                  <v-card-subtitle style="color: #4f3428; margin-top: -1%"
                    >Category</v-card-subtitle
                  >
                  <v-card-title
                    style="
                      color: #4f3428;
                      margin-bottom: -1%;
                      padding-top: 0%;
                      padding-bottom: 0%;
                    "
                    >{{ product.category }} -
                    {{ product.sub_category }}</v-card-title
                  >
                </div>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                :color="hoverUPC ? '#4f3428' : 'transparent'"
                style="
                  background-image: linear-gradient(
                    to bottom,
                    #f2f2dc,
                    #dedbc6
                  );
                "
                height="100%"
                width="100%"
                variant="tonal"
                @click.stop="copyUPC"
                @mouseover="hoverUPC = true"
                @mouseleave="hoverUPC = false"
              >
                <div>
                  <v-card-subtitle style="color: #4f3428; margin-top: -1%"
                    >UPC</v-card-subtitle
                  >
                  <v-card-title
                    style="
                      color: #4f3428;
                      margin-bottom: -1%;
                      padding-top: 0%;
                      padding-bottom: 0%;
                    "
                    >{{ product.upc }}</v-card-title
                  >
                </div>
              </v-btn>
            </v-col>
          </v-row>
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
                  <v-card-title style="padding-bottom: 0%"
                    >{{ product.cost_price }}$</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 5%"
                    >Cost</v-card-subtitle
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
                    >{{ product.selling_price }}$</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 5%"
                    >Selling</v-card-subtitle
                  >
                </div>
              </v-btn>
            </v-col>
            <v-col v-if="product.discount_id != null">
              <v-btn
                @click.stop="showDiscount = true"
                color="#4f3428"
                height="100%"
                width="100%"
                variant="tonal"
              >
                <div>
                  <v-card-title style="padding-bottom: 0%"
                    >{{ product.actual_price }}$</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 5%"
                    >After Discount</v-card-subtitle
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
                  <v-card-title
                    :style="
                      isProfit
                        ? 'color: #8eb04a;padding-bottom: 0%;'
                        : 'color: #f97b7b;padding-bottom: 0%;'
                    "
                    >{{
                      Math.floor(
                        ((product.actual_price - product.cost_price) * 100) /
                          product.cost_price
                      )
                    }}%</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 5%"
                    >Revenue Percent</v-card-subtitle
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
                  <v-card-title
                    :style="
                      isProfit
                        ? 'color: #8eb04a;padding-bottom: 0%;'
                        : 'color: #f97b7b;padding-bottom: 0%;'
                    "
                    >{{
                      (product.actual_price - product.cost_price).toFixed(2)
                    }}$</v-card-title
                  >
                  <v-card-subtitle style="padding-bottom: 5%"
                    >Revenue</v-card-subtitle
                  >
                </div>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="d-flex flex-no-wrap align-end">
          <v-spacer />
          <v-btn
            @click.stop="update = true"
            style="margin-right: 0.5%; margin-bottom: -0.25%"
            color="#357F8D"
            size="x-large"
            variant="plain"
            icon="mdi-pencil-outline"
          />
        </div>
      </div>
    </v-expand-transition>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="update"
      width="auto"
    >
      <update-product-form
        :discounts="discounts"
        :categories="categories"
        :subCategories="subCategories"
        :product="Object.assign({}, product)"
        @update="(product) => updateProduct(product)"
      />
    </v-dialog>

    <v-dialog
      width="auto"
      v-model="showDiscount"
      transition="dialog-bottom-transition"
    >
      <v-card width="25vw" rounded="xl" color="#FFFFE8">
        <v-container>
          <v-row>
            <v-spacer />
            <v-card-title style="color: #4f3428">
              {{ product.discount_description }}
            </v-card-title>
            <v-spacer />
          </v-row>
          <v-row>
            <v-spacer />
            <v-card-text style="text-align: center; color: #4f3428">
              {{ product.discount_percent }}% 0ff
            </v-card-text>
            <v-spacer />
          </v-row>
          <v-row>
            <v-spacer />
            <v-card-text style="text-align: center; color: #4f3428">
              {{ product.discount_origin }} DISCOUNT
            </v-card-text>
            <v-spacer />
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog
      width="auto"
      v-model="showAmountModifier"
      transition="dialog-bottom-transition"
      @afterLeave="updateAmount"
    >
      <v-card width="25vw" rounded="xl" color="#FFFFE8">
        <v-container style="padding-bottom: 0%">
          <v-row>
            <v-col style="padding-bottom: 0%" offset="2" cols="8">
              <v-card-title
                style="color: #4f3428; text-align: center; padding-bottom: 0%"
              >
                {{ product.name }}
              </v-card-title>
            </v-col>
            <v-col style="padding-bottom: 0%" cols="2">
              <v-btn
                style="padding-bottom: 0%"
                color="#f97b7b"
                size="small"
                variant="plain"
                icon="mdi-window-close"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-spacer />
            <v-card-subtitle style="color: #4f3428;"> in stock: </v-card-subtitle>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col offset="4" cols="4">
              <v-text-field
                class="center-text"
                variant="plain"
                type="number"
                color="#4f3428"
                style="color: #4f3428;"
                hide-spin-buttons
                v-model="newAmount"
              >
                <template #append>
                  <v-icon
                    color="#8eb04a"
                    @click="this.newAmount++"
                    icon="mdi-plus"
                  />
                </template>
                <template #prepend>
                  <v-icon
                    color="#f97b7b"
                    @click="this.newAmount--"
                    icon="mdi-minus"
                  />
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn @click="updateAmount" color="#357F8D" variant="tonal"
          >UPDATE</v-btn
        >
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      width="auto"
    >
      <product-details @add="addToCart = true" :product="product" />
    </v-dialog>

    <v-snackbar
      location="bottom right"
      color="#8EB04A"
      timeout="2000"
      v-model="copiedUPC"
      transition="slide-x-reverse-transition"
    >
      UPC copied to clipboard
    </v-snackbar>

    <v-snackbar
      location="bottom right"
      color="#f97b7b"
      timeout="2000"
      v-model="addToCart"
      transition="slide-x-reverse-transition"
    >
      You are in admin view
    </v-snackbar>
  </v-card>
</template>

<script>
import ProductDetails from "../../Products/ProductDetails.vue";
import UpdateProductForm from "./UpdateProductForm.vue";
import axios from "axios";

const minPercentRevenue = 30;
const minRevenue = 200;

export default {
  props: {
    product: Object,
    expand: Boolean,
    discounts: Array,
    categories: Array,
    subCategories: Array,
  },
  components: {
    "product-details": ProductDetails,
    "update-product-form": UpdateProductForm,
  },
  data: () => ({
    dialog: false,
    addToCart: false,
    update: false,
    hoverUPC: false,
    hoverCategory: false,
    showDiscount: false,
    copiedUPC: false,
    showAmountModifier: false,
    newAmount: 0,
    trueAmount: 0,
    updatingAmount: false,
  }),
  methods: {
    updateProduct(updatedProduct) {
      this.update = false;
      axios
        .put(`${this.$serverHost}/products/`, {
          id: updatedProduct.product_id,
          name: updatedProduct.name,
          amount: updatedProduct.amount,
          sellingPrice: updatedProduct.selling_price,
          costPrice: updatedProduct.cost_price,
          upc: updatedProduct.upc,
          image: updatedProduct.image,
          minAmountBeforeRestock: updatedProduct.restock_at,
          isHidden: updatedProduct.is_hidden,
          displayQuantity: null,
          displayPrice: null,
          description: updatedProduct.description,
          category_id: updatedProduct.sub_category_id,
          discount_id: updatedProduct.discount_id,
        })
        .then(() => {
          this.loading = false;
          this.$emit("update", updatedProduct);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    copyUPC() {
      navigator.clipboard.writeText(this.product.upc);
      this.copiedUPC = true;
    },
    updateAmount() {
      this.showAmountModifier = false;

      if (this.trueAmount != this.newAmount) {
        this.updatingAmount = true;

        axios
          .put(`${this.$serverHost}/products/amount`, {
            id: this.product.product_id,
            amount: this.newAmount,
          })
          .then((resolve) => {
            this.trueAmount = this.newAmount;
            this.$emit("updateAmount", {
              productId: this.product.product_id,
              amount: this.trueAmount,
            });
            this.updatingAmount = false;
          });
      }
    },
  },
  computed: {
    isProfit() {
      if (
        Math.floor(
          ((this.product.actual_price - this.product.cost_price) * 100) /
            this.product.cost_price
        ) > minPercentRevenue ||
        this.product.actual_price - this.product.cost_pric > minRevenue
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    product: {
      handler: function (val) {
        this.newAmount = val.amount;
        this.trueAmount = val.amount;
      },
      deep: true,
    },
  },
  mounted() {
    this.newAmount = 0 + this.product.amount;
    this.trueAmount = 0 + this.product.amount;
  },
};
</script>

<style scoped>
.center-text :deep(input) {
  text-align: center;
}
</style>