<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="operadores"
      disable-pagination
      hide-default-footer
      class="elevation-1"
    >
      <template #[`item.attendence_Group_Name`]="props">
        <v-edit-dialog
          large
          :return-value.sync="props.item.attendence_Group_Name"
          @save="save(props.item.user_Id)"
        >
          <v-btn @click="detalhesOperador(props.item.user_Id)" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <template v-slot:input>
            <div class="my-4 text-h6">Mudar Grupo</div>
            <v-autocomplete
              v-model="gruposAtual"
              :items="grupos"
              item-text="attendence_Group_Name"
              item-value="attendence_Group_Id"
              dense
              chips
              deletable-chips
              small-chips
              rounded
              solo
              multiple
            >
            </v-autocomplete>
          </template>
        </v-edit-dialog>
      </template>
      <template #[`item.user_Id`]="props">
        <v-btn @click="edit(props.item.user_Id)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-btn
      @click="$router.push({ name: 'cadastro' })"
      style="float: right"
      class="my-2"
      color="primary"
      >Novo Operador</v-btn
    >

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",

      token: JSON.parse(localStorage.getItem("authUser")).token,

      grupos: [],
      gruposAtual: [],

      headers: [
        {
          text: "Login",
          value: "user_Login",
          width: "16%",
          align: "center",
          class: "header",
        },
        {
          text: "Nome Completo",
          value: "user_Name",
          width: "20%",
          align: "center",
          class: "header",
        },
        {
          text: "Início",
          value: "user_Start",
          width: "16%",
          align: "center",
          class: "header",
        },
        {
          text: "Fim",
          value: "user_End",
          width: "16%",
          align: "center",
          class: "header",
        },
        {
          text: "Grupo",
          value: "attendence_Group_Name",
          width: "14%",
          align: "center",
          class: "header",
          sortable: false,
        },
        {
          text: "Editar",
          value: "user_Id",
          width: "14%",
          align: "center",
          class: "header",
          sortable: false,
        },
      ],
      operadores: [],
    };
  },
  methods: {
    edit(id) {
      console.log(id);
      this.$router.push({ name: "atualizar", params: { id: id } });
    },
    detalhesOperador(id) {
      this.$http
        .get(`User_Att_Details?User_Id=${id}`, {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
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
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Mudança Salva";
        })
        .catch(() => {
          //this.error = true
        })
        .finally(() => {
          //this.loading = false
        });
    },
    save(idUser) {
      if (!this.gruposAtual[0].attendence_Group_Id) {
        for (let i = 0; i < this.grupos.length; i++) {
          for (let i2 = 0; i2 < this.grupos.length; i2++) {
            if (this.gruposAtual[i2] != undefined) {
              this.desativarAtivarGrupo(idUser, this.gruposAtual[i2], true);
            } else {
              this.desativarAtivarGrupo(
                idUser,
                this.grupos[i].attendence_Group_Id,
                false
              );
            }
          }
        }
      }
    },
    listaOperadores() {
      this.$http
        .get("User_Att_List", {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.gruposTransferirList();
          this.operadores = r.data;
          this.operadores = this.operadores.filter(function (elem) {
            /* função que remove operadores multiplicados por causa do grupo */ return (
              !this[JSON.stringify(elem.user_Id)] &&
              (this[JSON.stringify(elem.user_Id)] = true)
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
    gruposTransferirList() {
      this.$http
        .get("User_Att_Group_List", {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          //console.log(r.data);
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
  mounted() {
    this.listaOperadores();
  },
};
</script>

<style>
.header :first-child {
  font-size: 17px;
  padding-left: 18px;
  color: black;
}
</style>