<script setup>
import {
  faCheck,
  faFloppyDisk,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  edit: { type: Boolean, required: true },
  remove: { type: Boolean, required: true },
});
</script>

<template>
  <div className="button" v-if="remove">
    <span className="buttons" @click="() => $emit('onDelete', id)">
      <FontAwesomeIcon :icon="faCheck" />
    </span>
    <span className="buttons" @click="() => $emit('onDeleteStatus', remove)">
      <FontAwesomeIcon :icon="faXmark" />
    </span>
  </div>
  <div className="button" v-else-if="edit">
    <span className="buttons" @click="() => $emit('onEdit', id, name, phone)">
      <FontAwesomeIcon aria-label="editbutton" :icon="faFloppyDisk" />
    </span>
  </div>
  <div className="button" v-else>
    <span className="buttons" @click="() => $emit('onEditStatus', edit)">
      <FontAwesomeIcon aria-label="editbutton" :icon="faPenToSquare" />
    </span>
    <span className="buttons" @click="() => $emit('onDeleteStatus', remove)">
      <FontAwesomeIcon :icon="faTrashCan" />
    </span>
  </div>
</template>
