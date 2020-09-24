<template>
  <div>
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
export default {
  data: () => ({
    showForm: false,
    dialog: false,
    accountRemove: null,
    dialogDetailsAccount: false,
    accountCurrent: {},
    accounts: [],
    accountsDetails: {
      value: 0
    },
    genarationId: 3,
    totalAccounts: 0,
    type: ["Receita", "Despesas"],
    headers: [
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
    initialize() {
      this.accounts = [
        {
          id: 0,
          description: "Bolo de Fubá",
          type: "Receita",
          value: 100.0,
          observation: "Beleza",
        },
        {
          id: 1,
          description: "Bolo de Fubá",
          type: "Despesas",
          value: 100.0,
          observation: "Beleza",
        },
        {
          id: 2,
          description: "Bolo de Fubá",
          type: "Receita",
          value: 500.0,
          observation: "Beleza",
        },
      ];

      this.calculateTotal();
    },

    openForm() {
      this.showForm = true;
    },

    details(item) {
      this.dialogDetailsAccount = true;
      this.accountsDetails = item;
    },

    save() {
      let newAccount = this.accountCurrent;
      Object.assign(this.accountCurrent);
      newAccount.id = this.genarationId;
      newAccount.value = parseFloat(newAccount.value);
      this.accounts.push(newAccount);
      this.genarationId++;
      this.calculateTotal();
      this.cancel();
    },
    cancel() {
      this.showForm = false;
      this.accountCurrent = {};
      this.accountRemove = null;
    },
    remove() {
      this.accounts.forEach((element, index) => {
        if (element.id == this.accountRemove.id) {
          this.accounts.splice(index, 1);
        }
      });
      this.calculateTotal();
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
  },
};
</script>

<style>
</style>