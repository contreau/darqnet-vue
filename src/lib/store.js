import { reactive } from "vue";
export const store = reactive({
  // ceremony details
  ceremonyType: "",
  ceremonyChosen: false,
  createOpeningCeremony() {
    this.ceremonyChosen = true;
    console.log("Opening Ceremony chosen.");
    setTimeout(() => {
      this.ceremonyType = "open";
    }, 500);
  },
  createClosingCeremony() {
    this.ceremonyChosen = true;
    console.log("Closing Ceremony chosen.");
    setTimeout(() => {
      this.ceremonyType = "close";
    }, 500);
  },

  // participant and threshold
  participants: 0,
  threshold: 0,
  acquiredPT: false,
  fadeOutPT() {
    this.acquiredPT = true;
    console.log(
      "participants:",
      this.participants,
      "threshold:",
      this.threshold
    );
    setTimeout(() => {
      this.beginIntentions = true;
    }, 500);
  },

  // shards
  saveShards(shards) {
    this.shards = shards;
    console.log(this.shards);
    console.log(this.did.id);
  },

  // DID
  did: "",

  // intentions submission
  beginIntentions: false,
  acquiredIntentions: false,
  intentions: {
    dreams: [],
    conjurations: [],
    essence: [],
  },
  saveIntentions(d, c, e) {
    this.intentions.dreams.push(d);
    this.intentions.conjurations.push(c);
    this.intentions.essence.push(e);
    this.acquiredIntentions = true;
    console.log(this.intentions);
  },
});
