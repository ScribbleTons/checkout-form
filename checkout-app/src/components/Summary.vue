<template>
  <div class="col-span-1 lg:col-span-4 order-first lg:order-last">
    <h4 class="text-3xl text-gray-700 mb-5">Order Summary</h4>
    <div class="p-10 rounded-md shadow bg-white">
      <Item :key="i" v-for="(item, i) in items" :item="item" @removeItem="removeItem(item)" />
    </div>
  </div>
</template>
<script>
import Item from "./Item";
export default {
  name: "Summary",
  props: {
    itemsProp: Array,
  },
  components: {
    Item,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.items = this.itemsProp;
  },
  methods: {
    removeItem(item) {
      this.$emit("adjustPrice", item.price);
    },
  },
};
</script>
