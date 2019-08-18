<template>
    <v-container fill-height grid-list-md text-xs-center>
        <v-layout class="authentication" row wrap align-center>
            <v-flex xs12 sm12 md6>
                <div class="text-center">
                    <img class="logo" :src="require('../../assets/images/logo.png')"/>
                    <h1 class="headline brand">Home Management</h1>
                </div>
            </v-flex>
            <div class="border-separator hidden-sm-and-down">
                <div></div>
            </div>
            <v-flex xs12 sm12 md6>
                <div class="text-xs-center">
                    <v-form class="form" @submit.prevent="login">
                        <div>
                            <h3 class="headline text-center mb-3">Login</h3>
                            <v-text-field
                                    ref="username"
                                    v-validate="'required|min:2|max:100'"
                                    v-model="user.username"
                                    label="Username"
                                    :error-messages="errors.collect('username')"
                                    data-vv-name="username"
                                    prepend-icon="fas fa-user"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    ref="password"
                                    v-validate="{ rules: {required: true, regex: /(?=^.{8,32}$)(?=.*[0-9!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/} }"
                                    v-model="user.password"
                                    label="Password"
                                    :error-messages="errors.collect('password')"
                                    data-vv-name="password"
                                    prepend-icon="fas fa-lock"
                                    :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                    @click:append="isPasswordVisible = !isPasswordVisible"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                            ></v-text-field>
                            <div class="text-center">
                                <!-- <v-btn :to="{name: constants.ROUTES.DASHBOARD}" class="text-capitalize mt-4" block color="primary" rounded dark large>Sign In</v-btn> -->
                                <v-btn @click="login" class="text-capitalize mt-4" block color="primary" rounded dark large>Sign In</v-btn>
                            </div>
                        </div>
                    </v-form>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Constants from '../../services/Constants';
    import LoginService from '../../services/LoginService';

    export default {
        name: 'Login',
        $_veeValidate: {
            validator: 'new'
        },
        data: function () {
            return {
                constants: Constants,
                user: {
                    username: null,
                    password: null,
                },
                isPasswordVisible: false,
                dictionary: null
            }
        },
        mounted () {
            this.dictionary = {
                custom: {
                    username: {
                        required: () => 'This field is empty',
                        min: 'This field must not contain less than 2 characters',
                        max: 'This field may not be greater than 100 characters'
                    },
                    password: {
                        required: () => 'This field is empty',
                        regex: 'This field must not contain less than 8 characters, one symbol character and one capital letter',
                    }
                }
            };
            this.$validator.localize('en', this.dictionary)
        },
        methods: {
            login() {
                let user = {
                    username: this.user.username,
                    password: this.user.password
                }

                LoginService.login(this.user)
                .then(result => this.$router.push({name: Constants.ROUTES.DASHBOARD}))
                .catch(error => {
                    if(error.message) {
                        window.epicAlert(error.message, 'error', 3500);
                    }
                });  
            }
        }
    }
</script>