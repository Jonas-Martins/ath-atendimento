<template>
  <v-dialog v-model="dialog" max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <div color="#9cd9e8" dark rounded x-large v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>
    <v-card>
      <v-card-title class="text-h4 d-flex justify-center pt-10"
        >Entrar</v-card-title
      >
      <v-card-text>
        <v-container>
          <v-row class="mt-5">
            <v-col>
              <v-text-field
                v-model="user"
                :rules="[rules.required]"
                label="Usuário"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                outlined
                dense
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Senha"
                value=""
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox v-model="checkbox" label="Lembrar-me"></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="16">
              <v-btn
                :loading="loadingLogin"
                :disabled="loadingLogin"
                color="primary"
                block
                @click="btnEnviar"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center">
              <EsqueceuSenha>
                <v-btn plain text color="primary" small>
                  Esqueceu a senha?
                </v-btn>
              </EsqueceuSenha>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" :multi-line="multiLine" timeout="3000">
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import EsqueceuSenha from "./EsqueceuSenha.vue";

export default {
  components: { EsqueceuSenha },
  data() {
    return {
      user: "",
      password: "",
      checkbox: true,
      dialog: false,
      show: false,
      rules: {
        required: (value) => !!value || "Campo Obrigatório.",
      },

      multiLine: true,
      snackbar: false,
      textSnackbar: "",

      loadingLogin: false
    };
  },
  computed: {
    password64() {
      return btoa(this.password).split("==")[0];
    },
  },
  methods: {
    btnEnviar() {
      this.loadingLogin = true
      if (this.user.length > 0 && this.password.length > 0) {
        this.$http
          .get(
            `User_Validate?User_Login=${this.user}&User_Pass=${this.password64}`,
            {
              headers: {
                accept: "*/*",
              },
            }
          )
          .then((r) => {
            this.loadingLogin = false
            if (
              r.data.user_Name != null &&
              r.data.start_Att != null &&
              r.data.end_Att != null
            ) {
              localStorage.setItem("authUser", JSON.stringify(r.data));
              this.$router.push({ name: "atendimento" });
            } else {
              this.snackbar = true;
              this.textSnackbar = "Usuário ou senha incorretos";
            }
          })
          .catch(() => {
            this.loadingLogin = false
            this.snackbar = true;
            this.textSnackbar = "Erro ao consultar usuário e senha";
          })
          .finally(() => {
            this.loadingLogin = false
          });
      } else {
        this.loadingLogin = false
        this.snackbar = true;
        this.textSnackbar = "Erro ao consultar usuário e senha";
      }
    },
  },
};
</script>

<style>
</style>