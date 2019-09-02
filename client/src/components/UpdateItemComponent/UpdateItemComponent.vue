<template>
    <v-flex v-bind:class="field.size">
        <v-text-field v-if="field.type=='text'"
            :ref="field.ref"
            v-validate="field.validate"                        
            v-model="configObj.itemModel[field.name]"
            :label="field.label"
            :error-messages="errors.collect(field.name)"
            :data-vv-name="field.name"
            :prepend-icon="field.icon"
            :counter="field.counter"
            :readonly="field.readonly"
            :slot="field.slot"
            @blur="onBlur"   
            :id="field.id"    
        ></v-text-field>
        <v-select v-else-if="field.type=='select'"
            @input="selectorChange"
            :ref="field.ref"
            v-validate="field.validate"                        
            v-model="configObj.itemModel[field.name]"
            :label="field.label"
            :items="field.items"
            :error-messages="errors.collect(field.name)"
            :data-vv-name="field.name"
            :prepend-icon="field.icon"
            :placeholder="field.placeholder"
            :item-text="field.itemText"
            :item-value="field.itemValue"  
            :id="field.id"    
        ></v-select>
        <v-text-field v-else-if="field.type=='password'"
            :ref="field.ref"
            v-validate="field.validate"                        
            v-model="configObj.itemModel[field.name]"
            :label="field.label"
            :error-messages="errors.collect(field.name)"
            :data-vv-name="field.name"
            :name="field.name"
            :data-vv-as="field.as"
            :prepend-icon="field.icon"
            :append-icon="field.visibility ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (field.visibility = !field.visibility)"
            :type="field.visibility ? 'text' : 'password'"
            :counter="field.counter"
            :id="field.id"
        ></v-text-field>
    </v-flex>
</template>

<script>
export default {
    $_veeValidate: {
        validator: "new"
    },
    props: ['configObj', 'field', 'formName', 'validator'],
    data() {
        return {
            isPasswordVisible: false
        };
    },
    created() {
        if(this.validator) {
            this.$validator = this.validator;
        }
    },
    mounted () {
        this.$validator.localize("en", this.dictionary);
    },
    methods: {      
        selectorChange() {
            if(this.isSelected) {
                this.isSelected(this.field.name);
            }
        },
        onBlur() {
            if(this.onBlurEvent){
                this.onBlurEvent();
            }
        }
    }
};
</script>
