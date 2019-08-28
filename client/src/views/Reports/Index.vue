<template>
<v-container fluid grid-list-xl>
    <v-layout class="ma-2" row wrap>
        <v-row class="fill-height">
            <v-col>
                <div class="calendar">
                    <v-sheet class="calendar-header" height="64">
                        <v-toolbar flat color="white">
                            <v-btn outlined class="mr-4" @click="setToday">
                                Today
                            </v-btn>
                            <v-btn fab text small @click="prev">
                                <v-icon small>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn fab text small @click="next">
                                <v-icon small>mdi-chevron-right</v-icon>
                            </v-btn>
                            <v-toolbar-title>{{ title }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-menu bottom right>
                                <template v-slot:activator="{ on }">
                                    <v-btn outlined v-on="on">
                                        <span>{{ typeToLabel[type] }}</span>
                                        <v-icon right>mdi-menu-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="type = 'day'">
                                        <v-list-item-title>Day</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'week'">
                                        <v-list-item-title>Week</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'month'">
                                        <v-list-item-title>Month</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = '4day'">
                                        <v-list-item-title>4 days</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet class="calendar-body" height="600">
                        <v-calendar ref="calendar" v-model="focus" color="primary" :events="expenses" :event-color="getEventColor" :event-margin-bottom="3" :now="today" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" @change="updateRange"></v-calendar>
                        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" full-width offset-x>
                            <v-card color="grey lighten-4" min-width="350px" flat>
                                <v-toolbar :color="selectedEvent.color" dark>
                                    <v-btn :to="{name: constants.ROUTES.UPDATE_EXPENSE, params: { id: selectedEvent._id }}" icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click="showModal(selectedEvent._id, selectedEvent.name)"><v-icon>mdi-delete</v-icon></v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <div class="regular font-weight-medium"><span class="font-weight-bold">Cost:</span> <span class="pl-2" v-html="selectedEvent.cost"></span> RON</div>
                                    <div class="regular font-weight-medium"><span class="font-weight-bold">Type:</span> <span class="pl-2" v-html="selectedEvent.type"></span></div>
                                    <div class="regular font-weight-medium" v-if="selectedEvent.fixedType"><span class="font-weight-bold">Fixed Type:</span> <span class="pl-2" v-html="selectedEvent.fixedType"></span></div>
                                    <div class="regular font-weight-medium">
                                        <ul class="list-inline ma-0 pa-0">
                                            <span class="font-weight-bold">Paid by:</span>
                                            <li class="ml-1" v-for="(user, index) in selectedEvent.paidBy" :key="index">{{ user.fullname }}<span v-if="index != Object.keys(selectedEvent.paidBy).length - 1">,</span></li>
                                        </ul>
                                    </div>
                                    <div class="regular font-weight-medium"><span class="font-weight-bold">Details:</span> <span class="pl-2" v-html="selectedEvent.details"></span></div>
                                </v-card-text>
                                <v-card-actions>
                                    <div class="ml-auto"></div>
                                    <v-btn text color="primary" @click="selectedOpen = false">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-sheet>
                </div>
            </v-col>
        </v-row>
    </v-layout>
    <v-layout row justify-space-between>
        <v-flex sm6>
            <v-btn width="200px" color="secondary" class="text-none ml-1 mr-4" :to="{name: constants.ROUTES.EXPENSES}">Back to Expenses <i class="fas fa-times ml-auto"></i></v-btn>
        </v-flex>
        <v-flex class="text-right" sm6>
            <v-btn width="200px" class="text-none mr-1" color="primary" :to="{name: constants.ROUTES.DASHBOARD}">Back to Dashboard <i class="fas fa-check ml-auto"></i></v-btn>                                          
        </v-flex> 
    </v-layout>    
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title class="headline mb-4" primary-title>
                Delete Confirmation
            </v-card-title>

            <v-card-text class="mb-5">
                Are you sure do you want to delete <span class="primary--text">{{ this.itemName }}</span> ?
            </v-card-text>

            <v-divider></v-divider>

                <div class="text-right pa-2">
                <v-btn class="mr-2" color="black" text @click="dialog=false">Cancel</v-btn>
                <v-btn color="primary" @click="deleteExpense()">Yes, I'm sure</v-btn>
                </div>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import Constants from '@/services/Constants';
import ExpenseAccessService from '@/services/ExpenseAccessService';

export default {
    name: Constants.ROUTES.REPORTS,
    data: function () {
        return {
            constants: Constants,
            dialog: false,
            itemId: null,
            itemName: null,
            today: new Date().toISOString().substr(0, 10),
            focus: new Date().toISOString().substr(0, 10),
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            start: null,
            end: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            expenses: [],
        }
    },
    computed: {
        title() {
            const {
                start,
                end
            } = this
            if (!start || !end) {
                return ''
            }

            const startMonth = this.monthFormatter(start)
            const endMonth = this.monthFormatter(end)
            const suffixMonth = startMonth === endMonth ? '' : endMonth

            const startYear = start.year
            const endYear = end.year
            const suffixYear = startYear === endYear ? '' : endYear

            const startDay = start.day + this.nth(start.day)
            const endDay = end.day + this.nth(end.day)

            switch (this.type) {
                case 'month':
                    return `${startMonth} ${startYear}`
                case 'week':
                case '4day':
                    return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
                case 'day':
                    return `${startMonth} ${startDay} ${startYear}`
            }
            return ''
        },
        monthFormatter() {
            return this.$refs.calendar.getFormatter({
                timeZone: 'UTC',
                month: 'long',
            })
        },
    },
    mounted() {
        this.onGetItems();
    },    
    methods: {
        viewDay({
            date
        }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = this.today
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({
            nativeEvent,
            event
        }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                setTimeout(() => this.selectedOpen = true, 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange({
            start,
            end
        }) {
            // You could load expenses from an outside source (like database) now that we have the start and end dates on the calendar
            this.start = start
            this.end = end
        },
        nth(d) {
            return d > 3 && d < 21 ?
                'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
        },
        onGetItems: function () {
            ExpenseAccessService.getExpenses()
            .then(result => {
                this.expenses = result.data;
            })
            .catch(err => reject(err));
        },
        showModal: function (id, name) {
            this.itemId = id;
            this.itemName = name;
            this.dialog = true;
        },
        deleteExpense: function () {
            ExpenseAccessService.deleteExpense(this.itemId)
            .then(res => {
                this.onGetItems();
                this.dialog = false;
            });
        },        
    },
}
</script>
