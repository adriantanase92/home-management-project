<template>
    <v-autocomplete
        :ref="field.name"
        v-model="configObj.itemModel[field.name]"
        :items="users"
        chips
        :label="field.label"
        :item-text="field.itemText"
        :item-value="field.itemValue"
        v-validate="field.validate" 
        :error-messages="errors.collect(field.name)" 
        :multiple="field.multiple"
        :data-vv-name="field.name"
        return-object
        :prepend-icon="field.icon"
    >
        <template v-slot:selection="data">
            <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
            >
            {{ data.item.name }}
            </v-chip>
        </template>
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
            <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
            </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>

<script>
    export default {
        props: ['field', 'configObj'],
        data () {
            return {
            }
        },
        methods: {
            remove (item) {
                const index = this.configObj.itemModel[field.name].indexOf(item.name)
                if (index >= 0 || index <= 0) this.configObj.itemModel[field.name].splice(index, 1)
            },
        }
    }
</script>