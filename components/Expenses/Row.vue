<template>
    <div class="flex-wrap flex text-center bg-purple-lighter text-xs h-full border-b border-purple text-purple-darker">
        <div class="w-1/6 p-1 leading-loose"><span class="bg-red text-white p-1 rounded cursor-pointer" style="font-size:8px;" @click="$store.commit('removeRow', [listId, row.id]);$root.$emit('save')">Remove</span> {{ listId}}.{{ row.id }}</div>
        <div class="w-1/6 p-1 leading-loose"><input class="bg-transparent overflow-auto w-full" type="text" v-model="row.description"/></div>
        <div class="w-1/6 p-1 leading-loose text-white font-bold"><span class="bg-purple rounded p-1"><span class="pr-1">£</span><input @change="$root.$emit('save')" class="pl-1 w-12" type="number" v-model="row.value"/></span></div>
        <div class="w-1/6 p-1 leading-loose">{{ weekly | pound  }}</div>
        <div class="w-1/6 p-1 leading-loose">{{ daily | pound  }}</div>
        <div class="w-1/6 p-1 bg-yellow-dark">
            <label class="relative bg-yellow-darker pb-2 pl-4 pr-3 w-full cursor-pointer leading-normal rounded" :for="id">
                <input class="hidden absolute opacity-0" type="checkbox" :id="id" v-model="row.isCompleted">
                <span class="checkmark absolute"></span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
  props: ['listId', "row"],
  computed: {
    id(){
        return 'checkbox_' + this.listId + '_' + this.row.id
    },
    weekly() {
      return this.$toFixed(this.row.value / 7, 2);
    },
    daily() {
      return this.$toFixed(this.row.value / 30, 2);
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
