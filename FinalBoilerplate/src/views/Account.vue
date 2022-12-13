<template>
  <Nav />
  <div class="account">
    <h1> {{username}}</h1>
    <div>
      <div class="flex-avatar">
        <img @click="showAvatar" :src="avatar_url ? avatar_url : '/src/assets/profile_blank1.png'" alt="Profile picture">
        <div v-show="showAvatarIcon" class="avatar-icons">
          <img src="../assets/avatar1.png" alt="avatar1" class="icon-avatar" @click="chooseAvatar">
          <img src="../assets/avatar2.png" alt="avatar2" class="icon-avatar" @click="chooseAvatar1">
          <img src="../assets/avatar3.png" alt="avatar3" class="icon-avatar" @click="chooseAvatar2">
          <img src="../assets/avatar4.png" alt="avatar4" class="icon-avatar" @click="chooseAvatar3">
        </div>
        <h3>Email: {{ email }} </h3>
      </div>
      <div class="form-account">
        <label for="Description">Description</label>
        <textarea name="description" id="description" 
        cols="54" 
        rows="10"
        placeholder="Enter your description here...">
      </textarea>
      <input type="submit" name="Save" id="save">
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';

  const userStore = useUserStore();

  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const email = ref(null);
  const user_id = ref('');
  
  const showAvatarIcon = ref('');
  
  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username.replace('@gmail.com', '');
    avatar_url.value = userStore.profile.avatar_url;
    email.value = userStore.profile.username;
}
// Avatar icon div show
let showAvatar = async() => {
  showAvatarIcon.value = !showAvatarIcon.value
};

//Choose from different avatars
const chooseAvatar = async () => {
  avatar_url.value = '../src/assets/avatar1.png';
  await userStore.updateAvatar(avatar_url.value);
};
const chooseAvatar1 = async () => {
  avatar_url.value = '../src/assets/avatar2.png';
  await userStore.updateAvatar(avatar_url.value);
};
const chooseAvatar2 = async () => {
  avatar_url.value = '../src/assets/avatar3.png';
  await userStore.updateAvatar(avatar_url.value);
};
const chooseAvatar3 = async () => {
  avatar_url.value = '../src/assets/avatar4.png';
  await userStore.updateAvatar(avatar_url.value);
};
</script>

<style>
img {
  margin-top: 2%;
  width: 150px;
  border-radius: 50%;
  cursor: pointer;
}
.account{
  margin: 5%;
}
.form-account{
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#save{
  border: none;
  margin-top: 2%;
  padding: 1%;
  cursor: pointer;
  width: 35%;
  color: white;
  background-color: black;
}
.avatar-icons{
    display: flex;
    align-items: center;
    justify-content: center;
}
h3{
  margin-top: 2%;
}
.cards{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.icon-avatar{
    height: 5%;
    width: 5%;
    margin: 3%;
}
.flex-avatar{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>