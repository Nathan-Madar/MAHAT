<template>
  <v-card
    class="d-flex flex-column"
    style="height: 58dvh; background-color: #ffffe8"
    density="compact"
    elevated
  >
    <v-card-title class="text-h4" style="color: #4f3428">
      Shipping Detail
    </v-card-title>
    <v-form ref="form">
      <v-container fluid="false">
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              color="#4F3428"
              style="color: #4F3428;"
              validate-on="blur"
              v-model="customersName"
              label="Full Name"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="[rules.required, rules.phone]"
              validate-on="blur"
              color="#4F3428"
              style="color: #4F3428;"
              v-model="customersPhone"
              label="Phone"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              :rules="[rules.required, rules.email]"
              validate-on="blur"
              color="#4F3428"
              style="color: #4F3428;"
              v-model="customersEmail"
              label="Email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="margin-bottom: -2%" dense>
          <v-col>
            <v-text-field
              v-model="customersCountry"
              label="Country"
              color="#4F3428"
              style="color: #4F3428;"
            ></v-text-field>
          </v-col>
          <v-col
            ><v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              v-model="customersCity"
              color="#4F3428"
              style="color: #4F3428;"
              label="City"
            ></v-text-field
          ></v-col>
          <v-col
            ><v-text-field
              :rules="[rules.required, rules.zip]"
              validate-on="blur"
              v-model="customersZip"
              label="Zip"
              color="#4F3428"
              style="color: #4F3428;"
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row dense style="margin-bottom: -3%">
          <v-col>
            <v-text-field
              :rules="[rules.required]"
              validate-on="blur"
              color="#4F3428"
              style="color: #4F3428;"
              v-model="customersAddress"
              label="Address"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-spacer />

    <v-card-actions style="margin-top: -2%" class="mt-auto">
      <v-btn
        color="#357F8D"
        variant="tonal"
        @click="$emit('prevTab')"
        prepend-icon="mdi-chevron-left"
        >Back To Cart</v-btn
      >
      <v-spacer />
      <v-btn
        prepend-icon="mdi-delete-outline"
        color="#F97B7B"
        variant="tonal"
        @click="$refs.form.reset()"
        >Clear Form</v-btn
      >
      <v-btn
        color="#357F8D"
        variant="tonal"
        append-icon="mdi-chevron-right"
        @click="validateForm()"
        >Payment</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    customersName: "",
    customersPhone: null,
    customersEmail: "",
    customersCountry: "",
    customersCity: "",
    customersZip: "",
    customersAddress: "",
    rules: {
      required: (value) => !!value || "Field is required",
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Not a valid E-Mail address",
      phone: (value) =>
        /\+?[0-9]{3,5}\-?[0-9]{7}/.test(value) || "Not a valid phone number",
      zip: (value) => /[0-9]{5,7}/.test(value) || "Not a valid zip code",
    },
  }),
  methods: {
    async validateForm() {
      const { valid } = await this.$refs.form.validate();

      if (valid) this.$emit("nextTab", this.info);
    },
  },
  computed: {
    info() {
      return {
        customersName: this.customersName,
        customersPhone: this.customersPhone,
        customersEmail: this.customersEmail,
        customersCountry: this.customersCountry,
        customersCity: this.customersCity,
        customersZip: this.customersZip,
        customersAddress: this.customersAddress,
      };
    },
  },
};
</script>