<template>
<form ref="form">
    <v-container fluid grid-list-xl pa-3>
        
        <v-layout row justify-space-between v-if="configObj.fieldsData.length > 0">
            <update-item-component 
                v-for="field in configObj.fieldsData" 
                :field="field"
                :key="field.id"
                :configObj="configObj"
                :validator="$validator">
            </update-item-component> 
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
import UpdateItemComponent from '@/components/UpdateItemComponent/UpdateItemComponent';

export default {
    $_veeValidate: {
        validator: 'new'
    },
    components: {
        UpdateItemComponent
    },
    data () {
        return {
            callbackValidator: [],
            url: this.$route.meta.config.url,
            configObj: {
                itemId: this.$route.params.id,
                listRoute: this.$route.meta.config.listRoute,
                fieldsData: this.$route.meta.config.fields,
                itemModel: this.$route.meta.config.itemModel,
                dictionary: this.$route.meta.config.errorsItems,
                responseItem: this.$route.meta.config.responseItem
            },
        }
    },    
    mounted() {
        this.emptyCallbackErrorsList();
        this.$validator.localize("en", this.configObj.dictionary);
        this.getUser(this.configObj.itemId);
    },
    methods: {
        emptyCallbackErrorsList: function () {
            this.callbackValidator = [];
        },   
        getParser: function(data, model) {           
            for(let item in data){ 
                if(!model.hasOwnProperty(item)){
                    model[item] = '';
                }
                model[item] = data[item];
            }           
        }, 
        getUser(id) { 
            HttpService.get(`${this.url}${id}`)
            .then(result => {
                this.configObj.responseItem = result.data;
                this.getParser(result.data, this.configObj.itemModel);
            })
            .catch((err) => { window.epicAlert(err.message, "error", 3500); });               
        },
        jsonCompare(responseItem) {
            let that = this;
            let isEqual = true;
            for(let itemRU in responseItem){ 
                for(let itemEU in that.configObj.itemModel){
                    if(itemRU === itemEU){
                        if(responseItem[itemRU] !== that.configObj.itemModel[itemEU]){
                            isEqual = false;
                        }
                    }
                }
            }         
            return isEqual;
        },
        onValidateAll() {
            this.configObj.itemModel.fullname = `${this.configObj.itemModel.fname} ${this.configObj.itemModel.lname}`;
            HttpService.put(`${this.url}${this.configObj.itemId}`, this.configObj.itemModel)
            .then(result => {
                 console.log(this.configObj.itemModel.fullname);
                window.epicAlert('Item was updated successfully', 'success', 3500);
                this.$router.push({ name: this.configObj.listRoute });
            })
            .catch((err) => { window.epicAlert(err.message, "error", 3500); }); 
        },
        submit() {
            let v = this.$validator;
            this.$validator.validateAll();
            if(this.jsonCompare(this.configObj.responseItem) === true){
                this.$router.push({name: this.configObj.listRoute});
                return;
            }
            if(v.errors.items.length === 0 && this.jsonCompare(this.configObj.responseItem) !== true){
                this.onValidateAll();
            }
        }        
    }    
}
</script>