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
        >ADD A NEW PRODUCT</v-card-title
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
              v-model="name"
              label="Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              color="#4f3428"
              style="color: #4f3428;"
              validate-on="blur"
              v-model="amount"
              label="Amount"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              color="#4f3428"
              style="color: #4f3428;"
              v-model="upc"
              label="UPC"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              color="#4f3428"
              style="color: #4f3428;"
              v-model="minAmountBeforeRestock"
              label="Restock At"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-autocomplete
              clearable
              label="Category"
              color="#4f3428"
              style="color: #4f3428;"
              base-color="#4f3428"
              item-color="#4f3428"
              :items="filteredCategories"
              v-model="category"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              clearable
              label="Sub-Category"
              color="#4f3428"
              style="color: #4f3428;"
              base-color="#4f3428"
              item-color="#4f3428"
              :items="filteredSubCategories"
              v-model="subCategory"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              color="#4f3428"
              style="color: #4f3428;"
              validate-on="blur"
              v-model="image"
              label="Image URL"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col
            ><v-text-field
              :rules="[rules.required]"
              color="#4f3428"
              style="color: #4f3428;"
              validate-on="blur"
              v-model="costPrice"
              label="Cost Price"
            ></v-text-field
          ></v-col>
          <v-col>
            <v-text-field
              color="#4f3428"
              style="color: #4f3428;"
              v-model="sellingPrice"
              label="Selling Price"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              clearable
              color="#4f3428"
              style="color: #4f3428;"
              label="Discount"
              :items="discounts"
              v-model="discount"
              item-title="name"
              item-value="id"
              base-color="#4f3428"
              item-color="#4f3428"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align-content="end" dense style="margin-bottom: -3%">
          <v-col cols="10">
            <v-textarea
              v-model="description"
              color="#4f3428"
              style="color: #4f3428;"
              label="Description"
              rows="3"
              no-resize
              hide-details
            ></v-textarea>
          </v-col>
          <v-col align-self="end">
            <v-checkbox
              v-model="isHidden"
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
      >Add Product</v-btn
    >
  </v-card>
</template>

<script>
export default {
  props: {
    discounts: Array,
    categories: Array,
    subCategories: Array,
  },
  data() {
    return {
      name: "",
      category: null,
      subCategory: null,
      amount: null,
      upc: "",
      minAmountBeforeRestock: "",
      image: "",
      sellingPrice: "",
      costPrice: "",
      discount: null,
      description: "",
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

      console.log(this.category);

      if (valid) this.$emit("addItem", this.item);
    },
  },
  computed: {
    item() {
      return {
        name: this.name,
        amount: this.amount,
        image: this.image,
        price: this.sellingPrice,
        costPrice: this.costPrice,
        discount_id: this.discount,
        description: this.description,
        isHidden: this.isHidden,
        category: this.categories.find(
          (category) => category.id === this.category
        ).name,
        sub_category: this.subCategories.find(
          (subcategory) => subcategory.id === this.subCategory
        ).name,
        sub_category_id: this.subCategory,
        upc: this.upc,
        minAmountBeforeRestock: this.minAmountBeforeRestock,
      };
    },
    filteredCategories() {
      if (this.subCategory === null) {
        return this.categories;
      } else {
        return this.categories.filter(
          (category) =>
            category.id ===
            this.subCategories.find(
              (subcategory) => subcategory.id === this.subCategory
            ).parent_category_id
        );
      }
    },
    filteredSubCategories() {
      if (this.category === null) {
        return this.subCategories;
      } else {
        return this.subCategories.filter(
          (subcategory) => subcategory.parent_category_id === this.category
        );
      }
    },
  },
};
</script>