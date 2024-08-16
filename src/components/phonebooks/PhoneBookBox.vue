<script setup>
import { onMounted, onUpdated, ref } from "vue";
import PhoneBookSearch from "./PhoneBookSearch.vue";
import { usePhoneBookStore } from "@/stores/phonebook";
import PhoneBookItem from "./PhoneBookItem.vue";
import avatar from "@/assets/avatar.png";

const phonebookStore = usePhoneBookStore();

const sort = ref(false);
const search = ref("");
const limit = ref(42);

const onScroll = () => {
  window.onscroll = () => {
    if (
      limit.value < phonebookStore.total &&
      window.scrollY + window.innerHeight ===
        document.documentElement.scrollHeight
    ) {
      limit.value += 10;
      phonebookStore.loadPhoneBook(sort.value, search.value, limit.value);
    }
  };
};

const changeSearch = (data) => {
  search.value = data;
  phonebookStore.loadPhoneBook(sort.value, search.value, limit.value);
};

const changeSort = (data) => {
  sort.value = !data;
  phonebookStore.loadPhoneBook(sort.value, search.value, limit.value);
};

onMounted(() => {
  phonebookStore.loadPhoneBook(sort.value, search.value, limit.value);
  onScroll();
});
</script>

<template>
  <section>
    <PhoneBookSearch
      :sort="sort"
      :limit="limit"
      @change-search="changeSearch"
      @change-Sort="changeSort"
    />
    <div className="phonebooks">
      <PhoneBookItem
        v-for="item in phonebookStore.phonebooks"
        :id="item.id"
        :name="item.name"
        :phone="item.phone"
        :avatar="item.avatar ? `http://localhost:3001/${item.avatar}` : avatar"
        :key="item.id"
      />
    </div>
  </section>
</template>
