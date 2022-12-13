<!-- COMPONENTE BOILERPLATE -->
  
  <template>
   <div class="container-sign">
        <div class="header">
          <div class="header-description">
            <img src="../assets/logo_tofotask_bwhite.webp" alt="logo" class="logo-icon">
            <h1 class="header-title">Sign in</h1>
            <button class="button-google">
              <img src="../assets/g-logo.png" alt="logo-google" class="icon-google">
              <a href="https://sneansmjwxmhkrnvwscn.supabase.co/auth/v1/authorize?provider=google">SIGN IN WITH GOOGLE</a>
            </button>
              <hr /> 
          </div>
        </div>
        <form @submit.prevent="signIn" class="form-sign">
          <div class="div-form-sign">
              <div class="form-input-email">
                <input
                  type="email"
                  class="input-field"
                  placeholder="Email"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="field-has-addons">
                <div class="show-hide-password">
                  <input v-if="showPassword" type="text" class="input" v-model="password" placeholder="Password" required />
                  <input v-else type="password" class="input-password" v-model="password" placeholder="Password" required
                  />
                  </div>
                  <div class="control">
                    <button class="button-eye" @click.prevent="toggleShow">
                      <span class="icon">
                      <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i></span>
                    </button>
                  </div>
              </div>
              <button class="button-sign" type="submit">Sign In</button>
              <p>
                Not a member yet? <br>
                <PersonalRouter
                  :route="route"
                  :buttonText="buttonText"
                  class="sign-up-link-sign"
                />
              </p>
          </div>
        </form>
        <div v-show="errorMsg">{{errorMsg}}</div>
    </div>


</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from '../supabase'
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
// import { createClient } from "@supabase/supabase-js";




// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
  errorMsg.value = "error";
};

//hide and show password
const showPassword = ref(false);
const toggleShow = (() => {
  showPassword.value = !showPassword.value;
});

</script>

<style>
</style>
