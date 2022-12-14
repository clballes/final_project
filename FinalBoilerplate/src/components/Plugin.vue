<template>
    <input id="input-searchbar" type="text" v-model="input" placeholder="Search instruments..." @click="showInstru" />
  <div class="item-instrument" v-for="instrument in filteredList()" :key="instrument">
    <div class="container-plugin" v-show="!showBar">
        <div>
            <h3>{{instruments[0].value}}</h3>
        </div>

        <!-- <h3>{{instruments}}</h3> -->
        <!-- <p>{{task.description}}</p> -->
        <!-- <p>
            {{ instrument }}
        </p> -->
    </div>
  </div>
  <div class="item error" v-if="input&&!filteredList().length">
     <p>No results found!</p>
  </div>
  <!-- QUAN PIQUES SEARCH FER EL FETCH AMB JONSON -->
  <button>
    <font-awesome-icon icon="fa-solid fa-search" />
  </button>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

let input = ref("");
function filteredList() {
  return instruments.filter((instrument) =>
    instrument.toLowerCase().includes(input.value.toLowerCase())
  );
}
const instruments = ["Kick", "Electric Guitar", "Acoustic Guitar", "Vintage","Vocals", "Syntetizer"];
const showBar = ref(true);
const showInstru = () => {
    showBar.value = !showBar.value;
};

//fetch from our own API

</script>

<style>
#input-searchbar{
    margin-left: 10%;
    margin-bottom: 20%;
    width: 50%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid rgb(210, 207, 207);
    position: absolute;
}
.item-instrument{
    background-color: red;
    display: flex;
}
.container-plugin{
    display: flex;
    background-image: url("../assets/plugin.jpeg");
    opacity: 0.85;
    background-repeat: none;
    flex-direction: column;
    align-items: center;
    margin: 5%;
    padding: 10%;
    position: relative;
    border-radius: 5%;
    color: white;
    box-shadow: 0 0 15px #515151;
}
</style>