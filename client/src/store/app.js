// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    products: [],
  }),
  actions: {
    addItem(product) {
      if (this.products.find(e => e.name === product.name)) {
        this.products.filter(e => e.name === product.name)[0].amount = parseInt(this.products.filter(e => e.name === product.name)[0].amount) + 1
      } else {
        let productToCart = Object.create(product)
        productToCart['amount'] = 1
        this.products.push(productToCart)
      }
    },
    clear() {
      this.$reset()
    },
    remove(name) {
      this.products = this.products.filter(function (product) {
        return product.name !== name;
      });
    },
    cleanse() {
      this.products = this.products.filter(p => p.amount > 0)
    }
  },
  getters: {
    totalPrice: (state) => state.products.reduce((n, { actual_price, amount }) => n + actual_price * amount, 0).toFixed(2),
    totalAmount: (state) => state.products.reduce((n, { amount }) => parseInt(n) + parseInt(amount), 0),
  },

})
