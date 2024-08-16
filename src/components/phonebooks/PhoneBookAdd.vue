<script setup>
import { usePhoneBookStore } from "@/stores/phonebook";
import { ref } from "vue";

const phonebookStore = usePhoneBookStore();
const name = ref("");
const phone = ref("");
const submit = (name, phone, router) => {
  if (name && phone) {
    phonebookStore.addPhoneBook(name, phone);
    return router.push("/");
  }
  router.push("/");
};
</script>

<template>
  <section>
    <div className="input">
      <input type="text" v-model="name" />
      <input
        type="text"
        v-model="phone"
        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
      />
    </div>
    <div className="inputbutton">
      <button @click="() => submit(name, phone, $router)">save</button>
      <button @click="$router.push('/')">cancel</button>
    </div>
  </section>
</template>
