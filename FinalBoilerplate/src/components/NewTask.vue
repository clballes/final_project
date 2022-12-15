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
                         <button @click="addTask" class="button-sign">Add</button>
                </div>
                <!-- SEARCH ABR FILTERING -->
                <div>
                    <input type="text" placeholder="Enter the plugin you want to search...">
                    <h4 v-for="(task_tag, index) in tasks_tags[0]" :key="index" class="taskitem-tag">
                        {{ task_tag }}
                    </h4>
                </div>
            </div>
    </div>      
</template>

<script setup>
import { ref, defineEmits } from "vue";
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
.taskitem-tag h4{
    background: rgb(238, 238, 238);
    padding: 2% 3%;
    border-radius: 4px;
    color: #0000ff;
    white-space: nowrap;
    margin-bottom: 5%;
    transition: 0.1s ease background;
}
.taskitem-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

}
.div-tag-form{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flex-lock{
    display: flex;
    justify-content: flex-end;
    width: 80%;
    margin-top: 5%;
    align-items: center;
}
.btn-lock-h3{
    background-color: #7e7e7e;
    color: white;
    padding: 2%;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#h2-task{
    font-size: 30px;
    text-align: center;
    margin-top: 3%;
}
#hr-task{
    border: solid 1px black;
}
.icon-daw{
    height: 3%;
    width: 6%;
    border-radius: 8px;
    background-color: white;
}
.icon-daw2{
    height: 3%;
    width: 10%;
}
.daw{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 2%;
}
.background-image-photo{
    background-image: url("../assets/studio-modified.jpg");
    width: 100%;
    height: 750px;
}
.background-image-photo h1{
    font-size: 65px;
    width: 36%;
    padding: 2%;
    position: relative;
    margin-left: 3%;
    top: 250px;
    color: #0000ff;
    text-align: left;
    background-color: #ffffff8c;
}
#plugin-photo{
    width: 50%;
    height: 50%;
    border-radius: 4px;
    cursor: none;
}
.show-view{
    margin-top: 2%;
    width: 100%;
    height: 20%;
    /* display: flex;
    justify-content: end; */
}
.icon-view{
    height: 30px;
    width: 30px;
    cursor: pointer;
}

</style>
  