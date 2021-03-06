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
        <div class="overline mb-4">Nova Conta</div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
          <v-menu
          ref="menuDateDialog"
          v-model="menuDateDialog"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Data"
              persistent-hint
              outlined
              dense
               v-bind="attrs"
              prepend-icon="mdi-calendar"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="accountCurrent.date" no-title @input="formatattedDateMenu"></v-date-picker>
        </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Descrição"
              v-model="accountCurrent.description"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              label="Tipo"
              :items="type"
              outlined
              v-model="accountCurrent.type"
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Valor"
              v-model="accountCurrent.value"
              outlined
              dense
              type="number"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Observações"
              v-model="accountCurrent.observation"
              outlined
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="mb-3 mt-0">
        <v-btn dark dense color="orange" @click="cancel">Cancelar</v-btn>
        <v-btn dark dense color="green" @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-6 mt-9 mx-auto" width="95%">
      <v-data-table :headers="headers" :items="accounts" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="gray">
            <v-toolbar-title class="overline mb-4"
              >Contas Cadastradas</v-toolbar-title
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

        <template v-slot:body.append>
          <v-toolbar flat height="30" color="gray">
            <v-toolbar-title>Total:</v-toolbar-title>
            <v-divider class="ml-5 mb-0" inset vertical></v-divider>
            <v-card
              flat
              :class="totalAccounts >= 0 ? 'green--text' : 'red--text'"
            >
              R$ {{ totalAccounts.toFixed(2) }}
            </v-card>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small color="blue" class="mr-2" @click="details(item)"
            >mdi-file-find</v-icon
          >
          <v-icon small color="red" class="mr-2" @click="showDialog(item)"
            >mdi-delete-variant</v-icon
          >
        </template>

         <template v-slot:item.type="{ item }">
          <div :class="item.type === 'Receita' ? 'green--text' : 'red--text'">
            {{item.type}}
          </div>
        </template>

        <template v-slot:item.value="{ item }">
          R$ {{ item.value.toFixed(2) }}
        </template>

          <template v-slot:item.date="{ item }">
           {{ formatattedDate(item.date) }}
        </template>

        <template v-slot:no-data>
          <v-row justify="center">
            <v-subheader>Nenhuma conta cadastrada</v-subheader>
          </v-row>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" persistent max-width="350">
        <v-card>
          <v-card-title class="headline">Remover Conta</v-card-title>
          <v-card-text>Tem certeza que deseja Remover essa conta?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" dark dense @click="dialog = false"
              >Cancelar</v-btn
            >
            <v-btn color="green" text @click="remove">Remover</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDetailsAccount" max-width="700">
        <v-card> 
          <v-card-title class="overline">Detalhes da Conta</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Data"
                  :value="formatattedDate(accountsDetails.date)"
                  outlined
                  dense
                  disabled
                  hide-details
                  style="font-weight:bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Descrição"
                  :value="accountsDetails.description"
                  outlined
                  dense
                  disabled
                  hide-details
                  style="font-weight:bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  label="Tipo"
                  :items="type"
                  outlined
                  :value="accountsDetails.type"
                  dense
                  disabled
                  hide-details
                  style="font-weight:bold"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Valor"
                  :value="accountsDetails.value.toFixed(2)"
                  outlined
                  dense
                  disabled
                  type="number"
                  hide-details
                  style="font-weight:bold"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  label="Observações"
                  v-model="accountsDetails.observation"
                  outlined
                  disabled
                  hide-details
                  style="font-weight:bold"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="dialogDetailsAccount = false"
              >Fechar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import AccountService from '../services/Account.service'
import Loading from '../components/Loading.vue'
import {ISOToBr} from "../util/DateFormatterUtil"

export default {
  components:{
    Loading
  },

  data: () => ({
    dateFormatted: "",
    loading: true,
    menuDateDialog: false,
    showForm: false,
    dialog: false,
    accountRemove: null,
    dialogDetailsAccount: false,
    accountCurrent: {},
    accounts: [],
    accountsDetails: {
      value: 0,
      date:""
    },
    totalAccounts: 0,
    type: ["Receita", "Despesa"],
    headers: [
      {
        text: "Data",
        value: "date"
      },
      {
        text: "Descrição",
        value: "description",
      },
      {
        text: "Tipo",
        value: "type",
      },
      {
        text: "Valor",
        value: "value",
        
      },
      {
        text: "Observação",
        value: "observation",
      },
      {
        text: "Ações",
        value: "actions",
        sortable: false,
      },
    ],
  }),

  created() {
    this.initialize();
  },

  methods: {
   async initialize() {
      this.loading = true;
      const response = await AccountService.findAll();
      this.accounts = response
      this.loading = false;
      this.calculateTotal();

    },

    openForm() {
      this.showForm = true;
    },

    details(item) {
      this.dialogDetailsAccount = true;
      this.accountsDetails = item;
    },

    async save() {
      let newAccount = this.accountCurrent;
      Object.assign(this.accountCurrent);
      newAccount.id = this.genarationId;
      newAccount.value = parseFloat(newAccount.value);
      
      const response = await AccountService.create(newAccount);
      
       if(response.status === 201){
        alert("Salvo com sucesso!");
        this.cancel();
        this.initialize();
      }else alert("Erro ao cadastrar conta");

    },
    cancel() {
      this.showForm = false;
      console.log(this.accountCurrent)
      this.accountCurrent = {};
      console.log(this.accountCurrent)
      this.accountRemove = null;
    },
    async remove() {

      const response = await AccountService.delete(this.accountRemove);

      if(response.status === 200){
        this.cancel();
        this.initialize();
      }else alert("Erro ao excluir conta");

      this.dialog = false;
      
    },
    showDialog(item) {
      this.dialog = true;
      this.accountRemove = item;
    },
    calculateTotal() {
      this.totalAccounts = 0;
      this.accounts.forEach((element) => {
        if (element.type === "Receita") this.totalAccounts += element.value;
        else this.totalAccounts -= element.value;
      });
    },
    formatattedDateMenu(){
      this.dateFormatted = ISOToBr(this.accountCurrent.date)
      this.menuDateDialog = false
    },
     formatattedDate(data){
      return ISOToBr(data)
      
    }
  },
};
</script>

<style>
</style>