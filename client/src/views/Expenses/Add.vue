<template>
  <div class="box">
      <form ref="form">
        <v-container fluid grid-list-xl pa-3>
            <v-layout row wrap>
                <v-flex sm6>
                    <v-text-field 
                        ref="name"
                        v-model="expense.name" 
                        v-validate="'required|min:2|max:100'" 
                        :error-messages="errors.collect('name')" 
                        label="Name" 
                        data-vv-name="name"
                        prepend-icon="fas fa-wallet"
                        required></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-select
                        ref="type"
                        v-model="expense.type"
                        v-validate="'required'"
                        :error-messages="errors.collect('type')"
                        label="Type"
                        data-vv-name="type"
                        :items="types"
                        required
                        prepend-icon="fas fa-balance-scale"
                    ></v-select>                                          
                </v-flex> 
                <v-flex sm6 v-if="expense.type === 'Fixed'">
                    <v-select
                        ref="fixedType"
                        v-model="expense.fixedType"
                        v-validate="'required'"
                        :error-messages="errors.collect('fixedType')"
                        label="Fixed Type"
                        data-vv-name="fixedType"
                        :items="fixedTypes"
                        required
                        prepend-icon="fas fa-hand-holding-usd"
                    ></v-select>
                </v-flex>
                <v-flex sm6>
                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="expense.date"
                        full-width
                        width="25%"
                        max-width="464px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                ref="date"
                                v-model="expense.date"
                                v-validate="'required'"
                                :error-messages="errors.collect('date')"                            
                                label="Date"
                                data-vv-name="date"
                                readonly
                                v-on="on"
                                prepend-icon="far fa-calendar-alt"
                            ></v-text-field>
                        </template>
                        <v-date-picker :min="minDate" v-model="date" show-current landscape scrollable>
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>                                                                             
                </v-flex>                             
                <v-flex sm6>
                    <v-text-field 
                        ref="cost"
                        v-model="expense.cost" 
                        v-validate="'required|numeric|min:1|max:100'" 
                        :error-messages="errors.collect('cost')" 
                        label="Cost" 
                        data-vv-name="cost"
                        prepend-icon="fas fa-money-bill-wave"
                        required></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-select
                        ref="status"
                        v-model="expense.status"
                        label="Status"
                        data-vv-name="status"
                        :items="statuses"
                        disabled
                        prepend-icon="fas fa-star-half-alt"
                    ></v-select>
                </v-flex>                
                <v-flex sm12>
                    <v-autocomplete
                        ref="paidBy"
                        v-model="expense.paidBy"
                        :items="users"
                        chips
                        label="Select"
                        item-text="fullname"
                        item-value="_id"
                        v-validate="'required'" 
                        :error-messages="errors.collect('paidBy')" 
                        multiple
                        data-vv-name="paidBy"
                        return-object
                        prepend-icon="fas fa-user-friends"
                        >
                        <template v-slot:selection="data">
                            <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            @click="data.select"
                            @click:close="remove(data.item)"
                            >
                            {{ data.item.fullname }}
                            </v-chip>
                        </template>
                        <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                            <v-list-item-content>
                                <v-list-item-title v-html="data.item.fullname"></v-list-item-title>
                                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                            </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>                    
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                        v-model="expense.details"
                        maxlength="500"
                        v-validate="'min:3|max:500'"
                        name="details"
                        label="Details"
                        :error-messages="errors.collect('details')"
                        prepend-icon="fas fa-comment-dots"
                    ></v-textarea>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 class="text-lg-right">
                    <v-btn width="200px" class="mr-4" :to="{name: constants.ROUTES.EXPENSES}">cancel <i class="fas fa-times ml-auto"></i></v-btn>
                    <v-btn width="200px" color="primary" @click="submit">submit <i class="fas fa-check ml-auto"></i></v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </form>
  </div>
</template>

<script>
import Constants from "@/services/Constants.js";
import UserAccessService from "@/services/UserAccessService.js";
import ExpenseService from "@/services/ExpenseService.js";
import ExpenseAccessService from "@/services/ExpenseAccessService.js";

export default {
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {
            constants: Constants,
            callbackValidator: [],
            // date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
            date: new Date().toISOString().substr(0, 10),
            modal: false,
            types: ['Fixed', 'Variabile'],
            statuses: ['Paid', 'Unpaid'],
            fixedTypes: ['Invoice', 'Debt', 'Credit', 'Deposit'],
            users: [],
            expense: {
                name: null,
                type: null,
                fixedType: null,
                date: null,
                cost: null,
                status: 'Unpaid',
                color: null,
                paidBy: null,
                details: null
            },
            dictionary: ExpenseService.getDictionaryModel()
        };
    },
    computed: {
        minDate() {
            return new Date().toISOString().substr(0, 10);
        },
    },    
    mounted() {
        this.reset();
        this.getUsers();
        this.emptyCallbackErrorsList();
        this.$validator.localize("en", this.dictionary);
    },
    methods: { 
        reset() {
            this.$refs.form.reset();
        },  
        getColor(status) {
            if(status==='Paid'){
                return 'success';
            }else{
                return 'primary';
            }
        },             
        getUsers() {         
            UserAccessService.getUsers()
            .then(result => { 
                this.users = result.data;
            })
            .catch(err => reject(err));
        },        
        onValidateAll() {
            let newItem = {
                name: this.expense.name,
                type: this.expense.type,
                fixedType: this.expense.fixedType,
                date: this.expense.date,
                cost: this.expense.cost,
                status: 'Unpaid',
                color: null,
                paidBy: this.expense.paidBy,
                details: this.expense.details                
            };

            newItem.color=this.getColor(newItem.status);

            ExpenseAccessService.addExpense(newItem)
                .then(result => {
                    this.reset();
                    window.epicAlert('Expense was added succesfully', "success", 3500);
                    this.$router.push({
                        name: Constants.ROUTES.EXPENSES
                    });
                })
                .catch(error => {
                    if (error.message) {
                        window.epicAlert(error.message, "error", 3500);
                    }
                });
        },
        emptyCallbackErrorsList: function () {
            this.callbackValidator = [];
        },
        triggerFormValidator: function () {
            for (let i = 0; i < this.callbackValidator.length; i += 1) {
                this.callbackValidator[i]();
            }
        },
        submit() {
            let v = this.$validator;
            this.$validator.validateAll();
            setTimeout(() => {
                if (v.errors.items.length === 0) {
                    this.onValidateAll();
                }
            });
        }
    }
};
</script>