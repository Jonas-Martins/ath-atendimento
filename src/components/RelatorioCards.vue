<template>
  <v-card height="100%" style="overflow: hidden;" class="d-flex align-center pa-3">
    <v-card-title class="pa-0"
      ><v-icon><slot name="icon"></slot></v-icon
    ></v-card-title>
    <div>
      <v-card-text class="pb-2 pl-2 pr-0 text-caption"><b><slot name="numero"></slot></b></v-card-text>
      <v-card-text class="pt-0 pl-2 pr-0 text-body-1"><b><slot name="texto"></slot></b></v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>