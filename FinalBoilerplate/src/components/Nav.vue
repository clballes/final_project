<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <router-link to="/">
      <img src="../assets/logo_tofotask_bwhite.webp" alt="logo-tasks" class="navbar-img">
    </router-link>
    <div>
      <ul> 
        <li class="log-out-welcome">
          <p>Welcome, user</p>
        </li>
        <div class="user-nav" :class="showNavMenu ? 'active' : 'false'">
          <li>
            <button @click="signOut" class="button">
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="icon-font" />
            </button>
          </li>
          <li>
            <router-link to="/account">
              <font-awesome-icon icon="fa-solid fa-user" class="icon-font" />
            </router-link>
          </li>
        </div>

        <div class="hamburguer" @click="hamburguerMenu"
        :class="moveHamburger ? 'active' : 'inactive'">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
  errorMsg.value = "error";
};
// HAMBUERGUER MENU FUNCTIONS
const moveHamburger = ref(false);
const showNavMenu = ref(false);

const hamburguerMenu = async () => {
  moveHamburger.value = !moveHamburger.value;
  showNavMenu.value = !showNavMenu.value;
};
</script>

<style>
.navbar-img {
  width: 30px;
}
.user-nav{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 20px;
}

a{
  text-decoration: none;
}

nav {
  background-color: white;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  position: sticky;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-font{
  height: 20px;
  widows: 20px;
  color: #C17817;
  cursor: pointer;
}
button{
  background-color: white;
  border: none;
}

/* HAMBURGUER MENU */
.hamburguer{
    display: none;
    cursor: pointer;
}
.bar{
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3 ease-in-out;
    transition: all 0.3 ease-in-out;
    background-color:#6b708d96;
}
@media (max-width: 420px){
    .nav{
        display: flex;
        justify-content: space-between;
    }
    .hamburguer{
      display: block;
    } 
    .hamburguer.active .bar:nth-child(2){
    opacity: 0;
    }
    .hamburguer.active .bar:nth-child(1){
    transform: translateY(8px) rotate(45deg);
    }

    .hamburguer.active .bar:nth-child(3){
    transform: translateY(-8px) rotate(-45deg);
    }
    .user-nav.active{
        left: 0;
        top: 100px;
        padding-left: 60px;
        display: flex;
        align-items: flex-start;
    }
    .user-nav{
        position: fixed;
        top: -100%;
        background-color: rosybrown;
        flex-direction: column;
        width: 100%;
        text-align: center;
        transition: 0.3s;
    }
    .user-nav.active{
        left: 0;
    }
    ul{
        padding-inline-start: 0px;
    }
}
</style>
