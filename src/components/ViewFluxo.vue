<template>
  <v-card style="height: 100%" :class="full ? 'full' : false">
    <div id="drawflow">
      <div
        style="position: absolute; z-index: 1; width: 100%"
        class="pa-3 d-flex justify-space-between"
      >
        <v-btn color="primary" @click="dialog = !dialog"
          >Adicionar Atividade
        </v-btn>
        <v-chip class="mr-12"> {{ name }} </v-chip>
      </div>

      <v-card
        class="d-flex flex-column"
        style="position: absolute; right: 0; z-index: 1"
        :style="!full ? { right: '-3.5rem' } : false"
      >
        <v-btn @click="$df.zoom_in()" x-large icon color="primary">
          <v-icon>mdi-magnify-plus-outline</v-icon>
        </v-btn>
        <!-- <v-btn @click="$df.zoom = 1" x-large icon color="primary">
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
        <v-btn @click="$df.zoom_out()" x-large icon color="primary">
          <v-icon>mdi-magnify-minus-outline</v-icon>
        </v-btn>

        <v-btn @click="full = !full" x-large icon color="primary">
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <v-btn @click="fixedEditorNode" x-large icon color="primary">
          <v-icon>{{
            fixed ? "mdi-lock-outline" : "mdi-lock-open-variant-outline"
          }}</v-icon>
        </v-btn>
      </v-card>
      <v-btn
        style="position: absolute; bottom: 0; right: 0; z-index: 1"
        class="ma-8"
        color="primary"
        @click="salvar"
        >Salvar
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="600px">
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
                  v-model="nomeAtividade"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="tipoAtividade"
                  :items="tipoAtividades"
                  item-text="description"
                  item-value="id"
                  label="Tipo"
                  required
                ></v-select>
              </v-col>
              <v-col>
                <v-textarea
                  label="Mensagem"
                  v-model="mensagemAtividade"
                  counter
                  filled
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="cadastrarAtividade">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
/*eslint-disable */
import Drawflow from "drawflow";
import styleDrawflow from "drawflow/dist/drawflow.min.css";
import Layout from "@/components/LayoutCreateFluxo.vue";
import Vue from "vue";

