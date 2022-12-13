<template>
  <div class="footer-1">
    <div class="footer">
      <img src="../assets/logo_tofotask_bwhite.webp" class="logo-app" alt="logo-app">
      <h3>Todo App</h3>
      <p>Contact Us</p>
      <p>93 342 345 123</p>
    </div>
    <div class="services">
      <h4>Services</h4>
      <h4>Join the community</h4>
      <h4>Newsletter</h4>
      <h4>About Us</h4>
    </div>
  </div>
  <div class="icon-footer">
      <font-awesome-icon class="icon-svg" icon="fa-brands fa-twitter" />
      <font-awesome-icon class="icon-svg" icon="fa-brands fa-facebook" />
      <font-awesome-icon class="icon-svg" icon="fa-brands fa-instagram" />
      <font-awesome-icon class="icon-svg" icon="fa-solid fa-envelope" />
  </div>
  <div class="rights">
    <h4>All rights reserved. To Do App project</h4>    
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style>
.footer-1{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5%;
}
.footer{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10%;
}
.services h4, .footer h3, .footer p, .rights h4{
  margin-top: 15%;
}
.rights{
  display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2%;
    margin-top: -13%;
}
.services{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-right: 10%;
}
.icon-footer{
    color: #E4572E;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    padding: 4% 0%;
}
.icon-svg{
  width: 30px;
  height: 30px;
}
.logo-app{
  width: 30px;
  height: 30px;
}

</style>