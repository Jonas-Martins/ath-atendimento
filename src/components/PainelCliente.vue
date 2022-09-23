<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="6" sm="3" xl="2">
            <RelatorioCards>
              <template v-slot:icon> mdi-headset </template>
              <template v-slot:numero>
                <span>{{ qtOperadores }}</span>
              </template>
              <template v-slot:texto>
                <span>Operadores</span>
              </template>
            </RelatorioCards>
          </v-col>
          <v-col cols="6" sm="3" xl="2">
            <RelatorioCards>
              <template v-slot:icon> mdi-card-account-details </template>
              <template v-slot:numero>
                <span>{{ qtContatos }}</span>
              </template>
              <template v-slot:texto>
                <span>Contatos</span>
              </template>
            </RelatorioCards>
          </v-col>
          <v-col cols="6" sm="3" xl="2">
            <RelatorioCards>
              <template v-slot:icon> mdi-chart-arc </template>
              <template v-slot:numero>
                <span>256</span>
              </template>
              <template v-slot:texto>
                <span>Operações</span>
              </template>
            </RelatorioCards>
          </v-col>
          <v-col cols="6" sm="3" xl="2">
            <RelatorioCards>
              <template v-slot:icon> mdi-chat-processing </template>
              <template v-slot:numero>
                <span>29</span>
              </template>
              <template v-slot:texto>
                <span>Atendimentos</span>
              </template>
            </RelatorioCards>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="3">
        <RelatorioCardsOnline :online="operadoresOnline" :qt="qtOperadores">
          Operadores
        </RelatorioCardsOnline>
        <br />
        <RelatorioCardsOnline :online="contatosOnline" :qt="qtContatos">
          Contatos
        </RelatorioCardsOnline>
      </v-col>
      <v-col cols="12" sm="9"><RelatorioAtendimento /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import RelatorioAtendimento from "@/components/RelatorioAtendimentos.vue";
import RelatorioCards from "@/components/RelatorioCards.vue";
import RelatorioCardsOnline from "./RelatorioCardsOnline.vue";
export default {
  components: {
    RelatorioAtendimento,
    RelatorioCards,
    RelatorioCardsOnline,
  },
  data() {
    return {
      operadoresOnline: 85,
      qtOperadores: 200,

      contatosOnline: 12,
      qtContatos: 20,
    };
  },
};
</script>

<style>
</style>