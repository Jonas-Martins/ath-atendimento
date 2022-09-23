<template>
  <v-row
    :style="{
      height:
        $vuetify.breakpoint.width > '960'
          ? `calc(100vh - 260px)`
          : `calc(100vh - 130px)`,
    }"
  >
    <!-- <v-row
    :style="{
      height:
        $vuetify.breakpoint.width > '960'
          ? `${tamanhoTela}px`
          : `${tamanhoTela + 59 + 86 - 12}px`,
    }"
  > -->
    <v-col v-if="$vuetify.breakpoint.width > '960'" align-self="center">
      <span class="text-h5">Conversa Atual</span>
    </v-col>
    <v-col class="mb-1" style="padding: 0" cols="12">
      <v-banner
        style="height: 51px"
        color="primary"
        dark
        rounded
        single-line
        class="text-h6 d-flex"
      >
        <v-row>
          <v-col align-self="center" class="d-flex align-center">
            <v-btn
              @click="$emit('voltarMenuMobile', true)"
              icon
              v-if="$vuetify.breakpoint.width < '960'"
              class="mr-3"
            >
              <v-icon> mdi-menu-left </v-icon>
            </v-btn>
            <v-icon class="mr-4"> mdi-account </v-icon>
            <span>
              {{ nomeCliente }}
            </span>
          </v-col>
          <v-col
            v-if="
              nomeCliente != 'Conversa não iniciada' &&
              $vuetify.breakpoint.width > '960'
            "
            class="d-flex justify-end"
          >
            <v-btn
              @click="dialogHistorico = true"
              outlined
              class="pa-4 mr-2"
              small
            >
              Histórico
            </v-btn>
          </v-col>
          <v-col
            v-if="
              nomeCliente != 'Conversa não iniciada' &&
              $vuetify.breakpoint.width < '960'
            "
            class="d-flex justify-end"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text small fab>
                  <v-icon dark> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn
                    @click="dialogHistorico = true"
                    class="pa-4 mr-2"
                    small
                    color="primary"
                  >
                    Histórico
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-banner>
    </v-col>
    <v-col
      cols="12"
      style="
        display: flex;
        flex-direction: column-reverse;
        overflow: auto;
        border-radius: 8px;
        background-color: white;
      "
      :style="{ height: $vuetify.breakpoint.width < 960 ? '100%' : '100%' }"
      class="pa-3"
    >
        <ChatCliente :listaMsgAtendimento="listaMsgAtendimento"></ChatCliente>
    </v-col>
    <v-col class="mt-3 pa-0" cols="12">
      <v-text-field
        :disabled="listaMsgAtendimento.length > 0 ? false : true"
        background-color="white"
        color="primary"
        v-model="message"
        append-outer-icon="mdi-send"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="Mensagem"
        @keyup.enter="sendMessage"
        @click:append-outer="sendMessage"
        @click:clear="clearMessage"
      ></v-text-field>
    </v-col>
    <HistoricoClienteVue
      v-if="dialogHistorico"
      @closeDialog="dialogHistorico = $event"
      :dialog="dialogHistorico"
      :clientId="conversaDados.client_Id"
    ></HistoricoClienteVue>
  </v-row>
</template>

