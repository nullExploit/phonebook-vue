<script setup>
import { ref } from "vue";
import PhoneBookButton from "./PhoneBookButton.vue";
import { usePhoneBookStore } from "@/stores/phonebook";

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const phonebookStore = usePhoneBookStore();
const edit = ref(false);
const remove = ref(false);
const tempName = ref(props.name);
const tempPhone = ref(props.phone);

const editStatus = (data) => {
  edit.value = !data;
};

const delStatus = (data) => {
  remove.value = !data;
};

const del = (id) => {
  phonebookStore.removePhoneBook(id);
};

const update = (id, name, phone) => {
  phonebookStore.updatePhoneBook(id, name, phone);
  edit.value = false;
};
</script>

<template>
  <div className="details" v-if="edit">
    <input type="text" className="edits" v-model="tempName" />
    <input
      type="text"
      className="edits"
      v-model="tempPhone"
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
    />
    <br />
    <PhoneBookButton
      :id="id"
      :name="tempName"
      :phone="tempPhone"
      :edit="edit"
      :remove="remove"
      @on-delete-status="delStatus"
      @on-delete="del"
      @on-edit-status="editStatus"
      @on-edit="update"
    />
  </div>
  <div className="details" v-else>
    <p className="name">{{ name }}</p>
    <p>{{ phone }}</p>
    <br />
    <PhoneBookButton
      :id="id"
      :name="tempName"
      :phone="tempPhone"
      :edit="edit"
      :remove="remove"
      @on-delete-status="delStatus"
      @on-delete="del"
      @on-edit-status="editStatus"
      @on-edit="update"
    />
  </div>
</template>
