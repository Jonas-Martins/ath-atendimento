<template>
  <v-row justify="center">
    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Histórico</v-toolbar-title>
        </v-toolbar>
        <v-row class="ma-0 justify-center">
          <v-col
            cols="4"
            style="max-height: calc(100vh - 74px); overflow: auto"
          >
            <v-card v-for="(item, i) in historico" :key="i">
              <v-list class="pa-5 ma-3">
                <v-list-item-title>
                  Descrição:
                  {{ item.completion_Description }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Inicío do Atendimento:
                  {{ item.start_DateTime }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Términio do Atendimento:
                  {{ item.end_DateTime }}
                </v-list-item-subtitle>

                <v-btn color="primary" @click="listar(item.attendence_Id)">
                  Ver Mensagem <v-icon class="ml-3">mdi-magnify</v-icon>
                </v-btn>
              </v-list>
            </v-card>
          </v-col>
          <v-col class="mt-3" cols="8">
            <v-card
              v-if="listaMsgAtendimento"
              class="pa-4"
              max-height="cacl(100vh - 110px)"
              height="calc(100vh - 110px)"
              style="overflow: auto"
            >
              <ChatCliente
                :listaMsgAtendimento="listaMsgAtendimento"
              ></ChatCliente>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ChatCliente from "./ChatCliente.vue";
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    clientId: {
      required: true,
    },
  },
  components: {
    ChatCliente,
  },
  data() {
    return {
      historico: [],
      token: JSON.parse(localStorage.getItem("authUser")).token,

      listaMsgAtendimento: null,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    listarHistorico() {
      this.$http
        .get(`History_Att?Client_Id=${this.clientId}`, {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.historico = r.data;
          // console.log(r.data);
        })
        .catch((err) => {
          console.log(err);
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    listar(id) {
      this.$http
        .get(`User_Att_Messages_List?Attendence_Id=${id}`, {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.listaMsgAtendimento = r.data;
        })
        .catch(() => {
          this.logout();
          //console.log(error);
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
  },
  watch: {
    dialog() {
      this.listaMsgAtendimento = null;
    },
  },
  mounted() {
    this.listarHistorico();
  },
};
</script>

<style>
</style>