<template>
  <div>
    <div v-for="(msg, i) in listaMsgAtendimento" :key="i">
      <div class="d-flex" :class="ladoMsg(msg.message_Direction).justify">
        <v-alert
          :color="ladoMsg(msg.message_Direction).color"
          dark
          dense
          style="max-width: 65%; word-break: break-word"
          :style="
            msg.message_Direction == 0
              ? [{ borderRadius: '15px', borderTopLeftRadius: '0' }]
              : [{ borderRadius: '15px', borderTopRightRadius: '0' }]
          "
        >
          {{ msg.message }}
          <v-chip
            small
            color="#ffffff1f"
            style="float: right; font-size: 13px"
            class="ml-16"
          >
            {{ msg.message_Update.split("T")[0] }}
            {{ msg.message_Update.split("T")[1].substr(0, 8) }}
          </v-chip>
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listaMsgAtendimento: {
      default: null,
    },
  },
  methods: {
    ladoMsg(direcao) {
      if (direcao == 0 || direcao == 1) {
        return { justify: "justify-start", color: "secondary" };
      }
      if (direcao == 2) {
        return { justify: "justify-end", color: "primary" };
      }
    },
  },
};
</script>

<style>
</style>