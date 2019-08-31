<template>
<v-card class="pa-2 elevation-0">
    <v-card-title class="preheader-table">
        <v-btn color="primary" depressed class="add-btn" :to="{name: constants.ROUTES.ADD_EXPENSE}"><i class="fas fa-plus-circle mr-2"></i> Add Expense</v-btn>
        <v-spacer></v-spacer>
        <v-flex xs4 sm4 md2 lg2><v-text-field v-model="search" append-icon="fas fa-search" label="Search" single-line hide-details></v-text-field></v-flex>
    </v-card-title>
    <v-data-table v-if="items" class="customDataTable mb-4 elevation-1" :sort-by="['start']" :sort-desc="[true]" :headers="headers" :items="items" :search="search" :loading="loading">
        <template v-slot:item.actions="{ item }">
            <v-menu class="sdadad" offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="optionsButton" depressed v-bind="attrs" v-on="on"><i class="fas fa-cog"></i></v-btn>
                </template>

                <v-list class="optionsList ma-0 pa-0">
                    <v-btn tile block class="optionsList-btn text-lg-left" :to="{name: constants.ROUTES.UPDATE_EXPENSE, params: { id: item._id }}">Edit Item <i class="far fa-edit ml-auto"></i></v-btn>
                    <v-btn tile block class="optionsList-btn text-lg-left" @click="showModal(item._id, item.name)">Delete Item <i class="far fa-trash-alt ml-auto"></i></v-btn>
                </v-list>
            </v-menu>
        </template>
        <template v-slot:item.start="{ item }">
            <div>
                {{ item.start | formatDate }}
            </div>
        </template>         
        <template v-slot:item.paidBy="{ item }">
            <ul class="list-inline pa-0">
                <li v-for="(user, index) in item.paidBy" :key="index">{{ user.fullname }}<span class="pr-1" v-if="index != Object.keys(item.paidBy).length - 1">,</span></li>
            </ul>
        </template> 
        <template v-slot:item.status="{ item }">
            <v-chip class="text-lowercase" x-small label outlined :color="item.color">{{ item.status }}</v-chip>
        </template> 
    </v-data-table>

    <v-layout row justify-space-between class="px-2">
        <v-flex sm6>
            <v-btn width="200px" color="secondary" class="text-none ml-1 mr-4" :to="{name: constants.ROUTES.DASHBOARD}">Back to Dashboard <i class="fas fa-times ml-auto"></i></v-btn>
        </v-flex>
        <v-flex class="text-right" sm6>
            <v-btn width="200px" class="text-none mr-1" color="primary" :to="{name: constants.ROUTES.REPORTS}">Back to Reports <i class="fas fa-check ml-auto"></i></v-btn>                                          
        </v-flex> 
    </v-layout>     

    <v-dialog v-model="dialog" width="500">

        <v-card>
            <v-card-title class="headline mb-4" primary-title>
                Delete Confirmation
            </v-card-title>

            <v-card-text class="mb-5">
                Are you sure do you want to delete <span class="primary--text">{{ this.itemName }}</span> ?
            </v-card-text>

            <v-divider></v-divider>

              <div class="text-right pa-2">
                <v-btn class="mr-2" color="black" text @click="dialog=false">Cancel</v-btn>
                <v-btn color="primary" @click="deleteExpense()">Yes, I'm sure</v-btn>
              </div>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
import moment from 'moment';
import Constants from '@/services/Constants';
import ExpenseAccessService from '@/services/ExpenseAccessService';

export default {
    data() {
        return {
            constants: Constants,
            dialog: false,
            search: '',
            loading: true,
            headers: [{
                    text: '',
                    sortable: false,
                    value: 'actions'
                },
                {
                    text: 'Name',
                    value: 'name'
                },
                {
                    text: 'Date',
                    value: 'start'
                },                
                {
                    text: 'Type',
                    value: 'type'
                },
                {
                    text: 'Cost',
                    value: 'cost'
                },
                {
                    text: 'Paid by',
                    value: 'paidBy'
                },
                {
                    text: 'Status',
                    value: 'status'
                }
            ],
            items: [],
            itemId: null,
            itemName: null,
        }
    },
    mounted() {
        this.onGetItems();
    },
    filters: {
        formatDate: function(value) {
            if(value) {
                return moment(String(value)).format('YYYY-MM-DD');
            }
        }
    },    
    methods: {
        showModal: function (id, name) {
            this.itemId = id;
            this.itemName = name;
            this.dialog = true;
        },
        deleteExpense: function () {
            ExpenseAccessService.deleteExpense(this.itemId)
                .then(res => {
                    this.onGetItems();
                    this.dialog = false;
                });
        },
        onGetItems: function () {
            ExpenseAccessService.getExpenses()
                .then(result => {
                    this.items = result.data;
                    this.loading = false;
                })
                .catch(err => reject(err));
        },       
    }
}
</script>
