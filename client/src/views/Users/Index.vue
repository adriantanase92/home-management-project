<template>
<v-card class="pa-2">
    <v-card-title class="preheader-table">
        <v-btn color="primary" depressed class="add-btn" :to="{name: constants.ROUTES.ADD_USER}"><i class="fas fa-plus-circle mr-2"></i> Add User</v-btn>
        <v-spacer></v-spacer>
        <v-flex xs4 sm4 md2 lg2><v-text-field v-model="search" append-icon="fas fa-search" label="Search" single-line hide-details></v-text-field></v-flex>
    </v-card-title>
    <v-data-table v-if="items" class="customDataTable elevation-1" :headers="headers" :items="items" :search="search" :loading="loading">
        <template v-slot:item.actions="{ item }">
            <v-menu class="sdadad" offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="optionsButton" depressed v-bind="attrs" v-on="on"><i class="fas fa-cog"></i></v-btn>
                </template>

                <v-list class="optionsList ma-0 pa-0">
                    <v-btn tile block class="optionsList-btn text-lg-left" :to="{name: constants.ROUTES.UPDATE_USER, params: { id: item._id }}">Edit Item <i class="far fa-edit ml-auto"></i></v-btn>
                    <v-btn tile block class="optionsList-btn text-lg-left" @click="showModal(item._id, item.fullname)">Delete Item <i class="far fa-trash-alt ml-auto"></i></v-btn>
                </v-list>
            </v-menu>
        </template>
        <!-- <template v-slot:activator="{ on }" v-slot:body="{ items }">
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>{{ item.username }}</td>
                    <td>{{ item.fullname }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.phone }} {{ item.email }}</td>
                    <td>{{ item.salary }}</td>
                </tr>
            </tbody>
        </template> -->
    </v-data-table>

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
                <v-btn color="primary" @click="deleteUser()">Yes, I'm sure</v-btn>
              </div>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
import Constants from '@/services/Constants';
import UserAccessService from '@/services/UserAccessService';

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
                    text: 'Username',
                    value: 'username'
                },
                {
                    text: 'Name',
                    value: 'fullname'
                },
                {
                    text: 'Phone',
                    value: 'phone'
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Salary',
                    value: 'salary'
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
    methods: {
        showModal: function (id, name) {
            this.itemId = id;
            this.itemName = name;
            this.dialog = true;
        },
        deleteUser: function () {
            UserAccessService.deleteUser(this.itemId)
                .then(res => {
                    this.onGetItems();
                    this.dialog = false;
                });
        },
        onGetItems: function () {
            UserAccessService.getUsers()
                .then(result => {
                    this.items = result.data;
                    this.loading = false;
                })
                .catch(err => reject(err));
        }
    }
}
</script>
