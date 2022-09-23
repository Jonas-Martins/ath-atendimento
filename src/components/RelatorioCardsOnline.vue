<template>
  <v-card width="100%" class="d-flex flex-column jusitfy-center align-center">
    <v-card-title><slot></slot></v-card-title>
    <v-card-text style="text-align: center">
      <v-progress-circular
        :rotate="180"
        :size="125"
        :width="15"
        :value="value"
        color="green"
        style="text-align: center"
      >
        {{ online }} <br />
        Online
      </v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    online: {
      type: Number,
      required: true,
      default: 0,
    },
    qt: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      interval: {},
    };
  },
  computed: {
    value() {
      return (this.online * 100) / this.qt;
    },
  },
};
</script>

<style>
</style>