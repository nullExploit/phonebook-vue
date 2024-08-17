<script setup>
import { onMounted, onUpdated, ref } from "vue";
import PhoneBookSearch from "./PhoneBookSearch.vue";
import { usePhoneBookStore } from "@/stores/phonebook";
import PhoneBookItem from "./PhoneBookItem.vue";
import avatar from "@/assets/avatar.png";

const phonebookStore = usePhoneBookStore();

const sort = ref(false);
const search = ref("");
const page = ref(1);

const onScroll = () => {
  window.onscroll = () => {
    if (
      page.value < phonebookStore.total &&
      window.scrollY + window.innerHeight ===
        document.documentElement.scrollHeight
    ) {
      page.value += 1;
      phonebookStore.loadPhoneBook(sort.value, search.value, page.value);
    }
  };
};

const changeSearch = (data) => {
  search.value = data;
  page.value = 1;
  phonebookStore.loadPhoneBook(sort.value, search.value, page.value);
};

const changeSort = (data) => {
  sort.value = !data;
  page.value = 1;
  document.documentElement.scrollTop = 0;
  phonebookStore.loadPhoneBook(sort.value, search.value, page.value);
};

onMounted(() => {
  phonebookStore.loadPhoneBook(sort.value, search.value, page.value);
  onScroll();
});
</script>

<template>
  <section>
    <PhoneBookSearch
      :sort="sort"
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
