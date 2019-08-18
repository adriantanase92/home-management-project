<template>
<form ref="form">
    <v-container fluid grid-list-xl pa-3>
        <v-layout row justify-space-between>
            <v-flex sm6>
                <v-text-field v-model="user.fname" v-validate="'required|min:2|max:100'" :error-messages="errors.collect('fname')" label="First Name" data-vv-name="fname" required></v-text-field>
            </v-flex>
            <v-flex sm6>
                <v-text-field v-model="user.lname" v-validate="'required|min:2|max:100'" :error-messages="errors.collect('lname')" label="Last Name" data-vv-name="lname" required></v-text-field>
            </v-flex>
            <v-flex sm6>
                <v-text-field  v-model="user.username" v-validate="'required|min:2|max:100'" :error-messages="errors.collect('username')" label="Username" data-vv-name="username" required></v-text-field>
            </v-flex>
            <v-flex sm6>
                <v-text-field :autocomplete="false" v-model="user.password" v-validate="{ rules: {required: true, regex: /(?=^.{8,32}$)(?=.*[0-9!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/} }" :error-messages="errors.collect('password')" label="Password" data-vv-name="password" prepend-icon="fas fa-lock" :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'" @click:append="isPasswordVisible = !isPasswordVisible" :type="isPasswordVisible ? 'text' : 'password'" required></v-text-field>
            </v-flex>
            <v-flex sm4>
                <v-text-field v-model="user.email" v-validate="'required|email'" :error-messages="errors.collect('email')" label="E-mail" data-vv-name="email" required></v-text-field>
            </v-flex>
            <v-flex sm4>
                <v-text-field v-model="user.phone" v-validate="'required|numeric|min:9|max:10'" :error-messages="errors.collect('phone')" label="Phone" data-vv-name="phone" required></v-text-field>
            </v-flex>
            <v-flex sm4>
                <v-text-field v-model="user.salary" v-validate="'required|numeric|min:3|max:100'" :error-messages="errors.collect('salary')" label="Salary" data-vv-name="salary" required></v-text-field>
            </v-flex>
         </v-layout>
        <v-layout row>
            <v-flex xs12 class="text-lg-right">
                <v-btn class="mr-4" :to="{name: constants.ROUTES.USERS}">cancel</v-btn>
                <v-btn color="primary" @click="submit">submit</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</form>
</template>

<script>
import Constants from "@/services/Constants.js";
import UserService from "@/services/UserService.js";
import UserAccessService from "@/services/UserAccessService.js";

export default {
    $_veeValidate: {
        validator: "new"
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            constants: Constants,
            callbackValidator: [],
            isPasswordVisible: false,
            dictionary: UserService.getDictionaryModel()
        };
    },
    mounted() {
        this.reset();
        this.emptyCallbackErrorsList();
        this.$validator.localize("en", this.dictionary);
    },
    methods: {
        reset() {
            this.$refs.form.reset();
        },
        onValidateAll() {
            let newItem = {
                fname: this.user.fname,
                lname: this.user.lname,
                username: this.user.username,
                password: this.user.password,
                email: this.user.email,
                phone: this.user.phone,
                salary: this.user.salary
            };

            UserAccessService.addUser(newItem)
                .then(result => {
                    this.reset();
                    this.$router.push({
                        name: Constants.ROUTES.USERS
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
