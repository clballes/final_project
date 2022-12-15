<template>
  <Tag />
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from "../stores/task";
import { useRouter } from 'vue-router';
import Nav from '../components/Nav.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import { useUserStore } from "../stores/user";
import Footer from '../components/Footer.vue';
import Tag from '../components/Tag.vue';
</script>

<style>

</style>