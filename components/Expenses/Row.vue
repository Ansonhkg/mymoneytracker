<template>
    <div>
      <section class="hidden sm:block">
        <div class="flex-wrap flex text-center bg-purple-lighter text-xs h-full border-b border-purple text-purple-darker">
          <div class="w-1/6 p-1 leading-loose"><span class="bg-red text-white p-1 rounded cursor-pointer" style="font-size:8px;" @click="removeRow();save()">Remove</span> {{ listId}}.{{ row.id }}</div>
          <div class="w-1/6 p-1 leading-loose"><input class="row-description bg-transparent overflow-auto w-full" type="text" v-model="row.description"/></div>
          <div class="w-1/6 p-1 leading-loose text-white font-bold"><span class="bg-purple rounded p-1"><span class="pr-1">£</span><input @change="save()" class="row-value pl-1 w-12" type="number" v-model="row.value"/></span></div>
          <div class="w-1/6 p-1 leading-loose">{{ weekly | pound  }}</div>
          <div class="w-1/6 p-1 leading-loose">{{ daily | pound  }}</div>
          <div class="w-1/6 p-1 bg-yellow-dark">
              <label class="relative bg-yellow-darker pb-2 pl-4 pr-3 w-full cursor-pointer leading-normal rounded" :for="id">
                  <input class="hidden absolute opacity-0" type="checkbox" @change="save()" :id="id" v-model="row.isEnabled">
                  <span class="checkmark absolute"></span>
              </label>
          </div>
        </div>
      </section>
      
      <section class="mobile block sm:hidden bg-indigo p-1 -mt-1 relative">
        <div @click="removeRow();save()" class="absolute pin-t pin-r p-2 bg-red text-white text-xs rounded mt-2 mr-2" style="font-size:6px;">
          Remove
        </div>
        <div class="bg-indigo-dark p-1 text-white font-bold"><input class="h-3" type="checkbox" @change="save()" :id="id" v-model="row.isEnabled"><input type="text" class="w-4/5 bg-transparent font-bold text-white pl-1" v-model="row.description"/></div>
        <div class="bg-white mb-1 text-grey-darker">

          <div class="flex justify-center p-1 border-b border-dashed">
            <div class="w-1/2">Monthly</div>
            <div class="w-1/2">
              {{ '' | pound}} <input @change="save()" class="row-value pl-1 w-12 font-bold" type="number" v-model="row.value"/>
            </div>
          </div>

          <div class="flex justify-center p-1 text-xs">
            <div class="w-1/2">Weekly</div>
            <div class="w-1/2">{{ weekly | pound }}</div>
          </div>

          <div class="flex justify-center p-1 text-xs">
            <div class="w-1/2">daily</div>
            <div class="w-1/2">{{ daily | pound }}</div>
          </div>

        </div>
      </section>

    </div>
</template>

<script>
export default {
  props: ['listId', "row", "store"],
  computed: {
    id(){
        return 'checkbox_' + this.listId + '_' + this.row.id
    },
    weekly() {
      return this.$toFixed(this.row.value / 30 * 7, 2);
    },
    daily() {
      return this.$toFixed(this.row.value / 30, 2);
    }
  },
  methods:{
      removeRow(){
        this.store.commit('expenses/ROW_REMOVED', [this.listId, this.row.id])
      },
      save(){
        this.$root.$emit('save')
      }
  }
};
</script>
<style>
.checkmark {
  top: 6px;
  left: 12px;
}
.checkmark:after {
  width: 5px;
  height: 10px;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
input:checked ~ .checkmark:after {
  display: block;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
</style>
