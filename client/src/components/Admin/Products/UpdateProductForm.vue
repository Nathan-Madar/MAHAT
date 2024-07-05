<template>
  <v-card
    color="#FFFFE8"
    class="d-flex flex-column"
    width="50vw"
    height="80vh"
    rounded="xl"
  >
    <div style="margin-top: 1.5%; margin-bottom: -1%" class="d-flex">
      <v-spacer />
      <v-card-title style="font-weight: 300; color: #4f3428"
        >UPDATE {{ product.name }}</v-card-title
      >
      <v-spacer />
    </div>
    <v-form ref="form">
      <v-container fluid="false">
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              color="#4f3428"
              style="color: #4f3428;"
              v-model="updatedProduct.name"
              label="Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              v-model="updatedProduct.amount"
              color="#4f3428"
              style="color: #4f3428;"
              label="Amount"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              v-model="updatedProduct.upc"
              color="#4f3428"
              style="color: #4f3428;"
              label="UPC"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              v-model="updatedProduct.restock_at"
              color="#4f3428"
              style="color: #4f3428;"
              label="Restock At"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-autocomplete
              clearable
              label="Category"
              :items="filteredCategories"
              v-model="updatedProduct.category_id"
              color="#4f3428"
              style="color: #4f3428;"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              clearable
              label="Sub-Category"
              :items="filteredSubCategories"
              v-model="updatedProduct.sub_category"
              color="#4f3428"
              style="color: #4f3428;"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              v-model="updatedProduct.image"
              color="#4f3428"
              style="color: #4f3428;"
              label="Image URL"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col
            ><v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              v-model="updatedProduct.cost_price"
              color="#4f3428"
              style="color: #4f3428;"
              label="Cost Price"
            ></v-text-field
          ></v-col>
          <v-col>
            <v-text-field
              v-model="updatedProduct.selling_price"
              color="#4f3428"
              style="color: #4f3428;"
              label="Selling Price"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              clearable
              label="Discount"
              :items="discounts"
              color="#4f3428"
              style="color: #4f3428;"
              v-model="updatedProduct.discount_id"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align-content="end" dense style="margin-bottom: -3%">
          <v-col cols="10">
            <v-textarea
              v-model="updatedProduct.description"
              label="Description"
              rows="3"
              color="#4f3428"
              style="color: #4f3428;"
              no-resize
              hide-details
            ></v-textarea>
          </v-col>
          <v-col align-self="end">
            <v-checkbox
              v-model="updatedProduct.is_hidden"
              color="#4f3428"
              style="color: #4f3428;"
              label="Hidden"
              type="checkbox"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-spacer />

    <v-btn color="#357F8D" variant="tonal" height="7%" @click="validateForm()"
      >Update Product</v-btn
    >
  </v-card>
</template>

<script>
export default {
  props: {
    discounts: Array,
    categories: Array,
    subCategories: Array,
    product: Object,
  },
  data() {
    return {
      updatedProduct: Object.assign({}, this.product),
      isHidden: true,
      rules: {
        required: (value) => !!value || "Field is required",
        email: (value) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Not a valid E-Mail address",
        phone: (value) =>
          /\+?[0-9]{3,5}\-?[0-9]{7}/.test(value) || "Not a valid phone number",
        zip: (value) => /[0-9]{5,7}/.test(value) || "Not a valid zip code",
      },
    };
  },
  methods: {
    async validateForm() {
      const { valid } = await this.$refs.form.validate();

      console.log(this.updatedProduct);

      if (valid) this.$emit("update", this.updatedProduct);
    },
  },
  computed: {
    item() {
      return {
        product_id: this.updatedProduct.product_id,
        name: this.updatedProduct.name,
        amount: parseInt(this.updatedProduct.amount),
        image: this.updatedProduct.image,
        selling_price: parseFloat(this.updatedProduct.selling_price),
        cost_price: parseFloat(this.updatedProduct.cost_price),
        discount_id: parseInt(this.updatedProduct.discount),
        actual_price: 50,
        description: this.updatedProduct.description,
        isHidden: this.isHidden,
        category: this.categories.find(
          (category) => category.id === this.updatedProduct.category_id
        ).name,
        sub_category: this.subCategories.find(
          (subcategory) =>
            subcategory.id === this.updatedProduct.sub_category_id
        ).name,
        sub_category_id: this.updatedProduct.sub_category,
        upc: this.upc,
        restock_at: this.updatedProduct.restock_at,
      };
    },
    filteredCategories() {
      if (this.sub_category === null) {
        return this.categories;
      } else {
        return this.categories.filter(
          (category) =>
            category.id ===
            this.subCategories.find(
              (subcategory) =>
                subcategory.id === this.updatedProduct.sub_category_id
            ).parent_category_id
        );
      }
    },
    filteredSubCategories() {
      if (this.category === null) {
        return this.subCategories;
      } else {
        return this.subCategories.filter(
          (subcategory) =>
            subcategory.parent_category_id === this.updatedProduct.category_id
        );
      }
    },
  },
};
</script>