<template>
  <div class="grid grid-cols-4 gap-4">
    <div v-for="file in dataFiles" :key="file.id">
      <img
        @click="handleImageClick(file.pathname)"
        :src="`/api/images/${file.pathname}`"
        alt=""
      />
    </div>
  </div>
  <p>Upload files</p>
  <Upload @uploaded="getFiles()" />

  <div class="py-4">
    <hr />
  </div>

  <p class="text-2xl">Update user</p>

  <UpdateUser />
</template>

<script lang="ts" setup>
import type { DeleteBlobResponse } from "~/types/server-response";

useSeoMeta({
  title: "Home",
});

const toast = useToast();

const dataFiles = ref<any[]>([]);

async function getFiles() {
  const data = await $fetch("/api/images/files");
  if (data) {
    dataFiles.value = data.sort(
      (a, b) =>
        new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
    );
  }
}

async function handleImageClick(pathname: string) {
  const data = await $fetch<DeleteBlobResponse>(`/api/images/${pathname}`, {
    method: "DELETE",
  });

  if (!data) {
    return toast.add({
      title: "Remove error",
      color: "error",
      icon: "i-heroicons-x-circle",
    });
  }

  toast.add({
    title: data.message,
    description: data.pathname,
    color: "success",
    icon: "i-heroicons-check-circle",
  });

  await getFiles();
}

onMounted(async () => {
  await getFiles();
});
</script>
