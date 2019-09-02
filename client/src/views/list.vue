<template>
    <list-component :url="url" :configObj="configObj"></list-component>
</template> 

<script>
import HttpService from '@/services/HttpService';
import ListComponent from '@/components/ListComponent/ListComponent';

export default {
    $_veeValidate: {
        validator: 'new'
    },
    components: {
        ListComponent
    },
    data () {
        return {
            callbackValidator: [],
            url: this.$route.meta.config.url,
            configObj: {
                addRoute: this.$route.meta.config.addRoute,
                updateRoute: this.$route.meta.config.updateRoute,
                headers: this.$route.meta.config.headers,                
            }
            
        }
    }
}
</script>