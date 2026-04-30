import { Memory } from "../brain/memory.js";
import { Mood } from "../brain/mood.js";
import { setupInput } from "./input.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("APP LOADED");

  const memory = new Memory();
  const mood = new Mood();

  setupInput(memory, mood);
});