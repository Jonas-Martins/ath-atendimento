<template>
  <v-container
    class="pb-0"
    style="background-color: #9cd9e875; min-height: 100vh"
    fluid
  >
    <v-row style="background-color: #9cd9e8; justify-content: center; max-height: 12%;">
      <v-col class="pa-0" cols="11">
        <MenuTopChat />
      </v-col>
    </v-row>
    <v-row justify="center" style="height: 88%;">
      <v-col :class="$vuetify.breakpoint.width < '960' ? 'pa-0' : ''" style="min-height: 90%" cols="12" md="3">
        <MenuPainelFluxo />
      </v-col>
      <v-col :style="$vuetify.breakpoint.width < '960' ? {height: '100vh'} : false" :class="$vuetify.breakpoint.width < '960' ? 'pa-0 pt-4' : ''" cols="12" md="8">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import MenuTopGerente from "@/components/MenuTopGerente.vue";
import MenuPainelFluxo from "@/components/MenuPainelFluxo.vue";
import MenuTopChat from "@/components/MenuTopChat.vue";
export default {
  components: {
    MenuPainelFluxo,
    // MenuTopGerente,
    MenuTopChat
},
};
</script>

<style>
</style>>
