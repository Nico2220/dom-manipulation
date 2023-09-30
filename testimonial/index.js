import { data } from "./data.js";

// const API_BASE_URL = "https://api.frontendexpert.io/api/fe/testimonials";

const divContainer = document.getElementById("testimonial-container");
const LIMIT = 5;
let after = null;
let canFetchTestimonials = true;

console.log("divContainer=", divContainer);
divContainer.addEventListener("scroll", handleScroll);

function handleScroll() {
  if (!canFetchTestimonials) return;
  const bottomSpaceLeft =
    this.scrollHeight - (this.scrollTop + this.clientHeight);

  if (bottomSpaceLeft > 0) return;
  fetchAndAppendTestimonials();
}

async function fetchAndAppendTestimonials() {
  canFetchTestimonials = false;
  // const response = await fetch(createUrl());
  const { testimonials, hasNext } = data; //await response.json();

  const fragment = document.createDocumentFragment();

  testimonials.forEach(({ message }) => {
    const p = document.createElement("p");
    p.classList.add("testimonial");
    p.textContent = message;
    fragment.appendChild(p);
  });

  divContainer.appendChild(fragment);

  if (hasNext) {
    after = testimonials[testimonials.length - 1].id;
  } else {
    after = null;
    divContainer.removeEventListener("scroll", handleScroll);
  }
  canFetchTestimonials = true;
}

function createUrl() {
  const url = new URL(API_BASE_URL);
  url.searchParams.set("limit", LIMIT);

  if (after != null) {
    url.searchParams.set("after", after);
  }
  return url;
}

fetchAndAppendTestimonials();
