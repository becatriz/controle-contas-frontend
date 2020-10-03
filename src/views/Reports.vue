<template>
  <div>
    <v-container>
      <v-card class="overline" color="grey" dark>
        <v-card-title> Balanço Anual </v-card-title>
      </v-card>
      <v-card class="mt-4 mx-auto" color="blue">
        <v-sparkline
          :labels="labels"
          :value="value"
          color="white"
          line-width="1"
          padding="20"
        ></v-sparkline>
      </v-card>
      <v-card color="green" dark class="mb-5 mt-5">
        <v-card-title
          >Total Receitas: R$ {{ totalRecipie.toFixed(2) }}</v-card-title
        >
      </v-card>
      <v-card color="error" dark>
        <v-card-title
          >Total Despesas: R$ {{ totalExpenses.toFixed(2) }}</v-card-title
        >
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    totalExpenses: 0,
    totalRecipie: 0,
    labels: [],
    value: [],
    accounts: [],
    abbreviatedMonth: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
  }),
  created() {
    this.inicialize();
  },

  methods: {
    inicialize() {
      this.accounts = [
        {
          id: 0,
          date: "2020-01-02",
          description: "Bolo de Fubá",
          type: "Receita",
          value: 100.0,
          observation: "Beleza",
        },
        {
          id: 0,
          date: "2020-02-02",
          description: "Bolo de Fubá",
          type: "Receita",
          value: 200,
          observation: "Beleza",
        },
        {
          id: 0,
          date: "2020-03-02",
          description: "Bolo de Fubá",
          type: "Receita",
          value: 87.0,
          observation: "Beleza",
        },
        {
          id: 0,
          date: "2020-04-02",
          description: "Bolo de Fubá",
          type: "Despesas",
          value: 500.0,
          observation: "Beleza",
        },
        {
          id: 0,
          date: "2020-05-02",
          description: "Bolo de Fubá",
          type: "Receita",
          value: 350.0,
          observation: "Beleza",
        },
        {
          id: 0,
          date: "2020-06-02",
          description: "Bolo de Fubá",
          type: "Receita",
          value: 100.0,
          observation: "Beleza",
        },
        {
          id: 1,
          date: "2020-07-02",
          description: "Bolo de Fubá",
          type: "Despesas",
          value: 5.0,
          observation: "Beleza",
        },
        {
          id: 2,
          date: "2020-09-02",
          description: "Bolo de Fubá",
          type: "Receita",
          value: 500.0,
          observation: "Beleza",
        },
        {
          id: 2,
          date: "2020-10-02",
          description: "Bolo de Fubá",
          type: "Receita",
          value: 700.0,
          observation: "Beleza",
        },
      ];

      let toDay = new Date().toISOString().slice(0, 10);
      let year = toDay.slice(0, 4);
      let month = toDay.slice(5, 7);

      this.labels = this.abbreviatedMonth.slice(0, parseInt(month));
      this.value = new Array(parseInt(month)).fill(0);

      this.accounts.forEach((element) => {
        if (year === element.date.slice(0, 4)) {
          let monthAccount = parseInt(element.date.slice(5, 7));

          if (element.type === "Receita")
            this.value[monthAccount - 1] += element.value;
          else this.value[monthAccount - 1] += element.value * -1;
        }

        if (element.type === "Receita") this.totalRecipie += element.value;
        else this.totalExpenses += element.value;
      });
    },
  },
};
</script>