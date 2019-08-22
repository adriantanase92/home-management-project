<template>
<v-app id="inspire">
    <v-app-bar app dense clipped-right color="primary" dark>
        <router-link :to="{name: constants.ROUTES.DASHBOARD}" class="logo mr-4"><img :src="require('../assets/images/white-logo.png')" alt="EPIC"></router-link>
        <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y fixed>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text icon v-bind="attrs" v-on="on" dark><i class="fas fa-th"></i></v-btn>
            </template>

            <v-container fluid grid-list-xl>
                <v-layout class="menu-services z-index999" text-xs-center row wrap>
                    <h3 class="title">Menu</h3>
                    <box-link-component v-for="item in serviceData" :item="item" :key="item.id"></box-link-component>
                </v-layout>
            </v-container>
        </v-menu>
        <v-menu offset-y fixed>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text icon v-bind="attrs" v-on="on" dark><i class="fas fa-user"></i></v-btn>
            </template>

            <v-layout class="menu-services z-index999" text-xs-center row wrap>
                <h3 class="title">Profile Menu</h3>
                <v-btn large block color="primary" @click="logout">Logout <i class="fas fa-sign-out-alt ml-auto"></i></v-btn>
            </v-layout>
        </v-menu>
    </v-app-bar>
</v-app>
</template>

<script>
import BoxLinkComponent from './BoxLinkComponent/BoxLinkComponent';
import DashboardService from '@/services/DashboardService';
import Constants from '@/services/Constants';

export default {
    props: {
        source: String,
    },
    components: {
        BoxLinkComponent
    },
    created() {
        //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/');
        }
    },
    data: () => ({
        constants: Constants,
        serviceData: DashboardService.getMenuData(),
    }),
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/');
        },
    }
}
</script>
