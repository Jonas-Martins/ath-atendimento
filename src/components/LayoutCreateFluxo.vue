<template>
  <v-sheet width="250" min-height="250">
    <!-- {{ stepId }}
    {{ id }} -->
    <!-- {{stepType}} -->
    <v-card-title
      style="word-break: break-word"
      class="d-flex justify-space-between"
    >
      {{ stepName }}
      <v-btn @click="dialogEdit = !dialogEdit" icon color="primary">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text> {{ message }} </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-for="(transition, i) in transitions" :key="i">
      <v-chip
        close
        @click:close="excluir(i)"
        :color="transition.next_Step_Id == -1 ? 'red' : 'primary'"
        label
        text-color="white"
      >
        <!-- <v-icon left> mdi-label </v-icon> -->
        <span class="text-truncate">{{ transition.transition_Value }}</span>
      </v-chip>
    </v-card-actions>
    <v-card-actions>
      <v-btn
        style="float: right"
        fab
        x-small
        color="primary"
        @click="dialogResposta = !dialogResposta"
        ><v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialogResposta" max-width="600px">
      <v-card>
        <v-card-title>
          <span style="font-size: 25px">Resposta</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="respota"
                  filled
                  counter
                  label="Mensagem"
                ></v-textarea>
                <v-switch
                  class="mt-n4"
                  v-model="finalSwitch"
                  label="Resposta Final?"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogResposta = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="cadastrarRespota">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEdit" max-width="600px">
      <v-card>
        <v-card-title>
          <span style="font-size: 25px">Atividade</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome da Atividade"
                  v-model="stepName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="stepType"
                  :items="tipoAtividades"
                  item-text="description"
                  item-value="id"
                  label="Tipo"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Mensagem"
                  v-model="message"
                  counter
                  filled
                ></v-textarea>
              </v-col>
              <v-col class="mt-n10">
                <div class="d-flex">
                  <v-card-title class="px-0"> Respostas </v-card-title>
                  <v-card-actions>
                    <v-btn
                      style="float: right"
                      fab
                      x-small
                      color="primary"
                      @click="dialogResposta = !dialogResposta"
                      ><v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
                <div v-for="(transition, i) in transitions" :key="i">
                  <v-textarea
                    :label="`Resposta ${i + 1}`"
                    v-model="transitions[i].transition_Value"
                    counter
                    filled
                  ></v-textarea>
                  <v-switch
                    class="mt-n4"
                    v-model="transitions[i].next_Step_Id"
                    :value="-1"
                    label="Resposta Final?"
                  ></v-switch>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEdit = false">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" text @click="atualizarFluxo">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
  
  <script>
export default {
  props: {
    // stepName: {
    //   type: String,
    //   required: true,
    // },
    // message: {
    //   type: String,
    //   required: true,
    // },
  },
  data: () => ({
    dialogEdit: false,
    dialogResposta: false,
    respota: "",

    token: JSON.parse(localStorage.getItem("authUser")).token,

    stepId: "",
    stepName: "",
    stepType: "",
    message: "",
    transitions: [],
    finalSwitch: false,

    id: "",

    excluirResposta: false,

    tipoAtividades: [
      { id: 1, description: "Somente mensagem para envio" },
      { id: 2, description: "Mensagem que aguarda entrada de dados" },
      { id: 3, description: "Integração com API" },
      { id: 4, description: "Recebimento de Anexos" },
      { id: 5, description: "Intervalo de tempo" },
      { id: 6, description: "Atendimento" },
    ],
  }),
  methods: {
    excluir(i) {
      this.$df.removeNodeOutput(this.id, `output_${i + 1}`);
      this.transitions.splice(i, 1);
      this.$df.updateConnectionNodes(`node-${this.id}`);
      this.$df.drawflow.drawflow["Fluxograma"].data[this.id].data.transitions =
        this.transitions;
    },
    async cadastrarRespota() {
      // this.$http
      //   .post(
      //     `Step_Transition_Insert?Step_Id=${this.stepId}&Transition_Value=${this.respota}&Next_Flow_Id=0&Next_Step_Id=0`,
      //     {},
      //     {
      //       headers: {
      //         Authorization: `bearer ${this.token}`,
      //       },
      //     }
      //   )
      //   .then(() => {
      await this.$df.addNodeOutput(this.id);
      await this.transitions.push({
        transition_Value: this.respota,
        next_Flow_Id: 0,
        next_Step_Id: this.finalSwitch ? -1 : 0,
      });
      this.finalSwitch = false
      this.dialogResposta = false;
      this.respota = "";
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      // .finally(() => {
      //   this.$df.updateConnectionNodes(`node-${this.id}`);
      // });
      this.$df.updateConnectionNodes(`node-${this.id}`);
      this.$df.drawflow.drawflow["Fluxograma"].data[this.id].data.transitions =
        this.transitions;
    },
    atualizarFluxo() {
      this.$df.drawflow.drawflow["Fluxograma"].data[this.id].data.message =
        this.message;
      this.$df.drawflow.drawflow["Fluxograma"].data[this.id].data.stepName =
        this.stepName;
      this.$df.drawflow.drawflow["Fluxograma"].data[this.id].data.stepType =
        this.stepType;
      this.$df.drawflow.drawflow["Fluxograma"].data[this.id].data.transitions =
        this.transitions;
      this.dialogEdit = false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const id = this.$el.parentElement.parentElement.id;
      const data = this.$df.getNodeFromId(id.slice(5));
      this.stepId = data.data.stepId;
      this.stepName = data.data.stepName.trim();
      this.stepType = data.data.stepType;
      this.message = data.data.message.trim();
      data.data.transitions
        ? (this.transitions = data.data.transitions)
        : false;
      this.id = data.id;
      // console.log(this.$df.drawflow.drawflow["Fluxograma"].data[this.id].data);
    });
  },
};
</script>