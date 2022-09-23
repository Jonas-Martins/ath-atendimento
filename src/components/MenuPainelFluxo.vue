<template>
  <v-card>
    <v-autocomplete
      v-model="fluxoSearch"
      :items="fluxos"
      item-text="flow_Name"
      return-object
      dense
      filled
      label="Pesquisar"
    ></v-autocomplete>
    <v-list style="max-height: 70vh; overflow: auto" class="mt-n6">
      <v-list-group :value="true" no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Fluxos</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          style="min-height: 0"
          class="d-flex flex-column px-0 py-5"
          v-for="(fluxo, i) in fluxos"
          :key="i"
          link
          @click="
            $router.push(
              {
                name: 'view-fluxo',
                params: {
                  id: fluxo.flow_Id,
                  name: fluxo.flow_Name,
                  channel: fluxo.channel_Id,
                  startDate: fluxo.start_DateTime
                },
              },
              () => {}
            )
          "
        >
          <v-list-item-title>{{ fluxo.flow_Name }}</v-list-item-title>
          <v-list-item-subtitle v-if="fluxo.end_DateTime != '0001-01-01T00:00:00'">
            Data final: {{ fluxo.end_DateTime | formatData }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-btn
      @click="$router.push({ name: 'create-fluxo' }, () => {})"
      color="primary"
      class="mt-1"
      style="float: right"
      >Cadastrar</v-btn
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      token: JSON.parse(localStorage.getItem("authUser")).token,
      fluxos: [],
      fluxoSearch: "",
    };
  },
  methods: {
    listarFluxo() {
      this.$http
        .get(`List_Flow?Active_Flow=true`, {
          headers: {
            accept: "*/*",
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((r) => {
          this.fluxos = r.data.reverse();
        })
        .catch(() => {
          this.logout();
        })
        .finally(() => {
          //this.loading = false
        });
    },
    logout() {
      localStorage.removeItem("authUser");
      localStorage.removeItem("convAtual");
      this.$router.push({ name: "home" });
    },
  },
  filters: {
    formatData(value) {
      if (!value) return "";
      value = value.split("T")[0].split("-").reverse().join("/");
      return value;
    },
  },
  watch: {
    fluxoSearch(value) {
      value != ""
        ? this.$router.push(
            {
              name: "view-fluxo",
              params: {
                id: value.flow_Id,
                name: value.flow_Name,
                channel: value.channel_Id,
                startDate: value.start_DateTime
              },
            },
            () => {}
          )
        : false;
    },
  },
  mounted() {
    this.listarFluxo();
  },
};
</script>

<style>
</style>