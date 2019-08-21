<template>
    <v-flex v-bind:class="item.size" class="boxLink">
        <router-link class="boxLink-router" :to="item.link">
            <img class="boxLink-avatar" :src="item.path">
            <h2 class="boxLink-title">{{ item.title }}</h2>
            <span class="boxLink-subheading" v-if="item.subheading">{{ item.subheading }}</span>
        </router-link>
    </v-flex>
</template>

<script>    
    export default {
        props: {          
            item: {
               type: Object,
               required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
@import './BoxLinkComponent';
</style>