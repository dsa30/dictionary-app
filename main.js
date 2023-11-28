const form = document.getElementById("form");
const input = document.getElementById("get-input");
const wordDefinition = document.getElementById("word");
const wordPhonetic = document.getElementById("phonetic");
const sourceUrl = document.getElementById("urls");

const getUserInput = (event) => {
  const userInput = input.value;
  console.log(userInput);
  getWordInfo(userInput);
  event.preventDefault();
};

form.addEventListener("submit", getUserInput);

async function getWordInfo(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    const dictionaryInfo = {
      word: data[0].word,
      audio: data[0].phonetics[1].audio,
      phonetic: data[0].phonetic,
      definitions: data[0].meanings[0].definitions,
      definitionsVerb: data[0].meanings[1].definitions,
      urls: data[0].sourceUrls[0],
    };
    displayWordInfo(dictionaryInfo);
    getDefinitions(dictionaryInfo);
  } catch (error) {
    console.log(error);
  }
}

const displayWordInfo = (displayWordObj) => {
  console.log(displayWordObj);
  const { word, phonetic, urls, audio } = displayWordObj;
  wordDefinition.innerText = word;
  wordPhonetic.innerText = phonetic === undefined ? "N/A" : phonetic;
  sourceUrl.innerHTML = `<a href=${urls} class="flex items-center justify-start" target="_blank"
  >${urls}<i class="bi bi-box-arrow-up-right ml-2 inline-block"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="currentColor"
      class="bi bi-box-arrow-up-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
      />
      <path
        fill-rule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
      /></svg></i
></a>`;
};

const getDefinitions = (displayWordObj) => {
  const { definitions, definitionsVerb } = displayWordObj;
  let nounDefinition = document.getElementById("noun-definition");
  let verbDefinition = document.getElementById("verb-definitions");
  let example = document.getElementById("example");
  let meaningList = "";
  let meaningListVerb = "";
  let meaningExample = "";
  for (const definition in definitions) {
    meaningList += `<li>${definitions[definition].definition}</li>`;
  }

  for (const vDefinition in definitionsVerb) {
    meaningListVerb += `<li>${definitionsVerb[vDefinition].definition}</li>`;
    let wordExample = definitionsVerb[vDefinition].example;
    if (wordExample) {
      meaningExample += `<li>${definitionsVerb[vDefinition].example}</li>`;
    }
  }

  nounDefinition.innerHTML = meaningList;
  verbDefinition.innerHTML = meaningListVerb;
  example.innerHTML = meaningExample;
};
