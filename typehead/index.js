const BASE_URL = "https://api.frontendexpert.io/api/fe/glossary-suggestions";

const input = document.getElementById("typeahead");
const suggestionsList = document.getElementById("suggestions-list");
let timerId;

input.addEventListener("input", handleChange);

function handleChange(e) {
  clearTimeout(timerId);
  const value = e.target.value;
  if (value.length === 0) {
    clearSuggestions();
    return;
  }

  timerId = setTimeout(async () => {
    // const response = await fetch(`${BASE_URL}?text=${value}`);
    const responseJson = [
      "Absolute Unit",
      "Accessibility",
      "Accessibility Tree",
      "Animations",
      "Array",
      "Arrow Function",
      "Atomic CSS",
      "Attribute",
      "async function",
      "await",
    ]; //await response.json();
    appendSuggestionsToDom(responseJson);
  }, 500);
}

function appendSuggestionsToDom(suggestions) {
  const fragment = document.createDocumentFragment();
  suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    fragment.appendChild(li);
    li.addEventListener("click", handleClickSuggestion);
  });

  suggestionsList.replaceChildren(fragment);
}

function clearSuggestions() {
  suggestionsList.textContent = "";
  clearTimeout(timerId);
}

function handleClickSuggestion() {
  input.value = this.textContent;
  clearSuggestions();
}
