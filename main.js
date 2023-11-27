const form = document.getElementById("form");
const input = document.getElementById("get-input");

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
    // const dictionaryInfo = { word, phonetics };
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
