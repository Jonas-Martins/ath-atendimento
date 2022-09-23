<template>
  <div>
    <v-btn color="primary" class="pa-4 mr-2" small @click.stop="dialog = true">
      <slot></slot>
    </v-btn>

    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title class="text-h5"> Encerrando Atendimento </v-card-title>
        <v-col cols="12">
          <v-textarea
            v-model="obsAttendence"
            class="mb-n5"
            filled
            label="Comentário"
          >
          </v-textarea>
        </v-col>
        <v-col cols="12">
          <p>Status</p>

          <v-btn-toggle borderless color="primary">
            <v-row>
              <v-col>
                <v-btn-toggle class="d-flex flex-wrap" v-model="completionId">
                  <v-btn
                    class="ma-2"
                    v-for="(item, i) in codigosFechamentos"
                    :key="i"
                  >
                    <span>{{ item.completion_Description }}</span>
                    <!-- <v-icon color="primary" small class="pl-2">
                    mdi-check-bold
                  </v-icon> -->
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-btn-toggle>
        </v-col>
        <v-col cols="12">
          <p>Tipo de cliente</p>
          <v-btn-toggle borderless color="primary">
            <v-btn style="font-size: 30px"> 😀 </v-btn>

            <v-btn style="font-size: 30px"> 😐 </v-btn>

            <v-btn style="font-size: 30px"> ☹️ </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="dialog = false"> Cancelar </v-btn>

          <v-btn
            color="primary"
            text
            @click="[(dialog = false), encerrarAtendimento()]"
          >
            Gravar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["attendenceId"],
  data() {
    return {
      token: JSON.parse(localStorage.getItem("authUser")).token,

      dialog: false,
      codigosFechamentos: [],
      obsAttendence: "",
      completionId: "",

      encerrandoAtendimento: false,
    };
  },
  methods: {
    encerrarAtendimento() {
      this.$http
        .post(
          `User_Att_Close?Attendence_Id=${this.attendenceId}
          &Completion_Id=${this.completionId + 1}
          &Obs_Attendence=${this.obsAttendence.replace(" ", "%20")}`,
          {},
          {
            headers: {
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => {
          this.encerrandoAtendimento = !this.encerrandoAtendimento
          this.$emit("encerrandoAtendimento", [this.encerrandoAtendimento, this.attendenceId]);
        })
        .catch((error) => {
          console.log(error);
          //this.error = true
        });
    },
  },
  mounted() {
    this.$http
      .get("List_Att_Completion_Id", {
        headers: {
          accept: "*/*",
          Authorization: `bearer ${this.token}`,
        },
      })
      .then((r) => {
        this.codigosFechamentos = r.data;
      })
      .catch(() => {
        //this.error = true
      })
      .finally(() => {
        //this.loading = false
      });
  },
};
</script>

<style>
</style>