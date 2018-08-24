<template>
  <section>
    <div class="absolute">
      <button style="font-size:10px;" class="bg-orange-dark p-2 m-1 rounded text-white font-bold text-xs" @click="print()">Save</button>
      <!-- <button style="font-size:10px;" class="bg-orange-dark p-2 m-1 rounded text-white font-bold text-xs" @click="load()">Load</button> -->
      <button class="bg-blue p-2 m-1 rounded text-white font-bold" @click="$store.commit('expenses/EXPENSES_ADDED');save()">Add Expenses</button>
      <!-- <button class="bg-orange p-2 m-1 rounded text-white font-bold" @click="$store.commit('addCategory', 'saving');save()">Add Saving Plan</button> -->
    </div>

    <div class="container text-center border-b p-2 bg-blue-darker text-white text-sm">
      <h1>Monthly Expenses</h1>
    </div>


    <div class="container flex-row md:flex">

      <div class="w-full">
        <expenses v-for="list in expenses" v-bind:key="list.id" :list="list" :id="list.id" :income="inputs.income" :store="$store"/>
      </div>

      <div class="w-full">
        <stats :inputs="inputs" :expenses="expenses"/>
      </div>

    </div>
  </section>

</template>

<script>
import Expenses from "~/components/Expenses/Expenses.vue";
import Stats from "~/components/Expenses/Stats.vue";
import { mapGetters } from 'vuex'

export default {
  components: {
    Expenses,
    Stats
  },
  mounted() {

    // Listen to events
    this.$mountKeyboardEventsHandler(this.save)

    // Load local storage if exist
    if(this.$getLocalStorageItem('data')){
      this.$store.commit('expenses/STATE_LOADED', this.$getLocalStorageItem('data'))
    }else{
      this.$store.dispatch('expenses/getExpenses')
      this.$store.dispatch('expenses/getInputs')
    }

    // Catch emitted events from root
    this.$root.$on('save', () => {
      this.save()
    })
  },
  computed: {
    ...mapGetters({
      expenses: 'expenses/expenses',
      inputs: 'expenses/inputs'
    }),
  },
  methods:{
    save(){
      this.$setLocalStorageItem('data', this.$store.state.expenses)
      console.log("Saved.")
    },
    print(){
      const data = JSON.stringify(this.$store.state.expenses)
      const blob = new Blob([data], {type: 'text/plain'})
            var today = new Date();
      const e = document.createEvent('MouseEvents'),

      a = document.createElement('a');
      a.download = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear() + "_mymoneytracker" + ".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e)
    }
  }
};
</script>

<style>
</style>

