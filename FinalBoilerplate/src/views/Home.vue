<template>
  <div class="wrapper">
    <Nav />
    <!-- LANDING PAGE ITEMS -->
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
    <!-- SHOW DIFFERENTS VIEWS, SEARCHBAR AND OWN TABLE -->
    <section id="section-locker">
      <div v-if="showView">
              <!-- OWN PANEL UPDLOAD YOUR OWNN PLUGINS -->
              <div class="flex-lock">
                <button class="btn-lock-h3">
                <h3 class="h3-locker" @click="toggleShow">Search and save plugins from others</h3>
                <font-awesome-icon @click="toggleShow" icon="fa-solid fa-lock" class="icon-view" />
              </button>
              </div>
              <NewTask @emitTask ="getTasks" />
              <div class="homeTask">
                <TaskItem v-for="task in tasks" :key="task.id" :task="task"
                          @emitTask="getTasks"/>
              </div>
      </div>
      <div v-else>
              <!-- SEARCHBAR BETWEEN DIFFERENTS PLUGINS -->
              <div class="flex-lock">
                <button class="btn-lock-h3">
                  <h3 class="h3-locker" @click="toggleShow">Upload plugins in your panel</h3>
                  <font-awesome-icon @click="toggleShow" icon="fa-solid fa-unlock" class="icon-view"/>
                  <SearchPlugin />
              </button>
            </div>
      </div>  
    </section>
      
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from "../stores/task";
import { useRouter } from 'vue-router';
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import { useUserStore } from "../stores/user";
import Footer from '../components/Footer.vue';
import Tag from '../components/Tag.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import SearchPlugin from '../components/SearchPlugin.vue';

const showView = ref(false);
const toggleShow = (() => {
  showView.value = !showView.value;
});

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);

// Creamos una funci??n que conecte a la store para conseguir las tareas de supabase
const getTasks = async() => {
  tasks.value = await taskStore.fetchTasks();
};
getTasks();

</script>

<style></style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will 
contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function 
needs to be called within the setUp script in order to run within the first instance of this component lifecycle.

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this 
async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the 
backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask 
Component. 

7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem 
component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show 
either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the 
task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function 
mentioned on hint4.


7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument 
will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the 
value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in 
order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to 
call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call 
the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to 
take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument 
oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function 
needs to call the function mentioned on hint4.
-->
