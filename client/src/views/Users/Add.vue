<template>
  <div class="box">
      <add-item-component :user="user"></add-item-component>
  </div>
</template>

<script>
import AddItemComponent from '@/components/AddItemComponent/AddItemComponent';

export default {
    name: 'add-people',
    components: {
        AddItemComponent,
    },
    data() {
        return {
            user: {
                fname: null,
                lname: null,
                username: null,
                password: null,
                email: null,
                phone: null,
                salary: null,
            }
        }
    },  
};
</script>