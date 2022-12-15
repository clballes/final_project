<template>
  <Nav />
  <div class="account">
    <div class="all">
      <div class="all-part1">
        <h2>Choose your Avatar</h2>
        <div class="flex-avatar">
          <img @click="showAvatar" :src="avatar_url ? avatar_url : '/static-img/profile_blank1.png'" alt="Profile picture">
          <div v-show="showAvatarIcon" class="avatar-icons">
            <img src="/static-img/avatar1.png" alt="avatar1" class="icon-avatar" id="icon1" @click="chooseAvatar">
            <img src="/static-img/avatar2.png" alt="avatar2" class="icon-avatar" id="icon2" @click="chooseAvatar1">
            <img src="/static-img/avatar3.png" alt="avatar3" class="icon-avatar" id="icon3" @click="chooseAvatar2">
            <img src="/static-img/avatar4.png" alt="avatar4" class="icon-avatar" id="icon4" @click="chooseAvatar3">
          </div>
        </div>
        <div class="card-user">
          <div class="flex-position-card">
            <h3>
              Username: {{ username }}
            </h3>
            <button class="button-changes" @click="(editUsername = !editUsername)">
              <font-awesome-icon class="icon-edit" icon="fa-solid fa-pen-to-square" />
            </button>
          </div>
          <form 
                @submit.prevent="onSubmitUserName" 
                v-show="!editUsername" 
                class="form-account-div">
                    <input
                      class="input-account-form" 
                        type="text" 
                        placeholder="Update Email"
                        v-model="username"/>
                    <input type="submit" value="Change" class="update-button-account"/>
         </form>
        </div>
        <div class="form-account">
          <div class="card-user">
            <div class="flex-position-card">
              <h3>Email: {{ email }}</h3>
               <button class="button-changes" @click="(editEmail = !editEmail)">
                <font-awesome-icon class="icon-edit" icon="fa-solid fa-pen-to-square" />
              </button>
            </div>
            <form 
                @submit.prevent="onSubmitEmail" 
                v-show="!editEmail" 
                class="form-account-div">
                    <input 
                      class="input-account-form" 
                        type="text" 
                        placeholder="Update Email"
                        v-model="email"/>
                    <input type="submit" value="Change" class="update-button-account"/>
            </form>
          </div>
        </div>
          <div class="card-user">
            <h3>About Me</h3>
    
              <form class="form-about-us" @submit.prevent="onSubmitDescription">
                    <textarea 
                    class="card-user1" 
                    name="description" 
                    id="description" 
                    v-model="description"
                    placeholder="Enter your description here...">
                    </textarea>
                    <input type="submit" id="description-submit" value="Save Description" class="update-button-account"/>
              </form>

          </div>
        
    </div>
      <div>
        <img src="../assets/music_studio.png" alt="music" class="music-studio-img">
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
  import Footer from '../components/Footer.vue';
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  const userStore = useUserStore();

  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const email = ref(null);
  const user_id = ref('');
  const editEmail = ref(true);
  const editUsername = ref(true);
  const description = ref(null);
  const showAvatarIcon = ref('');
  
  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username.replace('@gmail.com', '');
    avatar_url.value = userStore.profile.avatar_url;
    email.value = userStore.profile.email;
    description.value = userStore.profile.description;
}
// Avatar icon div show
let showAvatar = async() => {
  showAvatarIcon.value = !showAvatarIcon.value
};

//Choose from different avatars
const chooseAvatar = async () => {
  avatar_url.value = '/static-img/avatar1.png';
  await userStore.updateAvatar(avatar_url.value);
};
const chooseAvatar1 = async () => {
  avatar_url.value = '/static-img/avatar2.png';
  await userStore.updateAvatar(avatar_url.value);
};
const chooseAvatar2 = async () => {
  avatar_url.value = '/static-img/avatar3.png';
  await userStore.updateAvatar(avatar_url.value);
};
const chooseAvatar3 = async () => {
  avatar_url.value = '/static-img/avatar4.png';
  await userStore.updateAvatar(avatar_url.value);
};
const onSubmitEmail = async () => {
    await userStore.updateEmail(email.value);
};
const onSubmitUserName = async () => {
    await userStore.updateUserName(username.value);
};
const onSubmitDescription = async () => {
    await userStore.updateDescription(description.value);
};

</script>

<style>
.form-about-us{
  display: flex;
    flex-direction: column;
    align-items: center;
}
#description-submit{
  width: 92%;
  padding: 3%;
}
#button-changes{
  background-color: white;
  color: black;
  cursor: pointer;
  border-radius: 25px;
  border: none;
  padding: 2%;
  margin-bottom: 2%;
  color: #0000ff;
}
#button-changes:hover{
  box-shadow: 0 0 15px #b2b2b2;

}
.flex-position-card{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.update-button-account{
  padding: 2%;
  border-radius: 8px;
  border: none;
  color: #0000ff;
  box-shadow: 0 0 5px #8a939ba0;
}
.icon-edit{
  color: #0000ff;
}
.flex-div-account{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.flex-avatar img {
  margin-top: 2%;
  width: 70px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 5px #8a939ba0;
}
.flex-avatar img:hover{
  box-shadow: 0 0 25px #8a939ba0;
}
.button-changes{
  background-color: white;
  color: black;
  cursor: pointer;
  border-radius: 25px;
  border: none;
  padding: 2%;
  margin-bottom: 2%;
}
.update-button-account:hover{
  box-shadow: 0 0 10px #070707b5;
  cursor: pointer;
}
.form-account{
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input-account-form{
  padding: 2%;
  width: 70%;
  margin-top: 3%;
  border: none;
  border-radius: 8px;
  margin-right: 2%;
}
textarea{
  margin-top: 2%;
  height: 200px;
  width: 200px;
  resize: none;
}
#save{
  border: none;
  border-radius: 30px;
  margin-top: 2%;
  padding: 4%;
  cursor: pointer;
  width: 35%;
  color: white;
  background-color: black;
}
.all-part1 h1{
  text-align: center;
}
.avatar-icons{
    display: flex;
    align-items: center;
    justify-content: center;
}
#icon1:hover{
  box-shadow: 0 0 25px #474548;
}
#icon2:hover{
  box-shadow: 0 0 25px #410360;
}
#icon3:hover{
  box-shadow: 0 0 25px #efe70a;
}
#icon4:hover{
  box-shadow: 0 0 25px #d35d08;
}

.all-part1{
  padding: 4%;
  width: 100%;
}
.card-user{
    border-radius: 20px;
    padding: 4%;
    width: 450px;
    background-color: #0000ffe8;
    color: white;
    margin-top: 5%;
    margin-right: 50px;
}
.card-user1{
  border-radius: 20px;
    padding: 4%;
    width: 85%;
    color: black;
    margin: 5%;
}
.card-user:hover{
  box-shadow: 0 0 15px #474548;
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
.music-studio-img{
  height: 60%;
  width: 180vh;
  opacity: 0.8;
}
.all{
  display: flex;
  align-items: flex-start;
}
h2{
  text-align: center;
  margin-bottom: 2%;
}

@media  (max-width:420px){
  .all-part1{
    margin-top: 40%;
  }
  .card-user{
    width: 92%;
    margin-right: 0%;
  }
  .music-studio-img{
    display: none;
  }
}

</style>