<template>
    <v-container fluid grid-list-xl pa-3>
      <v-layout class="ma-2" text-xs-center row wrap>
          <box-link-component
            v-for="item in serviceData"
            :item="item"
            :key="item.id"
          ></box-link-component>
        </v-layout>
    </v-container>
</template>

<script>
  import Constants from '@/services/Constants';
  import DashboardService from '@/services/DashboardService';
  import BoxLinkComponent from '@/components/BoxLinkComponent/BoxLinkComponent';

  export default {
    name: Constants.ROUTES.DASHBOARD,
    components: {
      BoxLinkComponent
    },
    data: function () {
      return {
        constants: Constants,
        serviceData: DashboardService.getDashboardData()
      }
    }
  }
</script>