<template>
    <div class="show-view">
            <div class="newTaskDiv">
                <h1>Upload your plugin</h1>
                <h2>& start making your songs</h2>
                <div v-if="showErrorMessage">
                    <p class="error-text">{{ showErrorMessage }}</p>
                </div>
                <div class="argumentTask">
                    <div class="input-field-newtask">
                        <input type="text" placeholder="Add a Plugin name" class="input-newtask-item" v-model="name">
                    </div>
                    <div class="input-field-newtask">
                        <input class="input-newtask-item" type="text" placeholder="Add a Plugin Description" v-model="description" >
                    </div>
                    <div class="input-field-newtask">
                        <input class="input-newtask-item" type="text" placeholder="Add a Plugin Url" v-model="plugin_url" >
                    </div>
                </div>
                <div class="div-tag-form">
                    <div class="input-field-newtask">
                            <Tag />
                    </div>
                         <button @click="addTask" id="btn-add">Add</button>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref, defineEmits, computed } from "vue";
import { useTaskStore } from "../stores/task"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Tag from "./Tag.vue";


const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');
const plugin_url = ref('');
const tasks_tags = ref(['']);
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);
const emit = defineEmits(['emitTask'])
// Arrow function para crear tareas.

const addTask = async () => {
    tasks_tags.value = useTaskStore().temporalTags;
    if (name.value.length === 0 || description.value.length === 0 || plugin_url.value.length === 0
    || tasks_tags.value.length === 0) {
        showErrorMessage.value = true;
        showErrorMessage.value = 'The task title or description is empty';
        setTimeout(() => {
        showErrorMessage.value = false;
        }, 5000);
    } else {
        // Aquí mandamos los vxalores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
        await taskStore.addTask(name.value, description.value, plugin_url.value, tasks_tags.value);
        name.value = '';
        description.value = '';
        plugin_url.value = '';
        tasks_tags.value = '';
        emit("emitTask");
    }
};

//show menu view
const showView = ref(false);
const toggleShow = (() => {
  showView.value = !showView.value;
});
</script>

<style>
</style>
  