<template>
    <form ref="form">
        <v-container fluid grid-list-xl pa-3>
            <v-layout row justify-space-between>
                <v-flex sm6>
                    <v-text-field prepend-icon="fas fa-user-alt" v-model="editUser.fname" v-validate="'required|min:2|max:100'" :error-messages="errors.collect('fname')" label="First Name" data-vv-name="fname" required></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field prepend-icon="fas fa-user-alt" v-model="editUser.lname" v-validate="'required|min:2|max:100'" :error-messages="errors.collect('lname')" label="Last Name" data-vv-name="lname" required></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field prepend-icon="fas fa-user-circle" v-model="editUser.username" v-validate="'required|min:2|max:100'" :error-messages="errors.collect('username')" label="Username" data-vv-name="username" required></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field prepend-icon="fas fa-envelope" v-model="editUser.email" v-validate="'required|email'" :error-messages="errors.collect('email')" label="E-mail" data-vv-name="email" required></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field prepend-icon="fas fa-phone-alt" v-model="editUser.phone" v-validate="'required|min:9|max:10'" :error-messages="errors.collect('phone')" label="Phone" data-vv-name="phone" required></v-text-field>
                </v-flex>
                <v-flex sm6>
                    <v-text-field prepend-icon="fas fa-piggy-bank" v-model="editUser.salary" v-validate="'required|numeric|min:3|max:100'" :error-messages="errors.collect('salary')" label="Salary" data-vv-name="salary" required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 class="text-lg-right">
                    <v-btn width="200px" class="mr-4" :to="{name: constants.ROUTES.USERS}">cancel <i class="fas fa-times ml-auto"></i></v-btn>
                    <v-btn width="200px" color="primary" @click="submit">submit <i class="fas fa-check ml-auto"></i></v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </form>
</template>

<script>
import Constants from '@/services/Constants.js';
import UserService from '@/services/UserService.js';
import UserAccessService from '@/services/UserAccessService.js';

export default {
    $_veeValidate: {
        validator: 'new',
    },
    props: {
        editUser: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        constants: Constants,
        callbackValidator: [],
        responseUser: null,
        dictionary: UserService.getDictionaryModel(),
    }),
    mounted() {
        this.emptyCallbackErrorsList();
        this.$validator.localize('en', this.dictionary);
        this.getUser(this.$route.params.id);
    },
    methods: { 
        emptyCallbackErrorsList: function () {
            this.callbackValidator = [];
        },   
        getParser: function(data, editUser) {           
            for(let item in data){ 
                if(!editUser.hasOwnProperty(item)){
                    editUser[item] = '';
                }
                editUser[item] = data[item];
            }           
        },        
        getUser(id) {
            let that = this;
            UserAccessService.getUser(id)
            .then(result => {
                that.responseUser = result.data;
                that.getParser(result.data, that.editUser);
            });                
        },
        jsonCompare(responseUser) {
            let that = this;
            let isEqual = true;
            for(let itemRU in responseUser){ 
                for(let itemEU in that.editUser){
                    if(itemRU === itemEU){
                        if(responseUser[itemRU] !== that.editUser[itemEU]){
                            isEqual = false;
                        }
                    }
                }
            }         
            return isEqual;
        },                                         
        onValidateAll() {
            let that = this;
            UserAccessService.updateUser(that.$route.params.id, that.editUser)
            .then(result => this.$router.push({name: Constants.ROUTES.USERS}))
            .catch(error => {
                if(error.message) {
                    window.epicAlert(error.message, 'error', 3500);
                }
            });    
        },
        submit() {
            let v = this.$validator;
            if(this.jsonCompare(this.responseUser) === true){
                this.$router.push({name: Constants.ROUTES.USERS});
                return;
            }
            if(v.errors.items.length === 0 && this.jsonCompare(this.responseUser) !== true){
                this.onValidateAll();
            }            
        }
    },
}
</script>
