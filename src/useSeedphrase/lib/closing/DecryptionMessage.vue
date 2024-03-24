<script setup>
import { onMounted, ref } from "vue";
import { store } from "../store";
import { DID } from "dids";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "key-did-resolver";
import * as seedsplit from "../../js/seedsplit";
import * as Bip39 from "bip39";
let type = ref("default");
const API_URL = "https://ceramic-clay.3boxlabs.com";

async function decryptShards(API_URL) {
  const mnemonic = await seedsplit.combine(store.shards);
  const seed = new Uint8Array(Bip39.mnemonicToSeedSync(mnemonic).slice(0, 32));
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider, resolver: KeyResolver.getResolver() });
  await did.authenticate();
  const ceramic = new CeramicClient(API_URL);
  ceramic.did = did;
  const doc = await TileDocument.create(
    ceramic,
    null,
    { deterministic: true },
    { anchor: false, publish: false }
  );
  const jwe = doc.content;
  const cleartext = await did.decryptDagJWE(jwe);
  store.saveRetrievedIntentions(cleartext);
}

onMounted(() => {
  decryptShards(API_URL);
});
</script>

<template>
  <div class="teardrop-wrap">
    <div class="teardrop"></div>
  </div>
  <div class="orb-container container">
    <div class="orb" type="default"></div>
    <div class="flame-container container">
      <div class="flame flame-1"></div>
      <div class="flame flame-2"></div>
      <div class="flame flame-3"></div>
    </div>
    <div class="flame-base" type="default"></div>
  </div>
  <p class="message">decrypting intentions</p>
</template>

<style scoped>
.teardrop-wrap {
  opacity: 0;
  animation: fadeIn 0.7s ease-in forwards;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 1.5rem;
  min-height: 2rem;
  width: 2rem;
  filter: blur(0.025rem);
}

.teardrop {
  animation: shiftColor 0.5s 9.5s ease-in forwards;
  position: relative;
  margin: 0 auto;
  margin-bottom: 5rem;
  min-height: 2rem;
  width: 2rem;
  border-radius: 95% 15% 100% 0% / 100% 15% 95% 0%;
  border: solid 1px transparent;
  background: var(--close-circle);
  rotate: -45deg;
  filter: drop-shadow(0 0 0.8em var(--close-circle));
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

.container {
  max-width: 18rem;
}

.flame-container {
  position: absolute;
  width: 10%;
  bottom: 10rem;
  display: flex;
  justify-content: center;
}

.flame-base {
  min-height: 1.25rem;
  max-width: 2.5rem;
  width: 100%;
  background-color: var(--flame-color);
  border-radius: 2.5rem 2.5rem 0 0;
  transform: rotate(180deg);
  filter: drop-shadow(0 0 0.3em var(--flame-color));
  z-index: 4;
  margin: 8rem 0 1rem 0;
  transition: 0.5s all;
}

.flame-base[type="success"] {
  background-color: var(--success);
  filter: drop-shadow(0 0 0.3em var(--success));
}

.flame {
  position: absolute;
  z-index: -1;
  opacity: 0;
  bottom: 0.4rem;
  min-height: 1.8rem;
  max-width: 1.8rem;
  width: 100%;
  background-color: var(--success);
  filter: drop-shadow(0 0 0.3em var(--success));
  border-radius: 56% 44% 88% 12% / 100% 0% 100% 0%;
  transform: rotate(-40deg);
  transition: 0.5s all;
}

.flame-1 {
  animation: float 1.5s 0.5s 5;
}

.flame-2 {
  animation: float 1.5s 1s 5;
}

.flame-3 {
  animation: float 1.5s 1.5s 5;
}

.orb-container {
  opacity: 0;
  animation: fadeIn 0.7s 0.4s ease-in forwards;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: blur(0.055rem);
  border-bottom: solid 1px var(--flame-color);
  border-radius: 50%;
}

.orb {
  min-height: 5.5rem;
  max-width: 5.5rem;
  width: 100%;
  background-image: var(--decrypt-gradient);
  background-size: 300%;
  filter: drop-shadow(0 0 0.3em #04eca3);
  background-position: right;
  border: solid 2px var(--decrypt-gradient);
  animation: shiftGradient 1.2s infinite ease-in-out alternate;
  border-radius: 50%;
  transform: translateY(2.3rem);
  transition: 0.5s all;
}

@keyframes shiftGradient {
  100% {
    filter: drop-shadow(0 0 0.9em #04eca3);
    background-position: left;
    border: solid 2px var(--decrypt-gradient);
    transform: translateY(3.2rem);
  }
}

@keyframes shiftColor {
  100% {
    background: var(--success);
    filter: drop-shadow(0 0 0.8em var(--success));
  }
}

@keyframes float {
  40% {
    opacity: 1;
  }
  80% {
    transform: translate(0rem, -8.5rem);
  }
  90% {
    opacity: 0;
  }
  95% {
    transform: rotate(200deg);
  }
  100% {
    min-height: 0;
  }
}
.message {
  opacity: 0;
  font-size: 2.1rem;
  font-weight: 700;
  text-align: center;
  margin-top: 5rem;
  filter: drop-shadow(0 0 0.1em #fff);
  text-align: center;
  transition: 0.5s all;
}
</style>
