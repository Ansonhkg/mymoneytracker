<template>
  <section>
    <button class="bg-blue p-2 m-1 rounded text-white font-bold absolute" @click="$store.commit('addCategory');save()">Add Category</button>

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
    // Monitor all key press events
    window.addEventListener("keydown", e => {
      if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
        this.save()
      e.preventDefault();
      // Process the event here (such as click on submit button)
    }
    },false);

    window.addEventListener("keydown", e => {
      this.save()
    },false);

    if(localStorage.getItem('data')){
      console.warn("Loaded data from local storage.")
      this.$store.commit('loadState', JSON.parse(localStorage.getItem('data')))
    }

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
      localStorage.setItem('data', JSON.stringify(this.$store.state))
      console.log("SAVED!")
    }
  }
};
</script>

<style>
</style>

