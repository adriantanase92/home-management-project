<template>
    <section class="alerts">
        <v-alert v-if="notifyAlertObj.show" :value="true" :type="notifyAlertObj.type" transition="scale-transition">{{notifyAlertObj.message}}</v-alert>
    </section>
</template>

<script>
import NotifyService from '../../services/NotifyService';

export default {
    props: {
        notifyAlertObj: {
            type: Object,
            required: true
        }
    },
    mounted() {
        window.epicAlert = NotifyService.alert;
        window.notifyAlertObj = this.notifyAlertObj;
    }
}
</script>

<style lang="scss" scoped>
@import './NotifyComponent';
</style>