export default {
  components: {
    Layout,
  },
  props: {
    id: {
      required: true,
    },
    name: {
      required: true,
    },
    channel: {
      required: true,
    },
    startDate: {
      required: true,
    },
  },
  data() {
    return {
      exportValue: null,
      token: JSON.parse(localStorage.getItem("authUser")).token,

      dialog: false,

      nomeAtividade: "",
      tipoAtividade: "",
      mensagemAtividade: "",

      data: [],

      tipoAtividades: [
        { id: 1, description: "Somente mensagem para envio" },
        { id: 2, description: "Mensagem que aguarda entrada de dados" },
        { id: 3, description: "Integração com API" },
        { id: 4, description: "Recebimento de Anexos" },
        { id: 5, description: "Intervalo de tempo" },
        { id: 6, description: "Atendimento" },
      ],

      fixed: false,
      full: false,

      stepId: 0,
      allStepId: [],

      idAtualizado: null,

      dataAtual: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  methods: {
    listarFluxoPassos() {
      this.$http
        .get(`List_Flow_Steps?Flow_Id=${this.id}`, {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.data = r.data;
          this.$df.addModule("Fluxograma");
          this.$df.changeModule("Fluxograma");

          let posX = 0;
          let posY = 0;
          for (let i = 0; i < r.data.length; i++) {
            // console.log(r.data[i]);
            posX >= 800 ? (posX = 1) : (posX += 380);
            posX <= 800 ? (posY += 200) : false;
            this.$df.registerNode("Fluxo", Layout, {
              // stepId: r.data[i].step_Id,
              // stepName: r.data[i].step_Name,
              // message: r.data[i].step_Message,
            });
            this.$df.addNode(
              r.data[i].step_Id.toString(),
              1,
              r.data[i].transitions.length,

              posX,
              posY,

              r.data[i].step_Id.toString(),
              {
                stepId: r.data[i].step_Id,
                stepName: r.data[i].step_Name,
                stepType: r.data[i].step_Type,
                message: r.data[i].step_Message,
                transitions: r.data[i].transitions,
              },
              "Fluxo",
              "vue"
            );
          }
          for (let i = 0; i < r.data.length; i++) {
            for (let i2 = 0; i2 < r.data[i].transitions.length; i2++) {
              if (r.data[i].transitions[i2].next_Step_Id >= 0) {
                this.connection = i;
                this.$df.addConnection(
                  this.$df.getNodesFromName(r.data[i].step_Id.toString())[0],
                  this.$df.getNodesFromName(
                    r.data[i].transitions[i2].next_Step_Id.toString()
                  )[0],
                  `output_${i2 + 1}`,
                  "input_1"
                );
              }
            }
          }
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          for (let i = 1; i <= this.data.length; i++) {
            this.$df.updateConnectionNodes(`node-${i}`);
          }
        });
    },
    cadastrarAtividade() {
      this.stepId += 1;
      this.$df.registerNode("Fluxo2", Layout, {});
      this.$df.addNode(
        this.stepId.toString(),
        1,
        0,

        100,
        100,

        this.stepId.toString(),
        {
          stepId: this.stepId,
          stepName: this.nomeAtividade,
          stepType: this.tipoAtividade,
          message: this.mensagemAtividade,
          transitions: [],
        },
        "Fluxo2",
        "vue"
      );
      this.dialog = false;
      this.nomeAtividade = "";
      this.tipoAtividade = "";
      this.mensagemAtividade = "";
    },
    fixedEditorNode() {
      if (!this.fixed) {
        this.$df.editor_mode = "fixed";
        this.fixed = true;
      } else {
        this.$df.editor_mode = "edit";
        this.fixed = false;
      }
    },
    async cadastraAtividadeApi(id, nome, tipo, mensagem, index) {
      await this.$http
        .post(
          `Step_Flow_Insert?Flow_Id=${id}&step_Name=${nome}&Step_Type=${tipo}&Step_Message=${mensagem}
          &Initial_Step=${(index-1) == 0 ? 'true' : 'false'}`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then((r) => {
          this.allStepId.push(r.data.id);
          this.$df.drawflow.drawflow["Fluxograma"].data[index].name = r.data.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async cadastrarTransicaoApi(stepId, resposta, nextFlowId, nextStepId) {
      await this.$http
        .post(
          `Step_Transition_Insert?Step_Id=${stepId}&Transition_Value=${resposta}&Next_Flow_Id=${nextFlowId}&Next_Step_Id=${nextStepId}`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          // console.log(r);
        })
        .catch((err) => {
          console.lgo(err);
        });
    },
    async atualizarFluxoApi() {
      await this.$http
        .post(
          `Flow_Update?Flow_Id=${this.id}&Flow_Name=${this.name}&Channel_Id=${this.channel}
          &Start_DateTime=${this.startDate}`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then((r) => {
          this.idAtualizado = r.data.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async salvar() {
      await this.atualizarFluxoApi();
      const data = this.$df.drawflow.drawflow["Fluxograma"].data;
      // console.log(data);
      for (let i in data) {
        await this.cadastraAtividadeApi(
          this.idAtualizado ? this.idAtualizado : this.id,
          data[i].data.stepName,
          data[i].data.stepType,
          data[i].data.message,
          i
        );
      }
      for (let i = 0; i < this.allStepId.length; i++) {
        let idNode = this.$df.getNodesFromName(this.allStepId[i]);
        // console.log(idNode)
        for (let i2 in data[idNode].data.transitions) {
          const connections =
            data[idNode].outputs[`output_${parseInt(i2) + 1}`].connections;
          let output = await connections.map((value) => {
            return this.$df.getNodeFromId(value.node).name;
          });
          // console.log(data[idNode].data.transitions[i2].transition_Value, this.allStepId[i])
          await this.cadastrarTransicaoApi(
            this.allStepId[i],
            data[idNode].data.transitions[i2].transition_Value,
            0,
            output[0] ? output[0] : data[idNode].data.transitions[i2].next_Step_Id
          );
        }
      }
      console.log("Salvo com Sucesso");
      this.allStepId = [];
      this.$router.push(
        {
          name: "view-fluxo",
          params: {
            id: this.idAtualizado,
            name: this.name,
            channel: this.channel,
            startDate: this.startDate,
            // message: this.mensagemFluxo
          },
        },
        () => {}
      );
      location.reload();
    },
  },
  watch: {
    id() {
      this.$df.removeModule("Fluxograma");
      this.listarFluxoPassos();
    },
  },
  mounted() {
    const id = document.getElementById("drawflow");
    Vue.prototype.$df = new Drawflow(id, Vue, this);
    this.$df.start();

    var that = this;
    this.$df.on("connectionCreated", function ({ output_id, output_class }) {
      let conexaoAtual =
        that.$df.getNodeFromId(output_id).outputs[output_class].connections;
      if (conexaoAtual.length > 1) {
        that.$df.removeSingleConnection(
          output_id,
          conexaoAtual[0].node,
          output_class,
          conexaoAtual[0].output
        );
      }
    });

    // console.log(this.$df);

    this.listarFluxoPassos();
  },
};
</script>

<style>
#drawflow {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.full {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}
</style>