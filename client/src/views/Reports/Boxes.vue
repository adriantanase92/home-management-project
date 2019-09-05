<template>
<v-container fluid grid-list-xl>
    <form>
        <v-layout row wrap>
            <v-flex class="xs6 sm4">
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
                            width="200px"
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
            </v-flex>
            <v-flex class="xs6 sm4">
                <v-btn class="mt-2" width="200px" depressed color="primary" @click="submit()">Submit <i class="fas fa-check ml-auto"></i></v-btn>
            </v-flex>
        </v-layout>
    </form>
    <v-layout v-if="items" class="ma-2" row wrap>
        <v-flex v-for="(item,i) in items" :key="i" class="boxLink xs6 sm4">
            <div class="boxLink-router">
                <h2 class="boxLink-title title secondary--text font-weight-bold">{{ item.title }}</h2>
                <span v-bind:class="item.color+'--text'" class="boxLink-subheading headline font-weight-black" v-if="item.total">{{ item.total }} RON</span>
            </div>
        </v-flex>
    </v-layout>
    <v-layout row justify-space-between>
        <v-flex sm6>
            <v-btn depressed width="200px" color="secondary" class="text-none ml-1 mr-4" :to="{name: constants.ROUTES.EXPENSES}"><i class="fas fa-long-arrow-alt-left mr-auto"></i> Back to Expenses</v-btn>
        </v-flex>
        <v-flex class="text-right" sm6>
            <v-btn depressed width="200px" class="text-none mr-1" color="primary" :to="{name: constants.ROUTES.DASHBOARD}">Back to Dashboard <i class="fas fa-long-arrow-alt-right ml-auto"></i></v-btn>                                          
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
            items: [
                {
                    title: 'Total of Expenses',
                    total: null,
                    color: 'primary'
                },                
                {
                    title: 'Abonaments',
                    total: null,
                    color: 'primary'
                },
                {
                    title: 'Debts',
                    total: null,
                    color: 'primary'
                },
                {
                    title: 'Credits',
                    total: null,
                    color: 'primary'
                },
                {
                    title: 'Invoices',
                    total: null,
                    color: 'primary'
                },                                             
                {
                    title: 'Savings',
                    total: null,
                    color: 'primary'
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
        this.onGetItems("2019");
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

                let totalOfExpenses = 0;
                let abonaments = 0;
                let debts = 0;
                let credits = 0;
                let invoices = 0;
                let savings = 0;

                for (let j = 0; j < this.expenses.length; j++) {
                    if(this.expenses[j].types == 'Fixed' &&  this.expenses[j].fixedTypes == 'Abonament') {
                        abonaments += this.expenses[j].cost;
                    }else if(this.expenses[j].types == 'Fixed' &&  this.expenses[j].fixedTypes == 'Credit') {
                        credits += this.expenses[j].cost;
                    }else if(this.expenses[j].types == 'Fixed' &&  this.expenses[j].fixedTypes == 'Deposit') {
                        deposits += this.expenses[j].cost;
                    }else if(this.expenses[j].types == 'Fixed' &&  this.expenses[j].fixedTypes == 'Invoice') {
                        invoices += this.expenses[j].cost;
                    }else if(this.expenses[j].types == 'Fixed' &&  this.expenses[j].fixedTypes == 'Debts') {
                        debts += this.expenses[j].cost;
                    }else{
                        totalOfExpenses += this.expenses[j].cost;
                    }
                }

                for (let k = 0; k < this.items.length; k++) {
                    if(this.items[k].title === 'Total of Expenses'){
                        this.items[k].total = totalOfExpenses;
                    }else if(this.items[k].title === 'Abonaments'){
                        this.items[k].total = abonaments;
                    }else if(this.items[k].title === 'Debts'){
                        this.items[k].total = debts;
                    }else if(this.items[k].title === 'Credits'){
                        this.items[k].total = credits;
                    }else if(this.items[k].title === 'Invoices'){
                        this.items[k].total = invoices;
                    }else if(this.items[k].title === 'Savings'){
                        this.items[k].total = savings;
                    }  
                }
            })
            .catch(error => {
                if(error.message) {
                    window.epicAlert(error.message, 'error', 3500);
                }
            });
        },
        submit: function () {
            let newDate = new Date(this.date).getFullYear();
            this.onGetItems(newDate);
        }      
    },
}
</script>