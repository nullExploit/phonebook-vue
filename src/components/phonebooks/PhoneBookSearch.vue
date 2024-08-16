<script setup>
import {
  faArrowDownAZ,
  faArrowUpZA,
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineProps({
  sort: { type: Boolean, required: true },
  limit: { type: Number, required: true },
});
</script>

<template>
  <div className="search-container">
    <button className="sorting-button" @click="$emit('changeSort', sort)">
      <FontAwesomeIcon :icon="!sort ? faArrowUpZA : faArrowDownAZ" />
    </button>
    <input
      className="search-bar"
      type="text"
      @keyup="(evt) => $emit('changeSearch', evt.target.value)"
    />
    <span>
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </span>
    <button className="add-button" @click="$router.push('/add')">
      <FontAwesomeIcon :icon="faUserPlus" />
    </button>
  </div>
</template>
