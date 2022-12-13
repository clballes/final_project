<template>
    <nav>
      <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
      <router-link to="/">
        <img src="../assets/logo_tofotask_bwhite.webp" alt="logo-tasks" class="navbar-img">
      </router-link>
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/">
        Search a plugin
      </router-link>
      
          <div>
        <ul>
          <div class="user-nav" :class="showNavMenu ? 'active' : 'false'">
            <li class="button-icon-nav">
              <button @click="signOut" class="button"> 
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="icon-font" />
              </button>
            </li>
            <li class="button-icon-nav1">
              <router-link to="/account">
                <font-awesome-icon icon="fa-solid fa-user" class="icon-font" />
              </router-link>
            </li>
            <div class="nav-title">
              <li>Log Out</li>
              <li>My Account</li>
            </div>

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
import PersonalRouter from "./PersonalRouter.vue";
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
  width: 35px;
  margin: 30% 0% 30% 90%;
}
#searchbar{
  padding: 3%;
}
.user-nav{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 15px;
}
.nav-title{
  display: none;
}
a{
  text-decoration: none;
}
nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    background-color: #E4572E;
  box-shadow: 0 0 5px #515151;
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
  width: 20px;
  color: white;
  cursor: pointer;
}
.button-icon-nav{
  margin-right: 50%;
}
button{
  background-color: transparent;
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
    .user-nav{
        position: fixed;
        top: -100%;
        background-color: rgb(163, 163, 163);
        flex-direction: column;
        width: 100%;
        text-align: center;
        transition: 0.3s;
    }
    .user-nav.active{
      left: 0;
      padding: 20px;
      top: 100px;
      width: 91%;
      display: flex;
      align-items: flex-end;
    }
    .nav-title{
       display:block;
    }
    ul{
        padding-inline-start: 0px;
    }
    .button-icon-nav
    {
      margin-right: 50%;
      display: none;
    }
    .button{
      background-color: transparent;
    }
}
</style>
