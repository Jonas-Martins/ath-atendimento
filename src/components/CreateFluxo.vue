<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-card style="height: 100%">
          <v-card-title>Dados Gerais</v-card-title>
          <v-card-text>
            Nome Fluxo
            <v-text-field v-model="nome" solo></v-text-field>
            Canal
            <v-select
              solo
              v-model="canal"
              :items="canais"
              item-text="channel_Name"
              item-value="channel_Id"
            ></v-select>
            Mensagem para início do Fluxo
            <v-textarea v-model="mensagemFluxo" counter solo></v-textarea>
            <div class="d-flex">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="dataInicio"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dataInicio"
                    label="Data Início"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dataInicio" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(dataInicio)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="dataFinal"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dataFinal"
                    label="Data Final"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dataFinal" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu2 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu2.save(dataFinal)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </v-card-text>
          <!-- <v-card-title>Atendimento</v-card-title>
          <v-card-text>
            Mensagem chave para o início do Atendimento
            <v-text-field
              v-model="mensagemInicioAtendimento"
              solo
            ></v-text-field>
          </v-card-text> -->
          <v-card-actions style="float: right">
            <v-btn @click="cadastrar" color="primary"> Salvar </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Fechar </v-btn>
      </template>
    </v-snackbar> -->
  </v-container>
</template>
<!-- Flow_Update?Flow_Id=0&Flow_Name=Teste&Channel_Id=1&Identify_Initial_Message=Teste_Att&Attendence_key_var=%2A&Start_DateTime=09%2F09%2F2022 -->
<script>
export default {
  data() {
    return {
      token: JSON.parse(localStorage.getItem("authUser")).token,
      canais: [],

      nome: "",
      canal: "",
      mensagemFluxo: "",

      dataInicio: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dataFinal: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,

      mensagemInicioAtendimento: "",
    };
  },
  methods: {
    async cadastrar() {
      await this.$http
        .post(
          `Flow_Update?Flow_Name=${this.nome}&Channel_Id=${this.canal}&Identify_Initial_Message=${this.mensagemFluxo}&Start_DateTime=${this.dataInicio}&End_DateTime=${this.dataFinal}`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then((r) => {
          this.cadastrarPassosFluxo(r.data.id)
          this.$router.push(
            {
              name: "view-fluxo",
              params: {
                id: r.data.id,
                name: this.nome,
                channel: this.canal,
                startDate: this.dataInicio,
                // message: this.mensagemFluxo
              },
            },
            () => {}
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          location.reload();
        });
    },
    async cadastrarPassosFluxo(id) {
      await this.$http
        .post(
          `Step_Flow_Insert?Flow_Id=${id}&step_Name=Inicío&Step_Type=0&Step_Message=${''/*this.mensagemFluxo*/}&Initial_Step=true`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then((r) => {
          console.log(r.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          //this.loading = false
        });
    },
    listChannel() {
      this.$http
        .get(`List_Channel`, {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.canais = r.data;
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
  },
  mounted() {
    this.listChannel();
  },
};
</script>

<style>
</style>