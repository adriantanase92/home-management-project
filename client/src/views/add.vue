<template>
<form ref="form">
    <v-container fluid grid-list-xl pa-3>
        
        <v-layout row justify-space-between v-if="configObj.fieldsData.length > 0">
            <form-component 
                v-for="field in configObj.fieldsData" 
                :field="field"
                :key="field.id"
                :configObj="configObj"
                :validator="$validator">
            </form-component> 
        </v-layout>

        <v-layout row>
            <v-flex xs12 class="text-lg-right">
                <v-btn width="200px" class="mr-4" :to="{name: configObj.listRoute}">cancel <i class="fas fa-times ml-auto"></i></v-btn>
                <v-btn width="200px" color="primary" @click="submit">submit <i class="fas fa-check ml-auto"></i></v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</form>
</template> 

<script>
import HttpService from '@/services/HttpService';
import FormComponent from '@/components/FormComponent/FormComponent';

export default {
    $_veeValidate: {
        validator: 'new'
    },
    components: {
        FormComponent
    },
    data () {
        return {
            callbackValidator: [],
            url: this.$route.meta.config.url,
            configObj: {
                listRoute: this.$route.meta.config.listRoute,
                fieldsData: this.$route.meta.config.fields,
                itemModel: this.$route.meta.config.itemModel,
                dictionary: this.$route.meta.config.errorsItems
            },
        }
    },    
    mounted() {
        this.reset();
        this.cleaningObj(this.configObj.itemModel);
        this.emptyCallbackErrorsList();
        this.$validator.localize("en", this.configObj.dictionary);
    },
    methods: {
        reset() {
            this.$refs.form.reset();
        },
        cleaningObj(modelObj) {
            for(let item in modelObj){ 
                modelObj[item] = null;
            }
            return modelObj;
        },
        onValidateAll(model) {
            let newItem = {};
            for (let property in model) {
                newItem[property] = model[property];
            }

            HttpService.post(this.url, newItem)
            .then((response) => {
                window.epicAlert('Item was added successfully', "success", 3500);
                this.$router.push({ name: this.configObj.listRoute });
            })
            .catch((err) => { window.epicAlert(err.message, "error", 3500); });            
        },
        emptyCallbackErrorsList: function () {
            this.callbackValidator = [];
        },
        submit() {
            let v = this.$validator;
            this.$validator.validateAll();
            setTimeout(() => {
                if (v.errors.items.length === 0) {
                    this.onValidateAll(this.configObj.itemModel);
                }
            });
        }
    }    
}
</script>