<template>
  <div class="flex-col flex gap-4 max-w-80">
    <UInput v-model="data.name" placeholder="name" />
    <UInput v-model="data.email" type="email" placeholder="email" />
    <UInput v-model="data.password" type="password" placeholder="password" />
    <UInput v-model="data.avatar" placeholder="avatar" />
  </div>
  <UButton label="Create User" :loading="isLoading" @click="createUser()" />
  <p>data user:</p>
  <pre>{{ allUsers }}</pre>
</template>

<script lang="ts" setup>
import type { UserCreateResponse } from "~/types/server-response";

const data = ref({
  name: "",
  email: "",
  password: "",
  avatar: "",
});

const isLoading = ref(false);

const toast = useToast();

async function createUser() {
  console.log(data.value);
  const response = await $fetch<UserCreateResponse>("/api/db/user", {
    method: "POST",
    body: data.value,
  });

  if (!response) {
    toast.add({
      title: "Create user error",
      color: "error",
      icon: "i-heroicons-x-circle",
    });
    return;
  }

  toast.add({
    title: response.message,
    description: response.data.name,
    color: "success",
    icon: "i-heroicons-check-circle",
  });
}

const { data: allUsers } = await useFetch("/api/db/user");
</script>
