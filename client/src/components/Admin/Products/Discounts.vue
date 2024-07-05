<template>
  <v-card
    color="#FFFFE8"
    class="d-flex flex-column"
    width="50vw"
    height="80vh"
    rounded="xl"
  >
    <div style="margin-top: 1.5%; margin-bottom: -2%" class="d-flex">
      <v-spacer />
      <v-card-title style="font-weight: 300; color: #4f3428"
        >DISCOUNTS</v-card-title
      >
      <v-spacer />
    </div>
    <v-card-text style="color: #4f3428" v-if="!editing"
      >New Discount</v-card-text
    >
    <v-card-text style="color: #4f3428" v-else>Edit Discount</v-card-text>

    <v-container>
      <v-row style="margin-bottom: -2%" dense>
        <v-col cols="12" md="6">
          <v-text-field
            color="#4f3428"
            style="color: #4f3428;"
            v-model="discountName"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            color="#4f3428"
            style="color: #4f3428;"
            v-model="discountPercent"
            label="Percent"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="11">
          <v-text-field
            v-model="discountDescription"
            color="#4f3428"
            style="color: #4f3428;"
            label="Description"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <v-tooltip v-if="!editing" text="Add discount" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                size="x-large"
                @click.stop="add()"
                :loading="loading"
                variant="text"
                icon="mdi-plus"
                v-bind="props"
                color="#78A8B0"
              />
            </template>
          </v-tooltip>
          <v-tooltip v-else text="Save discount" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                size="x-large"
                @click.stop="update()"
                :loading="loading"
                variant="text"
                icon="mdi-content-save-check-outline"
                v-bind="props"
                color="#78A8B0"
              />
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>

    <v-card-text style="color: #4f3428;">Existing Discount</v-card-text>

    <v-container style="overflow: auto; height: 100%; width: 100%">
      <v-row v-for="i in discounts.length" :key="i" dense>
        <v-col cols="12">
          <v-card
            :style="updatedRow === i ? 'opacity: 0.5' : ''"
            color="#F2F2DC"
            @click="
              () => {
                if (expand === null || expand !== i) {
                  expand = i;
                } else {
                  expand = null;
                }
              }
            "
          >
            <div class="d-flex flex-no-wrap align-center">
              <v-card-title style="color: #4f3428;">{{ discounts[i - 1].name }}</v-card-title>
              <v-spacer />
              <v-card-title style="color: #4f3428;"
                >{{ Math.floor(discounts[i - 1].percent) }}%</v-card-title
              >
            </div>
            <v-expand-transition>
              <div v-if="expand == i">
                <div class="d-flex flex-no-wrap align-center">
                  <v-card-text style="color: #4f3428;">{{ discounts[i - 1].description }}</v-card-text>
                  <v-spacer />
                  <v-btn
                    v-if="!editing"
                    style="margin-right: -2%"
                    @click.stop="edit(discounts[i - 1], i)"
                    variant="text"
                    icon="mdi-pencil-outline"
                    color="#78A8B0"
                  />
                  <v-btn
                    v-else
                    style="margin-right: -2%"
                    @click.stop="cancelEdit()"
                    variant="text"
                    icon="mdi-pencil-off-outline"
                    color="#78A8B0"
                  />
                  <v-btn
                    @click.stop="tryDelete(discounts[i - 1])"
                    variant="text"
                    icon="mdi-delete-outline"
                    color="#F97B7B"
                  />
                </div>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      width="auto"
      v-model="deletingDiscount"
      transition="dialog-bottom-transition"
      @afterLeave="deletedDiscount = null"
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
                @click="deletingDiscount = false"
              />
            </v-col>
          </v-row>
          <v-row style="padding-bottom: 7%">
            <v-spacer />
            <v-card-subtitle style="color: #4f3428;">
              Delete {{ deletedDiscount.name }} ({{ deletedDiscount.percent }}%)
            </v-card-subtitle>
            <v-spacer />
          </v-row>
        </v-container>
        <v-btn
          @click="deleteDiscount(deletedDiscount)"
          color="#f97b7b"
          variant="tonal"
          >DELETE</v-btn
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    discounts: Array,
  },
  data() {
    return {
      expand: null,
      discountId: null,
      discountName: null,
      discountPercent: null,
      discountDescription: null,
      editing: false,
      updatedRow: null,
      loading: false,
      deletedDiscount: null,
      deletingDiscount: false,
    };
  },
  methods: {
    edit(discount, i) {
      this.discountId = discount.id;
      this.discountName = discount.name;
      this.discountPercent = discount.percent;
      this.discountDescription = discount.description;
      this.editing = true;
      this.updatedRow = i;
    },
    cancelEdit() {
      this.discountId = null;
      this.discountName = null;
      this.discountPercent = null;
      this.discountDescription = null;
      this.editing = false;
      this.updatedRow = null;
    },
    add() {
      this.loading = true;
      axios
        .post(`${this.$serverHost}/discounts/add`, {
          name: this.discountName,
          description: this.discountDescription,
          percent: this.discountPercent,
        })
        .then((res) => {
          this.$emit("add", {
            id: res.data.rows,
            name: this.discountName,
            description: this.discountDescription,
            percent: this.discountPercent,
          });
          this.loading = false;
          this.cancelEdit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update() {
      this.loading = true;
      axios
        .put(`${this.$serverHost}/discounts/update`, {
          id: this.discountId,
          name: this.discountName,
          description: this.discountDescription,
          percent: this.discountPercent,
        })
        .then(() => {
          this.$emit("update", {
            id: this.discountId,
            name: this.discountName,
            description: this.discountDescription,
            percent: this.discountPercent,
          });
          this.loading = false;
          this.cancelEdit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tryDelete(discount) {
      this.deletedDiscount = discount;
      this.deletingDiscount = true;
    },
    deleteDiscount(discount) {
      axios
        .delete(`${this.$serverHost}/discounts/delete`, {
          data: { id: discount.id },
        })
        .then(() => {
          this.deletingDiscount = false;
          this.$emit("delete", discount.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>