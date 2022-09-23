<template>
  <v-row>
    <template v-if="$vuetify.breakpoint.width > '960'">
      <v-col cols="2" align-self="center">
        <v-img
          lazy-src="@/imgs/complementos/enl.png"
          max-width="100"
          src="@/imgs/complementos/enl.png"
        ></v-img>
      </v-col>
      <v-col
        cols="5"
        align-self="center"
        class="d-flex align-center justify-center"
      >
        <v-switch
          @click="pausa"
          v-model="status"
          inset
          color="primary"
        ></v-switch>
        <span>Situação:</span>
        <v-chip class="ma-2" :color="status ? 'primary' : 'red'" outlined pill>
          <template v-if="status">Disponível</template>
          <template v-else>Indisponível</template>
          <v-icon right v-if="status"> mdi-account </v-icon>
          <v-icon right v-else> mdi-account-off </v-icon>
        </v-chip>
      </v-col>
      <v-col cols="3" align-self="center">
        <div class="d-flex justify-space-between">
          <span>{{ startAtt }}</span>
          <span>{{ endAtt }}</span>
        </div>
        <v-progress-linear
          :value="barraProgresso"
          :color="status ? 'primary' : 'red'"
          buffer-value="0"
          stream
        >
        </v-progress-linear>
        <div v-if="barraProgresso" class="d-flex justify-center">
          <strong>{{ dataAtual.split(" ")[4] }}</strong>
        </div>
      </v-col>
      <v-col cols="2" class="d-flex justify-end align-center">
        <v-badge
          v-if="true == false"
          bordered
          color="primary"
          content="6"
          overlap
        >
          <!-- escondido pois a api de notificação ainda n está pronta -->
          <v-icon> mdi-bell </v-icon>
        </v-badge>
        <span class="pl-5">Olá {{ user }}!</span>
        <v-menu offset-y left transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar class="ml-5" v-bind="attrs" v-on="on">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item
              class="ma-n2"
              v-for="(item, index) in perfilClick"
              :key="index"
            >
              <v-btn
                block
                text
                small
                color="primary"
                @click="funcoesPerfilClick(item)"
              >
                <v-list-item-title style="font-size: 12px">{{
                  item.title
                }}</v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </template>
    <template v-else>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item class="py-2">
          <v-menu offset-y left transition="slide-x-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-avatar v-bind="attrs" v-on="on">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
            </template>
            <v-list>
              <v-list-item
                class="ma-n2"
                v-for="(item, index) in perfilClick"
                :key="index"
              >
                <v-btn
                  block
                  text
                  small
                  color="primary"
                  @click="funcoesPerfilClick(item)"
                >
                  <v-list-item-title style="font-size: 12px">{{
                    item.title
                  }}</v-list-item-title>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-list-item-content>
            <v-list-item-title
              ><v-badge
                v-if="true == false"
                bordered
                color="primary"
                content="6"
                overlap
              >
                <!-- escondido pois a api de notificação ainda n está pronta -->
                <v-icon> mdi-bell </v-icon>
              </v-badge>
              <span class="pl-5">Olá {{ user }}!</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-col
            cols="12"
            align-self="center"
            class="d-flex align-center justify-center"
          >
            <v-switch
              @click="pausa"
              v-model="status"
              inset
              color="primary"
            ></v-switch>
            <span>Situação:</span>
            <v-chip :color="status ? 'primary' : 'red'" outlined pill>
              <template v-if="status">Disponível</template>
              <template v-else>Indisponível</template>
              <v-icon right v-if="status"> mdi-account </v-icon>
              <v-icon right v-else> mdi-account-off </v-icon>
            </v-chip>
          </v-col>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-col cols="12" align-self="center">
            <div class="d-flex justify-space-between">
              <span>{{ startAtt }}</span>
              <span>{{ endAtt }}</span>
            </div>
            <v-progress-linear
              :value="barraProgresso"
              :color="status ? 'primary' : 'red'"
            ></v-progress-linear>
            <div v-if="barraProgresso" class="d-flex justify-center">
              <strong>{{ dataAtual.split(" ")[4] }}</strong>
            </div>
          </v-col>
        </v-list>
      </v-navigation-drawer>
    </template>
    <TrocarSenha
      v-if="alterarSenha || passExpired"
      @trocarSenha="alterarSenha = $event"
    ></TrocarSenha>
  </v-row>
