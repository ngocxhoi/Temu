<template>
  <div>
    <label
      v-if="!fileDisplay"
      @drop.prevent="onDrop($event)"
      @dragover.prevent=""
      for="fileInput"
      class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center w-full max-w-[260px] h-40 text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      <Icon name="lucide:cloud-upload" size="40" class="text-[#b3b3b1]" />
      <div class="text-[17px]">Chọn một hình ảnh</div>
      <p class="text-[13px] text-gray-50">Hoặc</p>
      <div class="mt-1.50">Kéo ảnh vào trong ô</div>

      <input
        ref="file"
        @input="onchange()"
        type="file"
        id="fileInput"
        hidden
        accept="image/*"
      />
    </label>

    <img
      v-else
      class="md:mx-0 max-w-60 mx-auto rounded-full object-cover aspect-square"
      :src="fileDisplay"
    />
  </div>
  <UButton
    :disabled="!fileDisplay"
    @click="onUpload()"
    label="Upload Image"
    color="error"
    size="xl"
  />
</template>

<script setup lang="ts">
let file = ref<HTMLInputElement>();
let fileDisplay = ref("");
let fileData = ref<File[]>([]);

const toast = useToast();
const emit = defineEmits<{
  uploaded: [];
}>();

const upload = useUpload("/api/images/blob", { method: "PUT" });

async function onUpload() {
  const uploadedFiles = await upload(fileData.value);
  if (!uploadedFiles) {
    return toast.add({
      title: "Upload error",
      color: "error",
      icon: "i-heroicons-x-circle",
    });
  }

  toast.add({
    title: "Upload success",
    description: uploadedFiles[0].pathname,
    color: "success",
    icon: "i-heroicons-check-circle",
  });
  await sleep(3000);
  emit("uploaded");
  discard();
}

const onchange = () => {
  if (!file.value?.files?.length) return;
  fileData.value.push(file.value.files[0]);
  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
};

const onDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files[0];
  if (!file) return;
  fileDisplay.value = URL.createObjectURL(file);
  fileData.value.push(file);
};

function discard() {
  fileDisplay.value = "";
  fileData.value = [];
  file.value = undefined;
}
</script>
