<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { store } from "./store";
let queryText;
let input;
onMounted(() => {
  queryText = document.querySelector(".queryText");
  input = document.querySelector("input");
  setTimeout(() => {
    queryText.style.opacity = "1";
    input.focus();
  }, 2000);
});
let gotParticipants = ref(false);
let gotThreshold = ref(false);

function processPT() {
  if (!gotParticipants.value) {
    if (!isNaN(parseInt(input.value))) {
      store.participants = parseInt(input.value);
      input.value = "";
      gotParticipants.value = true;
      input.focus();
    }
  } else if (gotParticipants.value && !gotThreshold.value) {
    if (
      !isNaN(parseInt(input.value)) &&
      parseInt(input.value) <= store.participants
    ) {
      store.threshold = parseInt(input.value);
      input.value = "";
      store.fadeOutPT();
    }
  }
}

function validateThreshold() {
  if (gotParticipants.value && parseInt(input.value) > store.participants)
    input.style.borderColor = "red";
  else {
    input.style.borderColor = "var(--flame-color)";
  }
}
</script>

<template>
  <div class="query__container">
    <div class="teardrop-wrap">
      <div class="teardrop"></div>
    </div>
    <p class="queryText">
      <span v-if="!gotParticipants">how many have gathered?</span>
      <span v-if="gotParticipants && !gotThreshold"
        >what is your threshold?</span
      >
    </p>
    <div class="input__container">
      <input type="text" class="input" autofocus @keyup="validateThreshold" />
      <button class="submit" @click="processPT">&#5129;</button>
    </div>
  </div>
</template>

<style scoped>
input,
button {
  background: transparent;
  font: inherit;
  transition: 0.4s all;
  border: transparent;
}

.input {
  color: #fff;
  border-radius: 50%;
  padding: 0.5em;
  font-size: 2.3rem;
  width: 100%;
  outline: none;
  text-align: center;
  border-bottom: solid 1px var(--flame-color);
  transition: border-color 0.4s;
}

.input::placeholder {
  color: #f0f0f0;
  animation: fadeIn 1s ease-in forwards;
}

.submit {
  opacity: 0;
  animation: fadeIn 0.4s 2.8s ease-in forwards;
  rotate: 90deg;
  margin-top: 1rem;
  font-size: 2.7rem;
  outline-color: transparent;
  color: #fff;
  filter: drop-shadow(0 0 0.1em var(--flame-color));
  border-radius: 50%;
  width: min-content;
}

.submit:hover,
.submit:focus {
  rotate: 0deg;
  cursor: pointer;
  color: #9d9d9d;
  outline: transparent;
}

.input__container {
  opacity: 0;
  animation: fadeIn 0.4s 2.2s ease-in forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
  margin-top: 4.5rem;
}

.query__container {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}

.queryText {
  opacity: 0;
  font-size: 2.1rem;
  font-weight: 700;
  text-align: center;
  filter: drop-shadow(0 0 0.35em var(--flame-color));
  transition: 1s all;
}

.teardrop-wrap {
  margin: 0 auto;
  margin-bottom: 6.5rem;
  min-height: 2rem;
  width: 2rem;
  filter: blur(0.025rem);
}

.teardrop {
  opacity: 0;
  animation: fadeIn 0.4s 0.8s ease-in forwards;
  position: relative;
  margin: 0 auto;
  min-height: 2rem;
  width: 2rem;
  border-radius: 95% 15% 100% 0% / 100% 15% 95% 0%;
  border: solid 1px transparent;
  background: var(--open-circle);
  rotate: -45deg;
  filter: drop-shadow(0 0 0.8em var(--open-circle));
  transition: 0.5s all;
}

.teardrop::after {
  content: "";
  position: absolute;
  width: 3rem;
  min-height: 3rem;
  border-bottom: solid 2px var(--flame-color);
  border-radius: 50%;
  left: 0.2rem;
  bottom: 0.2rem;
  rotate: 225deg;
}
</style>
