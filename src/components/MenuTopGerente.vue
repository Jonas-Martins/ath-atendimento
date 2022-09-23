<template>
  <v-row class="justify-end">
    <v-col
      v-if="$vuetify.breakpoint.width > '960'"
      cols="2"
      align-self="center"
    >
      <v-img
        lazy-src="@/imgs/complementos/enl.png"
        max-width="100"
        src="@/imgs/complementos/enl.png"
      ></v-img>
    </v-col>
    <v-col
      cols="10"
      md="8"
      :class="$vuetify.breakpoint.width > '960' ? 'justify-center' : ''"
      class="d-flex align-center"
      ><b style="font-size: 1.2rem">{{ nomePagina }}</b></v-col
    >
    <v-col cols="2" class="d-flex justify-end align-center">
      <v-badge bordered color="primary" content="6" overlap>
        <v-icon> mdi-bell </v-icon>
      </v-badge>
      <span v-if="$vuetify.breakpoint.width > '960'" class="pl-5"
        >Olá {{ user }}!</span
      >
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
    <TrocarSenha
      v-if="alterarSenha"
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
  data() {
    return {
      perfilClick: [
        { title: "Alterar Senha", cod: "alterarSenha" },
        { title: "Sair", cod: "sair" },
      ],

      alterarSenha: false,

      token: JSON.parse(localStorage.getItem("authUser")).token,
      passExpired: JSON.parse(localStorage.getItem("authUser")).pass_Expired,
      user: JSON.parse(localStorage.getItem("authUser")).user_Name,
      startAtt: JSON.parse(localStorage.getItem("authUser")).start_Att,
      endAtt: JSON.parse(localStorage.getItem("authUser")).end_Att,
    };
  },
  methods: {
    funcoesPerfilClick(item) {
      if (item.cod == "alterarSenha") {
        this.alterarSenha = true;
      } else if (item.cod == "sair") {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem("authUser");
      localStorage.removeItem("convAtual");
      this.$router.push({ name: "home" });
    },
  },
  computed: {
    nomePagina() {
      if (this.$route.name == "listaOperadores") {
        return "Lista dos Operadores";
      } else if (this.$route.name == "cadastro") {
        return "Novo Operador";
      } else if (this.$route.name == "painelCliente") {
        return "Painel Cliente";
      } else if (this.$route.name == "atualizar") {
        return "Atualizar Operador";
      }
      return "Painel";
    },
  },
};
</script>

<style scoped>
</style>