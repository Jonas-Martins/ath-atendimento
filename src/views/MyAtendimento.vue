<template>
  <v-container
    class="pb-0"
    style="background-color: #9cd9e875; min-height: 100vh"
    :style="{
      overflow:
        $vuetify.breakpoint.width > '960' || menuMobile == 'conv'
          ? 'hidden'
          : '',
    }"
    fluid
  >
    <v-row style="background-color: #9cd9e8; justify-content: center">
      <v-col class="pa-0" cols="11">
        <MenuTopChat :menuMobileConfigActive="menuMobileConfigActive" />
      </v-col>
    </v-row>
    <v-row style="justify-content: center; height: 100%">
      <v-col
        v-if="
          !($vuetify.breakpoint.width < '960' && menuMobile != 'atendimento')
        "
        class="mr-1"
        cols="12"
        md="4"
      >
        <FilaAtendimento
          @conversaDados="conversaDados = $event"
          @convMobile="menuMobile = $event"
          :enviarMensagem="enviarMensagem"
        />
      </v-col>
      <v-col
        v-if="!($vuetify.breakpoint.width < '960' && menuMobile != 'conv')"
        cols="12"
        md="7"
      >
        <MainChat
          @enviarMensagem="enviarMensagem = $event"
          @voltarMenuMobile="voltarMenuMobile = $event"
          :conversaDados="conversaDados"
        />
      </v-col>
    </v-row>
    <v-row v-if="$vuetify.breakpoint.width < '960' && menuMobile != 'conv'">
      <v-col class="pa-0 ma-0 mt-n11">
        <v-bottom-navigation :value="menuMobileAtual" grow color="primary">
          <v-btn @click="[(menuMobile = 'atendimento')]">
            <span>Atendimento</span>
            <v-icon>mdi-account-group</v-icon>
          </v-btn>
          <v-btn
            :disabled="
              convAtual == null && conversaDados.length == 0 ? true : false
            "
            text
            @click="menuMobile = 'conv'"
          >
            <span>Conversa Atual</span>
            <v-icon
              v-if="
                convAtual == null && conversaDados.length == 0 ? true : false
              "
              >mdi-message-text-lock</v-icon
            >
            <v-icon v-else>mdi-message-text</v-icon>
          </v-btn>
          <v-btn @click="menuMobileConfigActive = !menuMobileConfigActive">
            <span>Configurações</span>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuTopChat from "@/components/MenuTopChat.vue";
import FilaAtendimento from "@/components/FilaAtendimentoChat.vue";
import MainChat from "@/components/MainAtendimentoChat.vue";
export default {
  components: {
    MenuTopChat,
    FilaAtendimento,
    MainChat,
  },
  data() {
    return {
      conversaDados: [],
      convAtual: JSON.parse(localStorage.getItem("convAtual")),
      menuMobile: "atendimento",

      menuMobileConfigActive: null,
      voltarMenuMobile: false,

      enviarMensagem: false,
    };
  },
  computed: {
    menuMobileAtual() {
      if (this.menuMobile == "atendimento") {
        return 0;
      } else if (this.menuMobile == "conv") {
        return 1;
      }
      return 0;
    },
  },
  watch: {
    voltarMenuMobile(voltarMenuMobile) {
      if (voltarMenuMobile) {
        this.menuMobile = "atendimento";
        this.voltarMenuMobile = false;
      }
    },
  },
};
</script>

<style>
body {
  background-color: #9cd9e875;
}
</style>