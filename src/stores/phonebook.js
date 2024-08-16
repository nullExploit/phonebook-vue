import { ref } from "vue";
import { defineStore } from "pinia";
import { api } from "./api";

export const usePhoneBookStore = defineStore("phonebook", () => {
  const phonebooks = ref([]);
  const total = ref(0);

  async function loadPhoneBook(sort, keyword, limit) {
    try {
      const { data } = await api.get(
        `graphql?query={phonebooks(sort:${sort ? -1 : 1},keyword:${
          keyword ? `"${keyword}"` : `""`
        },limit:${limit}){id,name,phone,avatar}}`
      );
      phonebooks.value = data.data.phonebooks;
      const totalData = await api.get(
        `graphql?query={phonebooks(sort:${sort ? -1 : 1},keyword:${
          keyword ? `"${keyword}"` : `""`
        },limit:null){id,name,phone,avatar}}`
      );
      total.value = totalData.data.data.phonebooks.length;
    } catch (error) {
      console.log(error);
    }
  }

  async function addPhoneBook(name, phone) {
    try {
      const id = Date.now().toString();
      phonebooks.value.unshift({ id, name, phone });
      const query =
        "mutation addPhoneBook ($name: String!, $phone: String!) {addphonebook (name: $name, phone: $phone) {id}}";
      const variables = {
        name,
        phone,
      };
      const { data } = await api.post("graphql", { query, variables });
      phonebooks.value = phonebooks.value.map((item) => {
        if (item.id === id) {
          item.id = data.data.addphonebook.id;
        }
        return item;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePhoneBook(id, name, phone) {
    try {
      phonebooks.value = phonebooks.value.map((item) => {
        if (item.id === id) {
          item.name = name;
          item.phone = phone;
        }
        return item;
      });
      const query =
        "mutation updatePhoneBook ($id: String!, $name: String!, $phone: String!) {updatephonebook (id: $id, name: $name, phone: $phone) {id}}";
      const variables = {
        id,
        name,
        phone,
      };
      await api.post("graphql", { query, variables });
    } catch (error) {
      console.log(error);
    }
  }

  async function removePhoneBook(id) {
    try {
      phonebooks.value = phonebooks.value.filter((item) => item.id !== id);
      const query =
        "mutation removePhoneBook ($id: String!) {removephonebook (id: $id) {id}}";
      const variables = {
        id,
      };
      await api.post("graphql", { query, variables });
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePhoneBookAvatar(id, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const query =
        "mutation updateAvatarPhoneBook ($id: String!, $avatar: String!) {updateavatarphonebook (id: $id, avatar: $avatar) {id, avatar}}";
      const { data } = await api.put(`upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const variables = {
        id,
        avatar: data.fileName,
      };
      await api.post("graphql", { query, variables });
      phonebooks.value = phonebooks.value.map((item) => {
        if (item.id === id) {
          item.avatar = data.fileName;
        }
        return item;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    phonebooks,
    total,
    loadPhoneBook,
    addPhoneBook,
    updatePhoneBook,
    removePhoneBook,
    updatePhoneBookAvatar,
  };
});
