<template>
  <v-card>
    <v-list>
      <v-list-item
        @click="
          $route.name != 'painelCliente'
            ? $router.push({ name: 'painelCliente' })
            : false
        "
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Painel</v-list-item-title>
      </v-list-item>

      <v-list-item @click="$router.push({ name: 'atendimento' })" link>
        <v-list-item-icon>
          <v-icon>mdi-chat-processing</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Atendimento</v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="
          $route.name != 'listaOperadores'
            ? $router.push({ name: 'listaOperadores' })
            : false
        "
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-headset</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Operadores</v-list-item-title>
      </v-list-item>

      <!-- <v-list-group :value="false" prepend-icon="mdi-headset">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Operadores</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          color="primary"
          @click="
            $route.name != 'cadastro'
              ? $router.push({ name: 'cadastro' })
              : false
          "
          link
        >
          <v-list-item-icon>
            <v-icon class="pl-8">mdi-plus-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="pl-5">Adicionar</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="
            $route.name != 'listaOperadores'
              ? $router.push({ name: 'listaOperadores' })
              : false
          "
          link
        >
          <v-list-item-icon>
            <v-icon class="pl-8">mdi-list-status</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="pl-5">Listar</v-list-item-title>
        </v-list-item>
      </v-list-group> -->

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-chart-areaspline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Relatório</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="
          $router.push(
            {
              name: 'fluxo',
            },
            () => {}
          )
        "
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-sitemap</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Fluxos</v-list-item-title>
      </v-list-item>

      <v-list-item class="mt-16" link>
        <v-list-item-icon>
          <v-icon>mdi-exit-run</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sair</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
</style>