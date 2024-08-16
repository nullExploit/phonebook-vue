<script setup>
import { ref } from "vue";
import PhoneBookDetail from "./PhoneBookDetail.vue";
import { usePhoneBookStore } from "@/stores/phonebook";

defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String },
});

const phonebookStore = usePhoneBookStore();

const fileName = ref(null);
const file = ref(null);

const handleSubmit = async (event, id) => {
  event.preventDefault();
  phonebookStore.updatePhoneBookAvatar(id, file.value);
};

const handleChange = (event, id) => {
  if (event.target.files[0]) {
    fileName.value = URL.createObjectURL(event.target.files[0]);
    file.value = event.target.files[0];
    setTimeout(() => {
      document.getElementById(`submit${id}`).click();
    });
  }
};

const handleInput = (id) => {
  document.getElementById(`fileUpload${id}`).click();
};
</script>

<template>
  <div className="phonebook-item">
    <img
      className="img"
      :src="fileName ? fileName : avatar"
      :alt="file"
      @click="() => handleInput(id)"
    />
    <form
      @submit.prevent="(evt) => handleSubmit(evt, id)"
      :id="`formUpload${id}`"
      :style="{ display: 'none' }"
      encType="multipart/form-data"
    >
      <input
        type="file"
        :id="`fileUpload${id}`"
        accept="image/*"
        @change="(evt) => handleChange(evt, id)"
      />
      <button type="submit" :id="`submit${id}`" />
    </form>
    <PhoneBookDetail :name="name" :phone="phone" :id="id" />
  </div>
</template>
