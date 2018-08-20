<template>
  <section>
    <div class="absolute">
      <button class="bg-blue p-2 m-1 rounded text-white font-bold" @click="$store.commit('expenses/ADD_EXPENSES');save()">Add Expenses</button>
      <!-- <button class="bg-orange p-2 m-1 rounded text-white font-bold" @click="$store.commit('addCategory', 'saving');save()">Add Saving Plan</button> -->
    </div>

    <div class="container text-center border-b p-2 bg-blue-darker text-white text-sm">
      <h1>Monthly Expenses</h1>
    </div>


    <div class="container flex">

      <div class="w-1/2">
        <expenses v-for="list in expenses" v-bind:key="list.id" :list="list" :id="list.id" :income="inputs.income" :store="$store"/>
      </div>

      <div class="w-1/2">
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
      this.$store.commit('expenses/LOAD_STATE', this.$getLocalStorageItem('data'))
    }

    // Catch emitted events from root
    this.$root.$on('save', () => {
      this.save()
    })

    this.$store.dispatch('expenses/getExpenses')
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
    }
  }
};
</script>

<style>
</style>

