<template>
  <div class="box">
    <update-item-component :editUser="editUser"></update-item-component>
  </div>
</template>

<script>
import UpdateItemComponent from '@/components/UpdateItemComponent/UpdateItemComponent.vue';

export default {
  name: 'update-people',
  components: {
    UpdateItemComponent,
  },
  data() {
      return {
          editUser: {
              fname: null,
              lname: null,
              username: null,
              email: null,
              phone: null,
              salary: null,
          }
      }
  },  
};
</script>
