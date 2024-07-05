<template>
  <div style="width: 400px" class="d-flex align-content-center justify-end">
    <Transition
      v-on:blur="leave"
      @click="onClickButton"
      mode="out-in"
      :name="showSearch ? 'slide-left' : 'slide-right'"
    >
      <v-btn icon="mdi-magnify" v-if="!showSearch" />
      <v-combobox
        v-else
        width="400px"
        @focusout="showSearch = searchValue != null"
        v-model="searchValue"
        clearable
        ref="input"
        rounded="pill"
        variant="outlined"
        class="align-self-end"
        style="color: #4f3428"
        prepend-inner-icon="mdi-magnify"
        hide-details
        label="Search"
        :search="searcha"
        color="#4F3428"
        item-title="name"
        v-on:keyup.enter="searchAction()"
        @click:prependInner="searchAction()"
        :items="allProducts"
      >
      </v-combobox>
    </Transition>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      showSearch: false,
      searchValue: "",
      allProducts: [],
      searcha: "foo",
    };
  },
  methods: {
    onClickButton() {
      this.showSearch = true;
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }, 1000);
    },
    delay(t, val) {
      return new Promise((resolve) => setTimeout(resolve, t, val));
    },
    searchAction() {
      if (this.searchValue === null || this.searchValue === "") {
        this.$router.push("/");
      } else if (typeof this.searchValue === "object") {
        this.$router.push(`/product?value=${this.searchValue.id}`);
      } else {
        this.$router.push(`/name?value=${this.searchValue}`);
      }
    },
  },
  computed: {
    s() {
      return this.searchValue;
    },
  },
  mounted() {
    axios
      .get(`${this.$serverHost}/products/names`)
      .then((response) => (this.allProducts = response.data.rows))
      .catch((error) => console.log(error));
  },
};
</script>
  
<style>
.slide-left-enter-active {
  transition: all 0.5s ease-out;
}

.slide-left-enter-from {
  transform: translateX(50px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.5s ease-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
  