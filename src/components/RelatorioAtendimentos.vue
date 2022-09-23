<template>
  <v-card height="100%" class="mx-auto text-center pa-8" color="white">
    <v-row>
      <v-col class="pl-16" style="text-align: left" align-self="center">
        <span class="text-h6"
          ><v-icon>mdi-chart-areaspline</v-icon> Atendimentos Diários
        </span>
      </v-col>
      <v-col style="justify-content: space-evenly" class="d-flex">
        <span class="d-flex align-center"
          >Espera:<v-alert
            class="ma-0 ml-2 text-body-2"
            dense
            border="left"
            text
            color="green"
            >00:00:15</v-alert
          ></span
        >
        <span class="d-flex align-center"
          >Tempo Médio:<v-alert
            class="ma-0 ml-2 text-body-2"
            dense
            border="left"
            text
            color="red"
            >00:00:15</v-alert
          ></span
        >
      </v-col>
      <v-col style="justify-content: space-evenly" class="text-body-1 d-flex align-center" cols="12">
        <span
          ><v-icon small color="grey">mdi-circle</v-icon> Em fila
        </span>
        <span
          ><v-icon small color="green">mdi-circle</v-icon> Em atendimento
        </span>
        <span
          ><v-icon small color="red">mdi-circle</v-icon> Finalizados
        </span>
        <span
          ><v-icon small color="orange">mdi-circle</v-icon> Abandono
        </span>
      </v-col>
      <v-col cols="12">
        <v-card-text>
          <v-sheet class="stackSheet" color="white">
            <v-sparkline
              smooth="5"
              :value="fila"
              color="grey"
              line-width="1"
              padding="10"
              :labels="labels"
              label-size="6"
            ></v-sparkline>
            <v-sparkline
              class="stackSpark"
              smooth="5"
              :value="atendimento"
              color="green"
              line-width="1"
              padding="10"
            ></v-sparkline>
            <v-sparkline
              class="stackSpark"
              smooth="5"
              :value="finalizados"
              color="red"
              line-width="1"
              padding="10"
            ></v-sparkline>
            <v-sparkline
              class="stackSpark"
              smooth="5"
              :value="abandono"
              color="orange"
              line-width="1"
              padding="10"
            ></v-sparkline>
          </v-sheet>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    fila: [0, 2, 5, 9, 5, 10, 3, 5],
    atendimento: [7, 4, 7, 2, 9, 0, 1, 2],
    finalizados: [10, 6, 2, 8, 6, 0, 1, 2],
    abandono: [5, 9, 3, 2, 2, 5, 4, 1],
    labels: ["2h", "5h", "8h", "11h", "14h", "17h", "20h", "23h"],
  }),
};
</script>
<style lang="css" scoped>
.stackSheet {
  position: relative;
}
.stackSpark {
  position: absolute;
  top: 0;
  left: 0;
}
</style>