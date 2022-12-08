<!-- COMPONENTE BOILERPLATE -->
 
  <template>
    <div class="container-sign">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Sign in to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks <br> <b>Finish on time</b> <br>And enjoy your free time</p>
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
              <input v-if="showPassword" type="text" class="input" v-model="password" required />
              <input v-else type="password" class="input" v-model="password" required
              />
              </div>
              <div class="control">
                <button class="button-eye" @click="toggleShow"><span class="icon">
                <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i></span>
                </button>
              </div>
          </div>
          <button class="button-sign" type="submit">Sign In</button>
          <p>
            Not a member yet?
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

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
const toggleShow = (()=> {
  showPassword.value = !showPassword.value;
  window.stop();
  // window.location.reload(false);
});

</script>

<style>
</style>
