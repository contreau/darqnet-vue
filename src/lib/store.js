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

  // intentions submission
  beginIntentions: false,
});
