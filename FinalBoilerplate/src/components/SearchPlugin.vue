<template>
          <input type="text" v-model="input" placeholder="Search plugins..." @click="getTasksTags"/>
          <h4 v-for="(strinTag, index) in stringTags" :key="index" class="taskitem-tag" @click="handleChange">
            {{ strinTag }}
          </h4>
          
          
  <!-- <div class="item error" v-if="input&&!handleChange().length">
     <p>No results found!</p>
  </div> -->
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import { useTaskStore } from "../stores/task"
import { supabase } from "../supabase";

const emit = defineEmits(['emitTask'])
const taskStore = useTaskStore();
const tasks_tags = ref([]);
let stringTags = ref([]);

const getTasksTags = async () => {
  tasks_tags.value = await taskStore.fetchTasksTags();
  let j = 0;
  let i = 0;
  while(j < tasks_tags.value.length){
    for (let i = 0; i < tasks_tags.value[j].tasks_tags.length; i++) {
      stringTags.value.push(tasks_tags.value[j].tasks_tags[i]);
    }
    j++;
    i = 0;
  }
};
// console.log(stringTags);

getTasksTags();
  // console.log(tasks_tags.value[0].tasks_tags[1]); 
  //em deixa interar

let input = ref("");
const handleChange = () => {
  emit("emitTask", input.value)
}

</script>

<style>

</style>