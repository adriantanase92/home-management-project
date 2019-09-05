<template>
<v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        left
        temporary
    >
        <div  class="fill-height">
            <div class="pa-4 text-center">
                <span class="title">Menu</span>
                <v-divider></v-divider>
            </div>
            <ul class="ma-0 pa-0">
                <li><v-btn v-bind:class="[this.$router.history.current.name === constants.ROUTES.REPORTS ? 'action-active' : '']" class="elevation-0 border-radius-0 btn-normal" text depressed block :to="{name: constants.ROUTES.REPORTS}">Calendar Report <v-icon small class="ml-auto">mdi-calendar-month</v-icon></v-btn></li>
                <li><v-btn v-bind:class="[this.$router.history.current.name === constants.ROUTES.REPORTS_BOXES ? 'action-active' : '']" class="elevation-0 border-radius-0 btn-normal" text depressed block :to="{name: constants.ROUTES.REPORTS_BOXES}">Box Report <v-icon small class="ml-auto">mdi-package</v-icon></v-btn></li>
            </ul>
        </div>
    </v-navigation-drawer>    
    <v-app-bar app dense clipped-right color="primary" dark>
        <router-link :to="{name: constants.ROUTES.DASHBOARD}" v-bind:class="[this.$route.meta.hasSubMenu ? 'mr-1' : 'mr-4']" class="logo"><img :src="require('../assets/images/white-logo.png')" alt="EPIC"></router-link>
        <v-btn v-if="this.$route.meta.hasSubMenu" icon dark @click.stop="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-btn>
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
        drawer: null,
    }),
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/');
        },
    }
}
</script>
