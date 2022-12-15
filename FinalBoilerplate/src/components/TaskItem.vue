<template>
  <div class="todo-item">
    <div class="container">
      <div v-if="doneTask" class="width-div">
        <div class="taskitem-tag">
          <h4 v-for="(task_tag, index) in tasks_tags[0]" :key="index" class="taskitem-tag">
            {{ task_tag }}
          </h4>
        </div>
      </div>
      <div v-else class="width-div">
        <div class="taskitem-tag">
          <h4 v-for="(task_tag, index) in tasks_tags[0]" :key="index">
            {{ task_tag }}
          </h4>
        </div>
      </div>

      <div class="task-card">
        <div>
          <div v-if="doneTask" class="doneText">
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
              <p>{{ task.plugin_url }}</p>   
          </div>
          <div v-else class="doneText2">
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
              <p>{{ task.plugin_url }}</p>
          </div>
        </div>
        <div class="button-Task-Div">
          <button @click="editTask = !editTask" class="buttonTask">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          </button>
          <button @click="checkTask" class="buttonTask">
            <font-awesome-icon icon="fa-solid fa-square-check" />
          </button>
          <button @click="deleteTask" class="buttonTask">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
          <button class="buttonTask">
            <font-awesome-icon icon="fa-solid fa-heart" />
          </button>
        </div>
        <form
          @submit.prevent="onSubmit"
          v-show="!editTask"
          class="form-taskitem"
        >
          <input
            type="text"
            placeholder="New title task"
            class="input-taskitem"
            v-model="name"
          />
          <input
            type="text"
            placeholder="New description task"
            class="input-taskitem"
            v-model="description"
          />
          <input type="submit" value="Change" class="submitButton" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, defineEmits, reactive } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const emit = defineEmits(["emitTask"]);
const taskStore = useTaskStore();

const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  emit("emitTask");
};

//Cuando acabamos una tarea, subrayar las letras de title y paragrafo
const doneTask = ref(props.task.is_complete);

const checkTask = async () => {
  doneTask.value = !doneTask.value;
  await taskStore.updateDoneTask(props.task.is_complete, props.task.id);
  emit("emitTask");
};
//Función para actualizar el name y la descripción, cuando picamos el button edit
const name = ref(props.task.title);
const description = ref(props.task.description);
const plugin_url = ref(props.task.plugin_url);
const tasks_tags = ref([props.task.tasks_tags]);
const editTask = ref(true);

const onSubmit = async () => {
  await taskStore.updateTask(
    name.value,
    description.value,
    plugin_url.value,
    tasks_tags.value,
    props.task.id
  );
  emit("emitTask"); 
};

//Supabase filtering tags
// let tasksTagItems = ref[('')];

// let input = ref("");
// function filteredList() {
//   tasksTagItems = tasks_tags[0];
//   console.log(tasksTagItems.value);
//   return tasks_tags.value.filter((task_tag) =>
//   task_tag[0].toLowerCase().includes(input.value.toLowerCase())
//   );

</script>

<style>
</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
