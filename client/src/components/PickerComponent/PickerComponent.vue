<template>
    <v-dialog
        ref="dialog"
        v-model="displayModal"
        :return-value.sync="configObj.itemModel[field.name]"
        :lazy="field.lazy"
        :full-width="field.fullWidth"
        :width="field.width"
        :max-width="field.maxWidth"
      >   
        <template v-slot:activator="{ on }"> 
            <v-text-field
                :ref="field.name"
                v-validate="field.validate"
                :error-messages="errors.collect(field.name)"
                v-model="configObj.itemModel[field.name]"
                :data-vv-name="field.name"
                :label="field.label"
                :prepend-icon="field.icon"
                readonly
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker :min="minDate" v-model="date" show-current landscape scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="onClickCancelHandler()">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(configObj.itemModel[field.name])">OK</v-btn>       
        </v-date-picker>
    </v-dialog>
</template>

<script>
    export default {
        props: ['field', 'configObj', 'minDate'],
        data () {
            return {
                displayModal: false,
            }
        },
        methods: {
            onClickCancelHandler() {
                this.displayModal = false;
            }
        }
    }
</script>