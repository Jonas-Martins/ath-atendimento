<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12" md="6">
        <v-card style="height: 100%">
          <v-card-title>Dados Pessoais</v-card-title>
          <v-card-text>
            Login
            <v-text-field
              :disabled="this.id ? true : false"
              v-model="login"
              solo
            ></v-text-field>
            Nome Completo
            <v-text-field v-model="nomeCompleto" solo></v-text-field>
            Senha
            <v-text-field
              :disabled="this.id ? true : false"
              v-model="senha"
              solo
            ></v-text-field>
            Email
            <v-text-field v-model="email" solo></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card style="height: 100%">
          <v-card-title class="pb-0">Situação</v-card-title>
          <v-row>
            <v-col>
              <v-card-text class="py-0">
                <v-col cols="12">
                  <v-radio-group dense v-model="situacaoRadio">
                    <v-radio label="Ativo" :value="true"></v-radio>
                  </v-radio-group>
                  <v-menu
                    ref="menuAtivo"
                    v-model="menuAtivo"
                    :close-on-content-click="false"
                    :return-value.sync="dateAtivo"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateAtivo"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateAtivo" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuAtivo = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuAtivo.save(dateAtivo)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="py-0">
                <v-col cols="12">
                  <v-radio-group dense v-model="situacaoRadio">
                    <v-radio label="Inativo" :value="false"></v-radio>
                  </v-radio-group>
                  <v-menu
                    ref="menuInativo"
                    v-model="menuInativo"
                    :close-on-content-click="false"
                    :return-value.sync="dateInativo"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateInativo"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateInativo" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuInativo = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuInativo.save(dateInativo)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-title>Horário</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
                <v-radio-group multiple dense v-model="diasSemanas" row>
                  <v-radio label="Seg" value="Segunda-Feira"></v-radio>
                  <v-radio label="Ter" value="Terça-Feira"></v-radio>
                  <v-radio label="Qua" value="Quarta-Feira"></v-radio>
                  <v-radio label="Qui" value="Quinta-Feira"></v-radio>
                  <v-radio label="Sex" value="Sexta-Feira"></v-radio>
                  <v-radio label="Sab" value="Sabádo"></v-radio>
                  <v-radio label="Dom" value="Domingo"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <v-menu
                  ref="menuTimeInicio"
                  v-model="menuTimeInicio"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="timeInicio"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="timeInicio"
                      label="Horário de Inicío"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuTimeInicio"
                    v-model="timeInicio"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menuTimeInicio.save(timeInicio)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  ref="menuTimeTermino"
                  v-model="menuTimeTermino"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="timeTermino"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="timeTermino"
                      label="Horário de Término"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuTimeTermino"
                    v-model="timeTermino"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menuTimeTermino.save(timeTermino)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card style="height: 100%">
          <v-card-title>Grupo</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" md="12">
                <v-autocomplete
                  v-model="gruposAtual"
                  :items="grupos"
                  item-text="attendence_Group_Name"
                  item-value="attendence_Group_Id"
                  solo
                  filled
                  multiple
                  chips
                  deletable-chips
                  label="Selecione o Principal"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6" md="12">
                <v-autocomplete
                  v-model="nivelSelecionado"
                  :items="nivelAcesso"
                  deletable-chips
                  solo
                  chips
                  filled
                  :label="
                    nivelSelecionado.length > 0
                      ? nivelSelecionado
                      : 'Nível de Acesso'
                  "
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn
          :block="$vuetify.breakpoint.width < '960' ? true : false"
          color="primary"
          @click="save"
        >
          Salvar
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  data: () => ({
    login: "",
    nomeCompleto: "",
    email: "",
    senha: "",

    dateAtivo: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menuAtivo: false,

    dateInativo: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menuInativo: false,

    situacaoRadio: false,

    grupos: [],
    gruposAtual: [],

    nivelAcesso: ["Supervisor", "Atendimento", "Gerente"],
    nivelSelecionado: "",

    diasSemanas: [],

    timeInicio: null,
    menuTimeInicio: false,

    timeTermino: null,
    menuTimeTermino: false,

    token: JSON.parse(localStorage.getItem("authUser")).token,

    snack: false,
    snackColor: "",
    snackText: "",
  }),
  methods: {
    gruposTransferirList() {
      this.$http
        .get("User_Att_Group_List", {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.grupos = r.data;
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    detalhesOperador() {
      this.$http
        .get(`User_Att_Details?User_Id=${this.id}`, {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.login = r.data.user_Login;
          this.nomeCompleto = r.data.user_Name;
          this.email = r.data.user_Email;
          this.situacaoRadio =
            r.data.user_End == "0001-01-01T00:00:00" ? true : false;
          this.dateAtivo = r.data.user_Start.split("T")[0];
          this.dateInativo =
            r.data.user_End != "0001-01-01T00:00:00"
              ? r.data.user_End.split("T")[0]
              : this.dateInativo;
          this.diasSemanas = [
            "Segunda-Feira",
            "Terça-Feira",
            "Quarta-Feira",
            "Quinta-Feira",
            "Sexta-Feira",
          ];
          this.timeInicio = r.data.start_Att_Time;
          this.timeTermino = r.data.end_Att_Time;
          this.nivelSelecionado = r.data.function_Name;

          this.gruposAtual = r.data.group_List;
          this.gruposAtual = this.gruposAtual.filter(function (elem) {
            /* função que remove operadores multiplicados */ return (
              !this[JSON.stringify(elem.attendence_Group_Id)] &&
              (this[JSON.stringify(elem.attendence_Group_Id)] = true)
            );
          }, Object.create(null));
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    alteraDados() {
      this.$http
        .get(
          `User_Att_Update?User_Id=${
            this.id
          }&User_Name=${this.nomeCompleto.replace(" ", "%20")}
          &User_Start=${this.dateAtivo}&User_Email=${
            this.email
          }&User_Function_Id=${1}
          &Start_Att=${this.timeInicio}&End_Att=${this.timeTermino}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Mudanças salvas com Sucesso";
        })
        .catch((e) => {
          console.log(e);
          this.snack = true;
          this.snackColor = "error";
          this.snackText = "Algo deu errado";
        })
        .finally(() => {
          //this.loading = false
        });
    },
    ativarGrupo(idUser, idGrupo) {
      this.$http
        .get(
          `User_Att_Group_Activate?User_Id=${idUser}&Attendence_Group_Id=${idGrupo}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          //console.log(r.data);
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    desativarGrupo(idUser, idGrupo) {
      this.$http
        .get(
          `User_Att_Group_Deactivate?User_Id=${idUser}&Attendence_Group_Id=${idGrupo}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then((r) => {
          console.log(r);
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    desativarAtivarGrupo(idUser, idGrupo, add) {
      this.$http
        .get(
          `User_Att_Group_Deactivate?User_Id=${idUser}&Attendence_Group_Id=${idGrupo}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          if (add == true) {
            this.ativarGrupo(idUser, idGrupo);
          }
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    save() {
      this.alteraDados();
      if (!this.gruposAtual[0].attendence_Group_Id) {
        for (let i = 0; i < this.grupos.length; i++) {
          for (let i2 = 0; i2 < this.grupos.length; i2++) {
            if (this.gruposAtual[i2] != undefined) {
              this.desativarAtivarGrupo(this.id, this.gruposAtual[i2], true);
            } else {
              this.desativarAtivarGrupo(
                this.id,
                this.grupos[i].attendence_Group_Id,
                false
              );
            }
          }
        }
      }
    },
  },
  mounted() {
    this.gruposTransferirList();
    if (this.id) {
      this.detalhesOperador();
    }
  },
};
</script>

<style>
</style>