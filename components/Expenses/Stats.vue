<template>
    <div class="w-full p-1">
        <h2>Inputs</h2>
        <hr>
        <div class="flex">
            <div class="border-t mt-2 pt-2 md:flex md:items-center mb-4 w-full">
                <div class="md:w-1/2">
                    <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full">
                        Income After Tax:
                        <div style="font-size:7px;"><a class="underline text-grey-dark" href="https://www.income-tax.co.uk/" target="_blank">https://www.income-tax.co.uk/</a></div>
                    </label>
                </div>
                <div class="md:w-1/3">
                    <input class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple" type="number" @change="$root.$emit('save')" @keyup="$root.$emit('save')" v-model="inputs.income" />
                </div>
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

            <!-- After Expenses -->
            <div class="flex-wrap flex text-center p-1 text-sm border-t border-grey-darker bg-grey-dark">
                <div class="w-1/5"></div>
                <div class="w-1/5">{{ afterExpenses.total | pound}}</div>
                <div class="w-1/5">{{ afterExpenses.weekly | pound}}</div>
                <div class="w-1/5">{{ afterExpenses.daily | pound}}</div>
                <div class="w-1/5">{{ afterExpenses.occupied | percent}}</div>
            </div>

            <div class="bg-grey-light p-1 border">
                <div class="flex-wrap flex text-center p-1 text-sm border-t border-grey-darker leading-loose">
                - You have got <span class="bg-green font-bold p-1 rounded ml-1 mr-1 text-xs">{{ totalAfterExpenses | pound }}</span> left to spend after expenses.
                </div>

                <div class="flex-wrap flex text-center p-1 text-sm border-t border-grey-darker leading-loose">
                - After <div class="w-1/6 p-1 leading-loose text-white font-bold"><span class="bg-green-dark rounded p-1"><span class="pr-1"></span><input class="pl-1 w-12 mr-1" type="number" v-model="inputs.saving"/>% </span></div>(based on above) saving you would have <span class="bg-green font-bold p-1 rounded ml-1 mr-1 text-xs">{{ totalAfterSaving | pound }}</span> left to spend.
                </div>

                <div class="flex-wrap flex text-center p-1 bg-grey-darker text-xs text-grey-dark">
                - (You've put <b class="ml-1 mr-1 text-red-darkest underline">{{ totalSaving | pound}}</b> to your saving).
                </div>

                <!-- <div class="flex-wrap flex text-center p-1 text-sm border-t border-grey-darker leading-loose">
                - And you allow yourself to splash <div class="w-1/6 p-1 leading-loose text-white font-bold"><span class="bg-green-dark rounded p-1"><span class="pr-1"></span><input class="pl-1 w-12 mr-1" type="number" v-model="inputs.saving"/>% </span></div>(based on above) saving you would have <span class="bg-green font-bold p-1 rounded ml-1 mr-1 text-xs"></span> left to spend.
                </div> -->
            </div>


        </div>

    </div>
</template>

<script>
export default {
  name: "Stats",
  
  props: ["inputs", "expenses"],
  computed: {
    results() {
      if (this.inputs.income <= 0) return 0;

      var list = this.expenses.map(x => {
        var total = x.rows
          .map(x => (x.isEnabled ? this.$number(x.value) : 0))
          .reduce((x, y) => x + y, 0);

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
    afterExpenses() {
      if (this.inputs.income <= 0 || this.expenses.length <= 0) return 0;
      var total = this.expenses
        .map(x => x.rows)
        .reduce((acc, val) => acc.concat(val))
        .map(x => (x.value <= 0 ? 0 : x.isEnabled ? this.$number(x.value) : 0))
        .reduce((x, y) => x + y, 0);

      return {
        total: this.$toFixed(total, 2),
        weekly: this.$toFixed(total / 30 * 7, 2),
        daily: this.$toFixed(total / 30, 2),
        occupied: this.$toFixed(total / this.inputs.income * 100, 2)
      };
    },
    totalAfterExpenses() {
      return this.$toFixed(this.inputs.income - this.afterExpenses.total, 2);
    },
    totalSaving() {
      return this.$toFixed(
        this.totalAfterExpenses * (this.inputs.saving / 100)
      );
    },
    totalAfterSaving() {
      return this.$toFixed(this.totalAfterExpenses - this.totalSaving);
    }
  }
};
</script>