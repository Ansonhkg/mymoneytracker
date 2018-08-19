<template>
    <div class="w-full p-1">
        <h2>Inputs</h2>
        <hr>
        <div class="border-t mt-2 pt-2 md:flex md:items-center mb-4">
            <div class="md:w-1/6">
                <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full">
                    Income After Tax: 
                </label>
            </div>
            <div class="md:w-1/3">
                <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple" type="number" @keyup="$root.$emit('save')" v-model="inputs.income" />
            </div>
        </div>
        
        <div>
            <h3 class="text-center border-b pb-2">Calculation Results</h3>
            
            <!-- Title -->
            <div class="flex-wrap flex text-center p-1 text-sm">
                <div class="w-1/5">#</div>
                <div class="w-1/5 underline">Total Expenses</div>
                <div class="w-1/5">Weekly</div>
                <div class="w-1/5">Daily</div>
                <div class="w-1/5">Occupied</div>
            </div>

            <div v-for="result in results" v-bind:key="result.title" class="flex-wrap flex text-center p-1 text-xs">
                <div class="w-1/5">{{ result.title }}</div>
                <div class="w-1/5">{{ result.total | pound }}</div>
                <div class="w-1/5">{{ result.weekly | pound }}</div>
                <div class="w-1/5">{{ result.daily | pound }}</div>
                <div class="w-1/5">{{ result.occupied | percent }}</div>
            </div>

            <!-- Summary -->
            <div class="flex-wrap flex text-center p-1 text-sm border-t border-grey-darker bg-grey-dark">
                <div class="w-1/5"></div>
                <div class="w-1/5">{{ summary.total | pound}}</div>
                <div class="w-1/5">{{ summary.weekly | pound}}</div>
                <div class="w-1/5">{{ summary.daily | pound}}</div>
                <div class="w-1/5">{{ summary.occupied | percent}}</div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
  props: ["inputs", "expenses"],
  computed: {
    results() {
      if (this.inputs.income <= 0) return 0;

      var list = this.expenses.map(x => {
        var total = x.rows.map(x => this.$number(x.value)).reduce((x, y) => x + y, 0);

        return {
          title: x.title,
          total: this.$toFixed(total, 2),
          weekly: this.$toFixed(total / 7, 2),
          daily: this.$toFixed(total / 30, 2),
          occupied: this.$toFixed(total / this.inputs.income * 100, 2)
        };
      });
      return list;
    },
    summary() {
      if (this.inputs.income <= 0 || this.expenses.length <= 0) return 0;
      var total = this.expenses
        .map(x => x.rows)
        .reduce((acc, val) => acc.concat(val))
        .map(x => x.value <= 0 ? 0 : this.$number(x.value))
        .reduce((x, y) => x + y, 0);

      return {
        total: this.$toFixed(total, 2),
        weekly: this.$toFixed(total / 7, 2),
        daily: this.$toFixed(total / 30, 2),
        occupied: this.$toFixed(total / this.inputs.income * 100, 2)
      };
    }
  }
};
</script>