<script>
import HistoricoClienteVue from "./HistoricoCliente.vue";
import ChatCliente from "./ChatCliente.vue";
export default {
  components: {
    HistoricoClienteVue,
    ChatCliente
  },
  props: {
    conversaDados: {
      required: true,
    },
  },
  data() {
    return {
      listaMsgAtendimento: [],
      token: JSON.parse(localStorage.getItem("authUser")).token,
      user: JSON.parse(localStorage.getItem("authUser")).user_Name,
      startAtt: JSON.parse(localStorage.getItem("authUser")).start_Att,
      endAtt: JSON.parse(localStorage.getItem("authUser")).end_Att,

      convAtual: JSON.parse(localStorage.getItem("convAtual")),

      password: "Password",
      show: false,
      message: "",
      marker: true,
      iconIndex: 0,

      // tamanhoTelaAtual: innerHeight - 70.42 - 56 - 57 - 86,

      enviarMsg: false,

      interval: null,

      connection: null,

      dialogHistorico: false,
    };
  },
  methods: {
    listar() {
      this.$http
        .get(
          `User_Att_Messages_List?Attendence_Id=${
            this.conversaDados.attendence_Id
              ? this.conversaDados.attendence_Id
              : this.idConversa
          }`,
          {
            headers: {
              accept: "*/*",
              Authorization: `bearer ${this.token}`,
            },
          }
        )
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
    // verificarMudanca() {
    //   this.$http
    //     .get(
    //       `User_Att_Messages_List?Attendence_Id=${
    //         this.conversaDados.attendence_Id
    //           ? this.conversaDados.attendence_Id
    //           : this.idConversa
    //       }`,
    //       {
    //         headers: {
    //           accept: "*/*",
    //           Authorization: `bearer ${this.token}`,
    //         },
    //       }
    //     )
    //     .then((r) => {
    //       if (this.listaMsgAtendimento.length != r.data.length) {
    //         this.listaMsgAtendimento = r.data;
    //       }
    //     })
    //     .catch(() => {
    //       this.logout();
    //       //console.log(error);
    //       //this.error = true
    //     })
    //     .finally(() => {
    //       //this.loading = false
    //     });
    // },
    logout() {
      localStorage.removeItem("authUser");
      localStorage.removeItem("convAtual");
      this.$router.push({ name: "home" });
    },
    sendMessage() {
      if (this.message != "") {
        this.$http
          .post(
            `User_Att_Messages_Send?Attendence_Id=${
              this.conversaDados.attendence_Id
                ? this.conversaDados.attendence_Id
                : this.idConversa
            }&Message=${this.message}`,
            {},
            {
              headers: {
                Authorization: `bearer ${this.token}`,
              },
            }
          )
          .then(() => {
            this.listar();
            this.enviarMsg = !this.enviarMsg;
            this.$emit("enviarMensagem", this.enviarMsg);
            this.clearMessage();
          })
          .catch((error) => {
            console.log(error);
            //this.error = true
          });
      }
    },
    clearMessage() {
      //this.resetIcon()
      this.message = "";
    },
    // resetIcon () {
    //     this.iconIndex = 0
    // },
    // changeIcon () {
    //     this.iconIndex === this.icons.length - 1
    //     ? this.iconIndex = 0
    //     : this.iconIndex++
    // },
    sendMessageTeste: function (message) {
      console.log(this.connection);
      this.connection.send(message);
    },
  },
  computed: {
    // tamanhoTela() {
    //   var that = this;
    //   window.addEventListener(
    //     "resize",
    //     function () {
    //       that.tamanhoTelaAtual = innerHeight - 70.42 - 56 - 57 - 86;
    //     },
    //     true
    //   );
    //   return this.tamanhoTelaAtual;
    // },
    icon() {
      return this.icons[this.iconIndex];
    },
    idConversa() {
      if (this.convAtual) {
        return JSON.parse(localStorage.getItem("convAtual")).attendence_Id;
      }

      return 0;
    },
    nomeCliente() {
      if (this.conversaDados.client_Name) {
        return this.conversaDados.client_Name;
      } else {
        return this.convAtual
          ? this.convAtual.client_Name
          : "Conversa não iniciada";
      }
    },
  },
  watch: {
    conversaDados() {
      this.listar();
    },
    // listaMsgAtendimento() {
    //   // funciona mas deixa o sistema bem lerdo
    //   this.verificarMudanca();
    // },
  },
  created() {
    // console.log("Starting connection to WebSocket Server");
    // this.connection = new WebSocket("wss://echo.websocket.org");
    // this.connection.onmessage = function (event) {
    //   console.log(event);
    // };
    // this.connection.onopen = function (event) {
    //   console.log(event);
    //   console.log("Successfully connected to the echo websocket server...");
    // };
  },
  mounted() {
    this.listar();

    this.interval = setInterval(
      function () {
        if (this.listaMsgAtendimento.length > 0) {
          this.listar();
        }
      }.bind(this),
      5000
    );
    // this.interval = setInterval(
    //   function () {
    //     document.location.reload(true);
    //   }.bind(this),
    //   5000
    // );
  },
  beforeDestroy: function () {
    clearInterval(this.interval);
  },
};
</script>

<style>
</style>