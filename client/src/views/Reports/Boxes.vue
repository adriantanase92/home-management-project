<template>
<v-container fluid grid-list-xl>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      v-model="menu"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-model="date"
                label="Pick an Year"
                prepend-icon="mdi-calendar-clock"
                readonly
                v-on="on"
            ></v-text-field>
        </template>
      <v-date-picker
        ref="picker"
        v-model="date"
        @input="save"
        reactive
        no-title
        min="2018-01-01"
        max="2025-01-01"
      ></v-date-picker>
    </v-menu>
    <v-layout v-if="items" class="ma-2" row wrap>
        <v-flex v-for="(item,i) in items" :key="i" class="boxLink xs6 sm4 md3">
            <div class="boxLink-router">
                <h2 class="boxLink-title title secondary--text">{{ item.title }}</h2>
                <span :color="item.color" class="boxLink-subheading headline" v-if="item.total">{{ item.total }}</span>
            </div>
        </v-flex>
    </v-layout>
    <v-layout row justify-space-between>
        <v-flex sm6>
            <v-btn width="200px" color="secondary" class="text-none ml-1 mr-4" :to="{name: constants.ROUTES.EXPENSES}">Back to Expenses <i class="fas fa-times ml-auto"></i></v-btn>
        </v-flex>
        <v-flex class="text-right" sm6>
            <v-btn width="200px" class="text-none mr-1" color="primary" :to="{name: constants.ROUTES.DASHBOARD}">Back to Dashboard <i class="fas fa-check ml-auto"></i></v-btn>                                          
        </v-flex> 
    </v-layout>
</v-container>
</template>

<script>
import Constants from '@/services/Constants';
import ExpenseAccessService from '@/services/ExpenseAccessService';

export default {
    name: Constants.ROUTES.REPORTS_BOXES,
    data: function () {
        return {
            constants: Constants,
            date: null,
            menu: false,
            // focus: new Date().toISOString().substr(0, 10),
            items: [
                {
                    title: 'Total of Expenses',
                    total: null,
                    color:'primary'
                },                
                {
                    title: 'Abonaments',
                    total: null,
                },
                {
                    title: 'Debts',
                    total: null,
                },
                {
                    title: 'Credits',
                    total: null,
                },                                                
                {
                    title: 'Savings',
                    total: null,
                }
            ],
            expenses: [],            
        }
    },
    watch: {
        menu (val) {
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },    
    mounted() {
        this.onGetItems("2018");
    },    
    methods: {
        save (date) {
            this.$refs.menu.save(date);
            this.$refs.picker.activePicker = 'YEAR'
            this.menu = false;
        },
        onGetItems: function (year) {
            ExpenseAccessService.getExpenses()
            .then(result => {
                let allExpenses = result.data;
                let filteredExpenses = [];
                for (let i = 0; i < allExpenses.length; i++) {
                   if(new Date(allExpenses[i].start).getFullYear() == year){
                       filteredExpenses.push(allExpenses[i]);
                   }
                }
                this.expenses = filteredExpenses;
            })
            .catch(err => reject(err));
        },       
    },
}
</script>