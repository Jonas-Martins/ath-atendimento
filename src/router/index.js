import Vue from 'vue'
import VueRouter from 'vue-router'

// import Menu from '@/components/MyMenu.vue'
import Home from '@/views/MyHome.vue'
import Chat from '@/views/MyAtendimento.vue'
import MenuPainelGerente from '@/views/PainelGerente.vue'
import Fluxo from '@/views/MyFluxo.vue'

import ListaOperadores from '@/components/ListaOperadores.vue'
import Cadastro from '@/components/NovoCadastro.vue'
import PainelCliente from '@/components/PainelCliente.vue'
import ViewFluxo from '@/components/ViewFluxo.vue'
import CreateFluxo from '@/components/CreateFluxo.vue'

import Error404 from '@/views/ErroR404.vue'

Vue.use(VueRouter)

const routes = [{
  name: 'home',
  path: '/home',
  props: true,
  component: Home,
  meta: { title: 'Home - ATH' }
},
{
  name: 'atendimento',
  path: '/',
  component: Chat,
},
{
  name: 'painel',
  path: '/painel',
  component: MenuPainelGerente,
  children: [
    {
      name: 'listaOperadores',
      path: '/painel/lista-operadores',
      component: ListaOperadores
    },
    {
      name: 'cadastro',
      path: '/painel/cadastro',
      component: Cadastro
    },
    {
      name: 'atualizar',
      path: '/painel/editar/:id',
      props: true,
      component: Cadastro
    },
    {
      name: 'painelCliente',
      path: '/painel/cliente',
      component: PainelCliente
    }
  ]
},
{
  name: 'fluxo',
  path: '/fluxo',
  component: Fluxo,
  children: [
    {
      name: 'view-fluxo',
      path: '/fluxo/view/:id-:name-:channel-:startDate',
      props: true,
      component: ViewFluxo
    },
    {
      name: 'create-fluxo',
      path: '/fluxo/create',
      props: true,
      component: CreateFluxo
    },
  ]
},
{
  name: 'error404',
  path: '/error404',
  component: Error404
},
{
  path: '*',
  redirect: '/error404'
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name != "home" && to.name != "error404" && !localStorage.getItem('authUser')) { // se o user n estiver tentando entrar no /home e n estiver com authUSer ele se redirecionado ao /home, a unica pagina que pode ser acessada sem o authUser é o home
    next({ name: 'home' })
  }
  else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.name.toUpperCase()} - ATH`;
  next();
});
export default router
