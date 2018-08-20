<template>
  <section>
    <div class="absolute">
      <button class="bg-blue p-2 m-1 rounded text-white font-bold" @click="$store.commit('addExpenses');save()">Add Expenses</button>
      <!-- <button class="bg-orange p-2 m-1 rounded text-white font-bold" @click="$store.commit('addCategory', 'saving');save()">Add Saving Plan</button> -->
    </div>

    <div class="container text-center border-b p-2 bg-blue-darker text-white text-sm">
      <h1>Monthly Expenses</h1>
    </div>


    <div class="container flex">

      <div class="w-1/2">
        <expenses v-for="list in expenses" v-bind:key="list.id" :list="list" :id="list.id" :income="inputs.income"/>
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
      this.$store.commit('loadState', this.$getLocalStorageItem('data'))
    }

    // Catch emitted events from root
    this.$root.$on('save', () => {
      this.save()
    })
  },
  computed: {
    expenses() {
      return this.$store.state.expenses;
    },
    inputs() {
      return this.$store.state.inputs;
    }
  },
  methods:{
    save(){
      this.$setLocalStorageItem('data', this.$store.state)
    }
  }
};
</script>

<style>
</style>

