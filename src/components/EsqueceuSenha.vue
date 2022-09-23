<template>
  <div class="text-center">
    <div class="text-center">
      <v-dialog v-model="dialog" width="550">
        <template v-slot:activator="{ on, attrs }">
          <div color="red lighten-2" dark v-bind="attrs" v-on="on">
            <slot></slot>
          </div>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            <v-row justify->
              <v-col cols="10"> Cadastrar Nova Senha </v-col>
              <v-col class="d-flex justify-end">
                <v-btn fab dark x-small color="primary" @click="dialog = false">
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-col>
            <v-text-field label="E-mail" outlined dense></v-text-field>
            <v-btn color="primary"> Enviar </v-btn>
            <v-btn text @click="dialog = false"> Cancelar </v-btn>
          </v-col>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailRecuperar: "",
      dialog: false,
    };
  },
};
</script>

<style>
</style>