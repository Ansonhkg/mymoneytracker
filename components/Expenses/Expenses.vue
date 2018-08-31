<template>
    <div class="flex flex-col w-full w-1/2 p-1">
        <div class="bg-blue text-center text-white p-1 shadow-lg">
            <input class="bg-blue text-white text-center" type="text" v-model="list.title"/>
            <!-- <span>list.title</span> -->
            <span class="float-right bg-blue-dark pl-2 pr-2 pt-1 pb-1 rounded cursor-pointer" @click="store.commit('expenses/ROW_ADDED', list.id);save()">Add Row</span>
            <span class="float-right bg-red-dark pl-2 pr-2 pt-1 pb-1 mr-1 leading-normal rounded cursor-pointer text-xs" @click="store.commit('expenses/EXPENSES_REMOVED', list.id);save(); ">Remove</span>
        </div>        
        <div class="bg-purple-dark text-left text-white">
            
            <!-- Title -->
            <div class="flex-wrap flex text-center p-1">
                <div class="w-1/6">#</div>
                <div class="w-1/6">Description</div>
                <div class="w-1/6">Mothly</div>
                <div class="w-1/6">Weekly</div>
                <div class="w-1/6">Daily</div>
                <div class="w-1/6">Enabled</div>
            </div>

            <!-- Rows -->
            <row v-for="row in list.rows" v-bind:key="row.id" :listId="list.id" :row="row" :store="store"/>

            <!-- Summary -->
            <div class="flex-wrap flex text-center p-1 bg-blue-darker text-xs text-red-lighter">
                <div class="w-1/3 text-right text-red-light font-bold">Total</div>
                <div class="w-1/6 text-red-light font-bold">{{ expenseTotal | pound }}</div>
                <div class="w-1/6">{{ weeklyTotal | pound }}</div>
                <div class="w-1/6">{{ dailyTotal | pound }}</div>
                <div class="w-1/6"><b>{{ percentage | percent }}</b>/100%</div>
            </div>
        </div>
    </div>
</template>

<script>
import Row from '~/components/Expenses/Row.vue'

export default {
    props:['id', 'list', 'income', 'store'],
    components:{
        Row
    },
    computed: {
        expenseTotal: function () {
            var total = this.list.rows.map(x => (x.isEnabled ? this.$number(x.value) : 0)).reduce((x, y) => x + y, 0)
            return this.$toFixed(total, 2)
        },
        weeklyTotal: function(){
            var total = this.list.rows.map(x => (x.isEnabled ? this.$number(x.value) : 0) / 30 * 7).reduce((x, y) => x + y, 0)
            return this.$toFixed(total, 2)
        },
        dailyTotal: function(){
            var total = this.list.rows.map(x => (x.isEnabled ? this.$number(x.value) : 0) / 30).reduce((x, y) => x + y, 0)
            return this.$toFixed(total, 2)
        },
        percentage: function(){
            if(this.income <= 0) return 0

            var total = this.list.rows.map(x => (x.isEnabled ? this.$number(x.value) : 0)).reduce((x, y) => x + y, 0)
            var income = total / this.income * 100
            return this.$toFixed(income, 2)
        }
    },
    methods:{
        save(){
            this.$root.$emit('save')
        }
    }
}
</script>

