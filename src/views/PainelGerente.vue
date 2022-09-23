<template>
  <v-container
    class="pb-0"
    style="background-color: #9cd9e875; min-height: 100vh"
    fluid
  >
    <v-row style="background-color: #9cd9e8; justify-content: center">
      <v-col class="pa-0" cols="11">
        <MenuTopGerente />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col :class="$vuetify.breakpoint.width < '960' ? 'pa-0' : ''" style="min-height: 90%" cols="12" md="3">
        <MenuPainelGerente />
      </v-col>
      <v-col :class="$vuetify.breakpoint.width < '960' ? 'pa-0 pt-4' : ''" cols="12" md="8">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuTopGerente from "@/components/MenuTopGerente.vue";
import MenuPainelGerente from "@/components/MenuPainelGerente.vue";
export default {
  components: {
    MenuPainelGerente,
    MenuTopGerente,
  },
};
</script>

<style>
</style>>
