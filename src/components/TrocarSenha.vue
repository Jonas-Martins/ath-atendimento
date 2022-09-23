<template>
  <div class="text-center">
    <!-- <v-dialog :persistent="passExpired" v-model="dialog" width="450"> -->
    <v-dialog v-model="dialog" width="450">
      <v-card class="pa-5">
        <v-card-title class="text-h5">
          <v-row class="mt-5" justify->
            <v-col cols="10"> Cadastrar Nova Senha </v-col>
            <v-col class="d-flex justify-end">
              <!-- <v-btn fab dark x-small color="primary" @click="dialog = false">
                  <v-icon small>mdi-close</v-icon>
                </v-btn> -->
            </v-col>
          </v-row>
        </v-card-title>
        <v-col>
          <v-text-field
            :error="errorSenhaOld"
            :hint="errorSenhaOld ? 'Senha Inválida' : ''"
            persistent-hint
            v-model="oldpass"
            label="Senha antiga"
            outlined
            :append-icon="showOld ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showOld ? 'text' : 'password'"
            @click:append="showOld = !showOld"
            dense
          ></v-text-field>
          <v-text-field
            :hint="regrasSenha(password)"
            :error="errorSenha"
            persistent-hint
            v-model="password"
            label="Nova senha"
            outlined
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            dense
          ></v-text-field>
          <v-text-field
            :error="errorSenhaR"
            :hint="errorSenhaR ? 'Senhas estão diferentes' : ''"
            persistent-hint
            v-model="passwordR"
            label="Repita a senha nova"
            outlined
            :append-icon="showR ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showR ? 'text' : 'password'"
            @click:append="showR = !showR"
            dense
          ></v-text-field>
          <v-btn class="mb-10" block color="primary" @click="trocarSenha">
            Enviar
          </v-btn>
          <!-- <v-btn text @click="dialog = false"> Cancelar </v-btn> -->
        </v-col>
      </v-card>
      <v-snackbar v-model="snackbar" :multi-line="multiLine" timeout="3000">
        {{ textSnackbar }}

        <template v-slot:action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: JSON.parse(localStorage.getItem("authUser")).token,
      passExpired: JSON.parse(localStorage.getItem("authUser")).pass_Expired,
      oldpass: "",
      password: "",
      passwordR: "",
      showOld: false,
      show: false,
      showR: false,
      dialog: true,

      dadosSenha: [],
      errorSenhaOld: false,
      errorSenha: false,
      errorSenhaR: false,

      multiLine: true,
      snackbar: false,
      textSnackbar: "",
    };
  },
  methods: {
    regrasSenha(senha) {
      var errorMsg = "";
      if (senha.length >= 8) {
        var errors = [];
        // if(senha.match(/[A-Z]/g) && senha.match(/[0-9]/g) && senha.match(/[!|@|#|$|%|^|&|*|(|)|-|_]/g)){
        //  this.errorSenha = false
        // }
        // else{
        //  this.errorSenha = true
        //  return 'Falta letra MAIÚSCULA, NÚMERO e CARACTER ESPECIAL'
        // }

        if (!senha.match(/[A-Z]/g)) {
          errors.push("Letra Maiúscula");
        }
        if (!senha.match(/[0-9]/g)) {
          errors.push("Número");
        }
        if (!senha.match(/[!|@|#|$|%|^|&|*|(|)|-|_]/g)) {
          errors.push("Caracteres Especias");
        }

        if (errors.length == 0) {
          this.errorSenha = false;
        } else {
          errorMsg = "Falta";
          for (let i = 0; i < errors.length; i++) {
            errorMsg += ` ${errors[i]}, `;
          }
          this.errorSenha = true;
        }
      } else {
        errorMsg = "Minímo 8 caracteres";
      }

      return errorMsg;
    },
    password64(password) {
      return btoa(password).split("==")[0];
    },
    trocarSenha() {
      if (this.passwordR != "" && this.password != "") {
        if (this.password == this.passwordR && this.errorSenha == false) {
          this.errorSenhaR = false;
          if (
            this.password.match(/[A-Z]/g) &&
            this.password.match(/[0-9]/g) &&
            this.password.match(/[!|@|#|$|%|^|&|*|(|)|-|_]/g)
          ) {
            this.$http
              .post(
                `User_Pass_Update?User_Old_Pass=${this.password64(
                  this.oldpass
                )}&User_New_Pass=${this.password64(this.password)}`,
                {},
                {
                  headers: {
                    Authorization: `bearer ${this.token}`,
                  },
                }
              )
              .then((r) => {
                this.dadosSenha = r.data;
                if (this.dadosSenha.user_Name == null) {
                  this.errorSenhaOld = true;
                } else {
                  this.errorSenhaOld = false;
                  //this.dialog = false
                  this.snackbar = true;
                  this.textSnackbar = "Senha alterada com sucesso";
                }
              })
              .catch((error) => {
                console.log(error);
                //this.error = true
              });
          }
        } else {
          this.errorSenhaR = true;
        }
      }
    },
  },
  watch: {
    dialog(dialog) {
      this.$emit("trocarSenha", dialog);
    },
  },
};
</script>

<style>
</style>