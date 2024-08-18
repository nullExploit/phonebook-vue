import { ref } from "vue";
import { defineStore } from "pinia";
import { api } from "./api";

export const usePhoneBookStore = defineStore("phonebook", () => {
  const phonebooks = ref([]);
  const total = ref(0);

  async function loadPhoneBook(sort, keyword, page) {
    try {
      const { data } = await api.get(
        `graphql?query={phonebooks(sort:${sort ? -1 : 1},keyword:${
          keyword ? `"${keyword}"` : `""`
        },limit:42,page:${page}){id,name,phone,avatar}totalphonebook(keyword:"${keyword}")}`
      );
      if (page === 1) {
        phonebooks.value = data.data.phonebooks;
      } else if (page !== 1) {
        phonebooks.value = phonebooks.value.concat(data.data.phonebooks);
      }
      total.value = Math.ceil(data.data.totalphonebook / 42);
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
      const query =
        "mutation updatePhoneBook ($id: String!, $name: String!, $phone: String!) {updatephonebook (id: $id, name: $name, phone: $phone) {id}}";
      const variables = {
        id,
        name,
        phone,
      };
      await api.post("graphql", { query, variables });
      phonebooks.value = phonebooks.value.map((item) => {
        if (item.id === id) {
          item.name = name;
          item.phone = phone;
        }
        return item;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function removePhoneBook(id) {
    try {
      const query =
        "mutation removePhoneBook ($id: String!) {removephonebook (id: $id) {id}}";
      const variables = {
        id,
      };
      await api.post("graphql", { query, variables });
      phonebooks.value = phonebooks.value.filter((item) => item.id !== id);
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
