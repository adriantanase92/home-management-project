<template>
  <div class="box">
      <form ref="form">
        <v-container fluid grid-list-xl pa-3>
            <v-layout row justify-space-between>
                <v-flex sm6>
                    <v-text-field 
                        ref="name"
                        v-model="expense.name" 
                        v-validate="'required|min:2|max:100'" 
                        :error-messages="errors.collect('name')" 
                        label="Name" 
                        data-vv-name="name" 
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
                    ></v-select>
                </v-flex>
                <v-flex sm6 v-if="expense.type === 'Variabile'">
                    <v-select
                        ref="month"
                        v-model="expense.month"
                        v-validate="'required'"
                        :error-messages="errors.collect('month')"
                        label="Month"
                        data-vv-name="month"
                        :items="months"
                        required
                    ></v-select>                                                          
                </v-flex>                             
                <v-flex sm6>
                    <v-text-field 
                        ref="cost"
                        v-model="expense.cost" 
                        v-validate="'required|numeric|min:1|max:100'" 
                        :error-messages="errors.collect('cost')" 
                        label="Cost" 
                        data-vv-name="cost" 
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
                    ></v-select>
                </v-flex>                
                <v-flex sm6>
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
                    ></v-textarea>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 class="text-lg-right">
                    <v-btn class="mr-4" :to="{name: constants.ROUTES.EXPENSES}">cancel</v-btn>
                    <v-btn color="primary" @click="submit">submit</v-btn>
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
            types: ['Fixed', 'Variabile'],
            statuses: ['Paid', 'Unpaid'],
            fixedTypes: ['Invoice', 'Debt', 'Credit', 'Deposit'],
            users: [],
            months: [],
            expense: {
                name: null,
                type: null,
                fixedType: null,
                month: null,
                cost: null,
                status: 'Unpaid',
                paidBy: null,
                details: null
            },
            dictionary: ExpenseService.getDictionaryModel()
        };
    },
    mounted() {
        this.reset();
        this.getUsers();
        this.emptyCallbackErrorsList();
        this.$validator.localize("en", this.dictionary);
    },
    methods: {
        getUsers() {         
            UserAccessService.getUsers()
            .then(result => { 
                this.users = result.data;
            })
            .catch(err => reject(err));
        },        
        reset() {
            this.$refs.form.reset();
        },
        onValidateAll() {
            let newItem = {
                name: this.expense.name,
                type: this.expense.type,
                fixedType: this.expense.fixedType,
                month: this.expense.month,
                cost: this.expense.cost,
                status: 'Unpaid',
                paidBy: this.expense.paidBy,
                details: this.expense.details                
            };

            ExpenseAccessService.addExpense(newItem)
                .then(result => {
                    this.reset();
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