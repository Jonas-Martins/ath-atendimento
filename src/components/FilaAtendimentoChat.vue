<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.width > '960'" cols="12">
      <span class="text-h5">Fila de Atendimento</span>
    </v-col>
    <v-col cols="12" class="pa-0">
      <v-list>
        <v-list-group :value="false" prepend-icon="mdi-account-group">
          <template v-slot:activator>
            <v-list-item-title>
              <v-badge color="primary" :content="qtMsgSolicitado">
                <span>Aguardando Atendimento</span>
              </v-badge>
            </v-list-item-title>
          </template>
          <template v-if="qtMsgSolicitado > 0">
            <v-list-item
              @click="atenderConversa(item)"
              v-for="(item, i) in listaAtendimentosFila"
              :key="i"
              link
            >
              <v-icon> mdi-chat </v-icon>
              <v-list-item-title class="d-flex justify-center">{{
                item.client_Name
              }}</v-list-item-title>
              <v-list-item class="d-flex flex-row-reverse">
                {{ item.start_Queue.split("T")[0] }}
                {{ item.start_Queue.split("T")[1] }}
              </v-list-item>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item> Vazio </v-list-item>
          </template>
        </v-list-group>
      </v-list>
      <v-list>
        <v-list-group :value="false" prepend-icon="mdi-account-sync">
          <template v-slot:activator>
            <v-list-item-title>
              <v-badge color="primary" :content="qtMinhasMensagens">
                <span>Meus Atendimentos</span>
              </v-badge>
            </v-list-item-title>
          </template>
          <template v-if="qtMinhasMensagens > 0">
            <div
              style="position: relative"
              v-for="(item, i) in listaAtendimentos"
              :key="i"
            >
              <v-row>
                <v-col
                  @click="atenderConversa(item)"
                  cols="11"
                  align-self="center"
                  class="mr-n5"
                >
                  <v-list-item link>
                    <v-icon> mdi-chat </v-icon>
                    <v-row>
                      <v-col
                        style="padding: 0"
                        class="d-flex justify-center"
                        cols="12"
                        lg="6"
                      >
                        <v-list-item-title
                          class="d-flex justify-center align-center"
                        >
                          {{ item.client_Name }}
                        </v-list-item-title>
                      </v-col>
                      <v-col style="padding: 0" cols="12" lg="6">
                        <v-list-item
                          style="
                            margin-top: 0;
                            min-height: 0px;
                            text-align: center;
                          "
                          class="d-flex justify-center align-center"
                        >
                          {{ item.start_Queue.split("T")[0] }}
                          {{ item.start_Queue.split("T")[1] }}
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-col>
                <v-col class="px-0" cols="1" align-self="center">
                  <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" text small fab>
                        <v-icon color="grey"> mdi-dots-vertical </v-icon>
                      </v-btn>
                    </template>
                    <v-list class="d-flex justify-center">
                      <v-list-group style="width: 100%">
                        <template v-slot:activator>
                          <v-icon class="pr-3"> mdi-account-sync </v-icon>
                          <v-list-item-title>Transferência</v-list-item-title>
                        </template>
                        <div>
                          <v-list-item
                            style="z-index: 999; background-color: white"
                            v-for="(grupo, i) in grupos"
                            :key="i"
                            link
                            @click="
                              transferirAtendimento(
                                grupo.attendence_Group_Id,
                                item.attendence_Id
                              )
                            "
                          >
                            <v-list-item-title
                              v-text="grupo.attendence_Group_Name"
                            ></v-list-item-title>
                          </v-list-item>
                        </div>
                      </v-list-group>
                    </v-list>
                    <v-list>
                      <v-list-item>
                        <EncerrarAtendimento
                          @encerrandoAtendimento="
                            encerrandoAtendimento = $event
                          "
                          :attendenceId="item.attendence_Id"
                        >
                          Encerrar
                        </EncerrarAtendimento>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
          </template>
          <template v-else>
            <v-list-item> Vazio </v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-col>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import EncerrarAtendimento from "./EncerrarAtendimento.vue";
export default {
  components: {
    EncerrarAtendimento,
  },
  props: {
    enviarMensagem: {
      default: false,
    },
  },
  data() {
    return {
      grupos: [],

      listaAtendimentos: [],
      listaAtendimentosFila: [],
      userAdm: JSON.parse(localStorage.getItem("authUser")).attendence_Adm,
      token: JSON.parse(localStorage.getItem("authUser")).token,
      user: JSON.parse(localStorage.getItem("authUser")).user_Name,
      startAtt: JSON.parse(localStorage.getItem("authUser")).start_Att,
      endAtt: JSON.parse(localStorage.getItem("authUser")).end_Att,

      conversaDados: [],

      encerrandoAtendimento: null,

      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  methods: {
    atenderConversa(data) {
      this.$emit("convMobile", "conv");
      this.conversaDados = data;
      this.$emit("conversaDados", this.conversaDados);

      this.meusAtendimentos();
      this.aguardaAtendimento();
      //localStorage.setItem("convAtual", JSON.stringify(data)); // salva a conversa no localStorage
    },
    transferirAtendimento(grupoId, clienteId) {
      this.$http
        .post(
          `User_Att_Transfer?Attendence_Id=${clienteId}&Attendence_Group_Id=${grupoId}`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          this.$emit("conversaDados", []);
          this.meusAtendimentos();
          this.aguardaAtendimento();
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Transferido com Sucesso";
        })
        .catch((error) => {
          console.log(error);
          //this.error = true
        });
    },
    meusAtendimentos() {
      this.$http
        .get("User_Att_Active_List", {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          //console.log(r)
          this.listaAtendimentos = r.data;
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    aguardaAtendimento() {
      this.$http
        .get("User_Att_Waitting", {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          //console.log(r.data);
          this.listaAtendimentosFila = r.data;
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    gruposTransferirList() {
      this.$http
        .get("User_Att_Group_List", {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          //console.log(r.data)
          this.grupos = r.data;
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
  },
  computed: {
    qtMsgSolicitado() {
      if (this.listaAtendimentosFila.length > 0) {
        return this.listaAtendimentosFila.length;
      }
      return "0";
    },
    qtMinhasMensagens() {
      if (this.listaAtendimentos.length > 0) {
        return this.listaAtendimentos.length;
      }
      return "0";
    },
  },
  watch: {
    enviarMensagem() {
      let atualizar = this.listaAtendimentosFila.find(
        (elem) => elem.attendence_Id == this.conversaDados.attendence_Id
      );
      if (atualizar) {
        this.meusAtendimentos();
        this.aguardaAtendimento();
      }
    },
    encerrandoAtendimento(elem) {
      if (this.conversaDados.attendence_Id == elem[1]) {
        this.$emit("conversaDados", []);
      }
      this.meusAtendimentos();
      this.aguardaAtendimento();
    },
  },
  mounted() {
    this.meusAtendimentos();
    this.aguardaAtendimento();
    this.gruposTransferirList();
  },
};
</script>

<style>
</style>