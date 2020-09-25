<template>
  <div>
    <v-container>
      <v-card class="mt-4 mx-auto" color="blue">
        <v-sparkline
          :labels="labels"
          :value="value"
          color="white"
          line-width="1"
          padding="20"
        ></v-sparkline>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    labels: [],
    value: [],
    accounts: []
  }),
  created(){
    this.inicialize()
  },

  methods: {
    inicialize(){
      this.accounts = [
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
      ];

      this.accounts.forEach((element, index) => {
        this.labels[index] = element.date
        this.value[index] = element.value
      });

    },
  }
};
</script>