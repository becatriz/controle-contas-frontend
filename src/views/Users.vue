<template>
  <div>
    <loading v-if="loading" ></loading>
    <v-card class="mb-6 mt-9 mx-auto" width="95%" v-show="showForm">
      <v-btn
        fab
        color="red"
        dense
        dark
        bottom
        right
        top
        absolute
        @click="showForm = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-container>
        <div class="overline mb-4">{{ formTitle }}</div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Nome"
              v-model="userCurrent.name"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Username"
              v-model="userCurrent.username"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Senha"
              v-model="userCurrent.password"
              outlined
              dense
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Email"
              v-model="userCurrent.email"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn dark dense color="orange" @click="cancel">Cancelar</v-btn>
        <v-btn dark dense color="green" @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-6 mt-9 mx-auto" width="95%">
      <v-data-table :headers="headers" :items="users" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="gray">
            <v-toolbar-title class="overline mb-4"
              >Usuários Cadastrados</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              dark
              dense
              large
              v-show="!showForm"
              @click="openForm"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small color="blue" class="mr-2" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon
            small
            color="red"
            class="mr-2"
            v-show="!item.active"
            @click="activateInactivate(item)"
            >mdi-block-helper</v-icon
          >
          <v-icon
            small
            color="green"
            class="mr-2"
            v-show="item.active"
            @click="activateInactivate(item)"
            >mdi-check</v-icon
          >
        </template>
        <template v-slot:no-data>
          <v-subheader>Nenhum usuário cadastrado</v-subheader>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';
import UserService from "../services/User.service";

export default {
  components:{
    Loading
  },

  data: () => ({
    loading: true,
    showForm: false,
    itemEdit: null,
    users: [],
    userCurrent: {},
    headers: [
      {
        text: "Nome",
        value: "name",
      },
      {
        text: "Username",
        value: "username",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Ações",
        value: "actions",
        sortable: false,
      },
    ],
  }),

  computed: {
    formTitle() {
      return this.itemEdit == null ? "Novo Usuário" : "Editar Usuário";
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.loading = true;
      const response = await UserService.findAll();
      this.users = response;
      this.loading = false;
    },

    openForm() {
      this.showForm = true;
    },

    async activateInactivate(item) {
      item.active = !item.active;
      const response = await UserService.update(item);
      if (response.status === 200) {
        alert("Status alterado com sucesso!");
      } else alert("Erro ao alterar status");
      this.initialize();
    },

    save() {
      if (this.itemEdit == null) this.addNewUser();
      else this.saveEdit();

      this.showForm = false;
      this.cancel();
    },

    async saveEdit() {
      const response = await UserService.update(this.itemEdit);
      if (response.status === 200) {
        alert("Atualizado com sucesso!");
      } else alert("Erro ao atualizar");
      this.initialize();
    },

    cancel() {
      this.userCurrent = {};
      this.itemEdit = null;
    },

    editItem(user) {
      let userCopy = {};
      Object.assign(userCopy, user);
      this.itemEdit = userCopy;
      this.userCurrent = userCopy;
      this.showForm = true;
    },

    async addNewUser() {
      let userCopy = {};
      Object.assign(userCopy, this.userCurrent);
      userCopy.active = true;
      const response = await UserService.create(userCopy);
      if (response.status === 201) {
        alert("Salvo com sucesso!");
        this.initialize();
      } else alert("Erro ao cadastrar usuário");
    },
  },
};
</script>

<style>
</style>