</template>

<script>
import TrocarSenha from "@/components/TrocarSenha.vue";
export default {
  components: {
    TrocarSenha,
  },
  props: {
    menuMobileConfigActive: {
      default: false,
    },
  },
  data() {
    return {
      perfilClick: [
        { title: "Painel Adminstrativo", cod: "painelAdm" },
        { title: "Alterar Senha", cod: "alterarSenha" },
        { title: "Sair", cod: "sair" },
      ],
      status: true,

      listaMsgAtendimento: [],
      token: JSON.parse(localStorage.getItem("authUser")).token,
      passExpired: JSON.parse(localStorage.getItem("authUser")).pass_Expired,
      user: JSON.parse(localStorage.getItem("authUser")).user_Name,
      startAtt: JSON.parse(localStorage.getItem("authUser")).start_Att,
      endAtt: JSON.parse(localStorage.getItem("authUser")).end_Att,

      horaAtual: "",
      dataAtual: "",

      drawer: false,

      alterarSenha: false,
    };
  },
  computed: {
    barraProgresso() {
      let horaNow = this.dataAtual.split(" ")[4];
      return this.horasSegundos(horaNow, this.startAtt, this.endAtt);
      //return horaNow;
    },
  },
  methods: {
    horasSegundos(horasAtual, horasComeco, horasFim) {
      if (horasAtual != undefined) {
        horasAtual = horasAtual.split(":");
        horasComeco = horasComeco.split(":");
        horasFim = horasFim.split(":");

        let segundosAtual =
          parseInt(horasAtual[0] * 3600) +
          parseInt(horasAtual[1]) * 60 +
          parseInt(horasAtual[2]);
        let segundosComeco =
          parseInt(horasComeco[0] * 3600) +
          parseInt(horasComeco[1]) * 60 +
          parseInt(horasComeco[2]);
        let segundosFim =
          parseInt(horasFim[0] * 3600) +
          parseInt(horasFim[1]) * 60 +
          parseInt(horasFim[2]);

        if (segundosAtual >= segundosComeco && segundosAtual <= segundosFim) {
          //console.log('trabalhando')
          let segundosTrabalhado = segundosFim - segundosComeco;
          let segundosAcabarTrabalho = segundosFim - segundosAtual;
          let progressoTrabalho =
            ((segundosAcabarTrabalho * 100) / segundosTrabalhado - 100) * -1;
          return progressoTrabalho;
        }
        // console.log(segundosAtual)
        // console.log(segundosComeco)
        // console.log(segundosFim)
        return 0;
      }
    },
    funcoesPerfilClick(item) {
      if (item.cod == "painelAdm") {
        this.$router.push({ name: "painelCliente" });
      } else if (item.cod == "alterarSenha") {
        this.alterarSenha = true;
      } else if (item.cod == "sair") {
        this.logout();
      }
    },
    pausa() {
      this.$http
        .post(
          `User_Att_Pause?Paused=${this.status}`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          //console.log(r)
        })
        .catch((error) => {
          console.log(error);
          //this.error = true
        });
    },
    logout() {
      localStorage.removeItem("authUser");
      localStorage.removeItem("convAtual");
      this.$router.push({ name: "home" });
    },
  },
  watch: {
    menuMobileConfigActive() {
      this.drawer = true;
    },
    status(status) {
      document.cookie = `pause=${status}`;
    },
  },
  mounted() {
    this.interval = setInterval(
      function () {
        this.dataAtual = Date();
      }.bind(this),
      1000
    );

    if (document.cookie) {
      this.status = eval(document.cookie.split("pause=")[1]);
    }
  },
};
</script>

<style>
</style>