import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    temporalTags: null,
  }),
  actions: {
    changeTempTask(param) { 
      this.temporalTags = param;
    },
    
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    async addTask(title, description, plugin_url, tasks_tags) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
          plugin_url: plugin_url,
          tasks_tags: tasks_tags,
        },
      ]);
    },
    async updateTask(title, description, plugin_url, tasks_tags, id) {
      const { data, error } = await supabase.from("tasks").update([
          {
            title: title,
            description: description,
            plugin_url: plugin_url,
            tasks_tags: tasks_tags,  
          },
        ])
      .match({
        id: id,
      })
    },

    async updateDoneTask(is_complete, id) {
      const { data, error } = await supabase.from("tasks").update([
          {
            is_complete: !is_complete,
          },
        ])
      .match({
        id: id,
      })
    },

    async deleteTask(id){ 
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    }
  }
});
