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
  participantLabel: 1,
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
    // console.log("Shards:", this.shards);
    // console.log("DID:", this.did);
  },

  // DID
  did: null,

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
    if (this.participantLabel < this.participants) {
      this.participantLabel++;
      this.rerender = !this.rerender; // trigger rerender of component
    } else if (this.participantLabel === this.participants) {
      this.acquiredIntentions = true;
    }
    // if (this.intentions.dreams.length === this.participants) {
    //   console.log("Intentions:", this.intentions);
    // }
  },

  // trigger rerender of GetIntentions
  rerender: false,

  //*** Closing Ceremony ***
  acquiredThreshold: false,
  collectingShards: false,
  acquiredClosingShards: false,
  shardNumber: 1,
  saveThreshold(t) {
    this.threshold = t;
    this.acquiredThreshold = true;
    console.log("threshold:", this.threshold);
    setTimeout(() => {
      this.collectingShards = true;
    }, 600);
  },
  saveClosingShards(shard) {
    if (this.shards === undefined) {
      this.shards = [];
      this.shards.push(shard);
    } else {
      this.shards.push(shard);
    }
    if (this.shardNumber < this.threshold) {
      this.shardNumber++;
      this.rerender = !this.rerender;
    } else if (this.shardNumber === this.threshold) {
      this.acquiredClosingShards = true;
      this.collectingShards = false;
    }
  },
  saveRetrievedIntentions(ct) {
    this.cleartext = ct;
    console.log("Retrieved intentions:", this.cleartext);
  },
});
