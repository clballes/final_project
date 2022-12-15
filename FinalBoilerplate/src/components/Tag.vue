<template>
  <div class="tag-input">
    <input
      v-model="newTag"
      type="text"
      class="input-component-tag"
      @keydown.enter="addTag(newTag)"
      @keydown.prevent.tab="addTag(newTag)"
      @keydown.delete="newTag.length || removeTag(tags.length - 1)"
    />

    <ul class="tags" ref="tagsUl">
      <li
        v-for="(tag, index) in tags"
        :key="tag"
        class="tag"
      >
        {{ tag }}
        <button class="delete" @click="removeTag(index)">x</button>
      </li>
    </ul>
  </div>
</template> 


<script setup>
import { ref, watch, nextTick, onMounted, defineEmits } from "vue";
import { useTaskStore } from "../stores/task";

const tags = ref(['drums', 'guitar']);
const newTag = ref ('');
const tagsUl = ref(null)

//update supabase with new tags
useTaskStore().changeTempTask(tags.value);

const changeTemporalTags = (param) => { 
  tags.value = param.value;
  useTaskStore().changeTempTask(tags.value);
}

//add tags
const addTag = (tag) => {
    tags.value.push(tag); // add the new tag to the tags array
    newTag.value = ""; // reset newTag
};
//remove tags
const removeTag = (index) => {
  tags.value.splice(index, 1);
};

// set the cursos to the right of the tag
const paddingLeft = ref(10);

const setLeftPadding = () => {
    const extraCushion = 15
    paddingLeft.value = tagsUl.value.clientWidth + extraCushion;
    tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0); //create a bar to scroll over tags when with is complete
};
// watch(tags, ()=> nextTick(setLeftPadding), {deep: true});
// onMounted(setLeftPadding);

//show on Menu

</script>
<style>
.width-div{
  width: 100%;
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  max-width: 75%;
  overflow-x: auto;
}
.tag-for p{
  background: rgb(238, 238, 238);
  padding: 5px;
  border-radius: 4px;
  color: #ff0048;
  white-space: nowrap;
  transition: 0.1s ease background;
}
.tag {
  background: rgb(238, 238, 238);
  padding: 5px;
  border-radius: 4px;
  color: #0000ff;
  white-space: nowrap;
  transition: 0.1s ease background;
}
.input-component-tag {
  padding: 20px;
    border-radius: 8px;
    width: 95%;
    border: 1px solid #eee;
}
.delete {
  color: #0000ff;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}
button.delete{
    cursor: pointer;
}
.tag-input {
  position: relative;
}
</style>