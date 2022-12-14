import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import './assets/style.css';

// ICON LIBRARY FONTAWESOME
/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faEyeSlash, faTrash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faRightFromBracket, faLock, faUnlock, faPenToSquare, faUser, faSquareCheck, faEye, faTwitter, faFacebook, faInstagram, faEnvelope, faHeart, faSearch, faEye, faEyeSlash);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
