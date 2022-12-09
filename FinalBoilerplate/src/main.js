import { createApp } from "vue";
import { createPinia } from "pinia";



import App from "./App.vue";
import router from "./router";

import './assets/style.css';

// ICON LIBRARY FONTAWESOME
/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faRightFromBracket, faPenToSquare, faUser, faSquareCheck );

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
