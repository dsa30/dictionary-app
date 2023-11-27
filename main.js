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
  const { word, phonetic, urls, definitions, definitionsVerb } = displayWordObj;
  wordDefinition.innerText = word;
  wordPhonetic.innerText = phonetic === undefined ? "N/A" : phonetic;
  sourceUrl.innerText = urls;
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
