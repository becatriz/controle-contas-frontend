<template>
  <div>
    <v-card class="mb-6 mt-9 mx-auto" width="95%" v-show="showForm">
      <v-btn fab color="red" dense dark bottom right top absolute @click="showForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-container>
        <div class="overline mb-4">{{ formTitle }}</div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Nome" v-model="userCurrent.name" outlined dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Username" v-model="userCurrent.username" outlined dense></v-text-field>
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
            <v-text-field label="Email" v-model="userCurrent.email" outlined dense></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn dark dense color="orange" @click="cancel">Cancelar</v-btn>
        <v-btn dark dense color="green" @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <v-data-table :headers="headers" :items="users" class="elevation-1" >
      <template v-slot:top >
        <v-toolbar flat color="gray">
          <v-toolbar-title class="overline mb-4">Usuários Cadastrados</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" dark dense large v-show="!showForm" @click="openForm">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small color="blue" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon
          small
          color="red"
          class="mr-2"
          v-show="!item.active"
          @click="activateInactivate(item)"
        >mdi-block-helper</v-icon>
        <v-icon
          small
          color="green"
          class="mr-2"
          v-show="item.active"
          @click="activateInactivate(item)"
        >mdi-check</v-icon>
      </template>
      <template v-slot:no-data>
        <v-subheader>Nenhum usuário cadastrado</v-subheader>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    showForm: false,
    itemEdit: null,
    users: [],
    userCurrent: {},
    genarationId: 3,
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
    initialize() {
      this.users = [
        {
          id: 0,
          name: "Beca Triz",
          username: "becatriz",
          password: "123",
          email: "beca@gmail.com",
          active: true,
        },
        {
          id: 1,
          name: "Lara Lara",
          username: "lara",
          password: "123",
          email: "lara@gmail.com",
          active: false,
        },
        {
          id: 2,
          name: "Kaka Kaka",
          username: "Kaka",
          password: "123",
          email: "lal@gmail.com",
          active: true,
        },
      ];
    },

    openForm() {
      this.showForm = true;
    },

    activateInactivate(item) {
      item.active = !item.active;
    },

    save() {
      if (this.itemEdit == null) this.addNewUser();
      else this.saveEdit();
      this.cancel();
    },

    saveEdit(){
      for(let i = 0; i < this.users.length; i++ ){
        if(this.users[i].id == this.itemEdit.id){
          this.users.splice(i,1, this.itemEdit);
          break;
        }
      }
      this.showForm = false;
      this.cancel();
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

    addNewUser() {
      let userCopy = {};
      Object.assign(userCopy, this.userCurrent);
      userCopy.id = this.genarationId;
      userCopy.active = true;
      this.users.push(userCopy);
      this.genarationId++;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },
  },
};
</script>

<style>
</style>