<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense >
        <v-list-item link :to="item.route" v-for="(item,index) in routes" :key="index">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Controle de Contas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="active" :label="`Dark`"></v-switch>
    </v-app-bar>
    <v-main >
       <router-view></router-view>
    </v-main>
    <v-footer app>
      <span>Rebeca Lopes &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    routes: [
      {
        name:"Home",
        icon:"mdi-home",
        route:"/"
      },
      {
        name:"Contas",
        icon:"mdi-code-string",
        route:"/accounts"
      },
        {
        name:"Relatórios",
        icon:"mdi-chart-bar",
        route:"/reports"
      },
        {
        name:"Usuários",
        icon:"mdi-account",
        route:"/users"
      }
    ],
    active: false,
    drawer: null,
  }),
  watch: {
    active: {
      handler() {
        if (this.active) {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
      },
    },
  },
};
</script>
<style scoped>
.v-list{
  margin-right: 10px;
}

</style>