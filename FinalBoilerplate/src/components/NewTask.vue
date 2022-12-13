<template>
    <div class="background-image-photo">  
        <h1>Start searching the most famous plugins</h1>    
    </div>
    <hr id="hr-task" />
    <h2 id="h2-task">Supported by</h2>
    <div class="daw">
        <img src="../assets/2015_Logic_Pro_Logo.png" alt="logic" class="icon-daw">
        <img src="../assets/ableton.png" alt="ableton" class="icon-daw">
        <img src="../assets/reaper.webp" alt="reaper" class="icon-daw2">
        <img src="../assets/PT2019.png" alt="protools" class="icon-daw">
        <img src="../assets/cubase.png" alt="cubase" class="icon-daw">
    </div>
            <div class="newTaskDiv">
                <h1>Search a plugin</h1>
                <h2>Start making your songs</h2>
                <div v-if="showErrorMessage">
                    <p class="error-text">{{ showErrorMessage }}</p>
                </div>
                <div class="argumentTask">
                    <div class="input-field-newtask">
                        <input type="text" placeholder="Add a Plugin Title" class="input-newtask-item" v-model="name">
                    </div>
                    <div class="input-field-newtask">
                        <input class="input-newtask-item" type="text" placeholder="Add a Plugin Description" v-model="description" >
                    </div>
                     <button @click="addTask" class="button-sign">Add</button>
                </div>
            </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useTaskStore } from "../stores/task"
const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);
const emit = defineEmits(['emitTask'])
// Arrow function para crear tareas.
const addTask = async () => {
    if(name.value.length === 0 || description.value.length === 0){
        showErrorMessage.value = true;
        showErrorMessage.value = 'The task title or description is empty';
        setTimeout(() => {
        showErrorMessage.value = false;
        }, 5000);
    } else {
        // Aquí mandamos los vxalores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
        await taskStore.addTask(name.value, description.value);
        name.value = '';
        description.value = '';
        emit("emitTask");
    }
};

</script>

<style>
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
.position-task{

}

</style>
  