<template>
  <div class="box">
      <form ref="form">
        <v-container fluid grid-list-xl pa-3>
            <v-layout row justify-space-between>
                <v-flex sm6>
                    <v-text-field 
                        ref="name"
                        v-model="editExpense.name" 
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
                        v-model="editExpense.type"
                        v-validate="'required'"
                        :error-messages="errors.collect('type')"
                        label="Type"
                        data-vv-name="type"
                        :items="types"
                        prepend-icon="fas fa-balance-scale"
                        required
                    ></v-select>                                          
                </v-flex> 
                <v-flex sm6 v-if="editExpense.type === 'Fixed'">
                    <v-select
                        ref="fixedType"
                        v-model="editExpense.fixedType"
                        v-validate="'required'"
                        :error-messages="errors.collect('fixedType')"
                        label="Fixed Type"
                        data-vv-name="fixedType"
                        :items="fixedTypes"
                        prepend-icon="fas fa-hand-holding-usd"
                        required
                    ></v-select>
                </v-flex>
                <v-flex sm6>
                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="editExpense.start"
                        full-width
                        width="25%"
                        max-width="464px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                ref="date"
                                v-model="editExpense.start"
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
                        v-model="editExpense.cost" 
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
                        v-model="editExpense.status"
                        label="Status"
                        data-vv-name="status"
                        :items="statuses"
                        prepend-icon="fas fa-star-half-alt"
                    ></v-select>
                </v-flex>                
                <v-flex xs12>
                    <v-autocomplete
                        ref="paidBy"
                        v-model="editExpense.paidBy"
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
                            >{{ data.item.fullname }}</v-chip>
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
                        v-model="editExpense.details"
                        maxlength="500"
                        v-validate="'min:3|max:500'"
                        name="details"
                        label="Details"
                        prepend-icon="fas fa-comment-dots"
                        :error-messages="errors.collect('details')"
                    ></v-textarea>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 class="text-lg-right">
                    <v-btn width="200px" class="mr-4" color="secondary" :to="{name: constants.ROUTES.REPORTS}">Back to Reports <i class="fas fa-coins ml-auto"></i></v-btn>
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
            date: new Date().toISOString().substr(0, 10),
            modal: false,            
            types: ['Fixed', 'Variabile'],
            statuses: ['Paid', 'Unpaid'],
            fixedTypes: ['Invoice', 'Debt', 'Credit', 'Deposit'],
            users: [],
            responseExpense: null,
            editExpense: {
                name: null,
                type: null,
                fixedType: null,
                start: null,
                end: null,
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
        this.getUsers();
        this.emptyCallbackErrorsList();
        this.$validator.localize("en", this.dictionary);
        this.getExpense(this.$route.params.id);
    },
    methods: {
        getColor(status) {
            if(status==='Paid'){
                return 'success';
            }else{
                return 'primary';
            }
        },        
        getUsers() {         
            ExpenseAccessService.getUsers()
            .then(result => { 
                this.users = result.data;
            })
            .catch(err => reject(err));
        },  
        getExpense(id) {
            let that = this;
            ExpenseAccessService.getExpense(id)
            .then(result => {
                that.responseExpense = result.data;
                that.getParser(result.data, that.editExpense);
            });                
        },              
        getParser: function(data, editExpense) {           
            for(let item in data){ 
                if(!editExpense.hasOwnProperty(item)){
                    editExpense[item] = '';
                }
                editExpense[item] = data[item];
            }           
        },
        jsonCompare(responseExpense) {
            let that = this;
            let isEqual = true;
            for(let itemRU in responseExpense){ 
                for(let itemEU in that.editExpense){
                    if(itemRU === itemEU){
                        if(responseExpense[itemRU] !== that.editExpense[itemEU]){
                            isEqual = false;
                        }
                    }
                }
            }         
            return isEqual;
        }, 
        onValidateAll() {
            let that = this;
            that.editExpense.color=this.getColor(that.editExpense.status);
            that.editExpense.end=that.editExpense.start;
            ExpenseAccessService.updateExpense(that.$route.params.id, that.editExpense)
            .then(result => {
                window.epicAlert('Expense was updated succesfully', "success", 3500);
                this.$router.push({
                    name: Constants.ROUTES.EXPENSES
                });
            })
            .catch(error => {
                if(error.message) {
                    window.epicAlert(error.message, 'error', 3500);
                }
            }); 
        },
        emptyCallbackErrorsList: function () {
            this.callbackValidator = [];
        },
        submit() {
            let v = this.$validator;
            if(this.jsonCompare(this.responseExpense) === true){
                this.$router.push({name: Constants.ROUTES.EXPENSES});
                return;
            }
            if(v.errors.items.length === 0 && this.jsonCompare(this.responseExpense) !== true){
                this.onValidateAll();
            } 
        }
    }
};
</script>