/* === State ===
start with 3 number arrays that give us the output for the bank, odds, and evens. */
const bank = [];
const odds = [];
const evens = [];

// We need a function that will give any number to the bank
function addToBank(number) {
  // we need to push the numbers wihtin the function in the bank
  bank.push(number);
  // make sure to render it, so it shows
  render();
}

// Now we need a function that moces the first number to the bank to the corresponding
// odds or even bucker without rendering..?
function sort() {
  const number = bank.shift();
  // so, if the number is divisible by 2 then push it into the field.
  if (number % 2 === 0) {
    evens.push(number);
    // if not, then it is more than likely odd and it goes into odd slot.
  } else {
    odds.push(number);
  }
}
// We need a funtion to sort the first number in the bank
function sortOne() {
  // sorts all "number" values into the genrealized bank before it splits into odds and evens
  sort();
  render();
}

function sortAll() {
  // Sorting all numbers in the bank or the length of the bank
  while (bank.length) {
    sort();
  }
  render();
}
// ===Component ===
//I need a number form so <form>
function NumberForm() {
  // calling the funtion to of form
  const $form = document.createElement("form");
  //then I need to input the type of variable it is, which is a number
  //Add the button function which is <button> Add number</button>
  //close the form </form>
  //then on the submit, I need to submit : add number to the bank.
  //Add the button function which is <button> Add number</button>
  //close the form </form>
  //then on the submit, I need to submit : add number to the bank.

  //We also want a <button> Sort 1</button> to make a button that we click, the number will move from the
  //bank to the odds or even slot.
  //-> on click: sort 1 number

  //To sort them all <button>Sort all</button>
  $form.innerHTML = `
    <label>
    Add a number to the bank
    <input name="number" type="number" />
    </label>
    <button type="submit" data-action="add"> Add number</button>
    <button type="submit" data-action="sortOne"> Sort 1</button>
    <button type="submit" data-action="sortAll"> Sort All</button>
    `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;

    //Then for the numbers that are presented, we want the title to change and the numbers to be different.
    //<h2>{title}</h2>
    //in the paragraph, each number from the array should turn into an element and space out a little.
    //<p>{each number in the array -> <span>{number}</spa>}</p>
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");
      if (number === null || number === "") return;
      addToBank(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });

  return $form;
}
/**
 * A single number in a NumberBank
 * @param {number} n
 */
function NumberInBank(n) {
  const $span = document.createElement("span");
  $span.textContent = n;
  return $span;
}

/**
 * A labeled group of Numbers
 * @component
 * @param {string} label
 * @param {number[]} numbers
 */
function NumberBank(label, numbers) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
    <h2>${label}</h2>
    <output></output>
  `;

  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);

  return $bank;
}

/* === Render ===
(this is what we are wanting to be displayed when the user is interacting with the browser.)
<h1> Odds and evens</h1>

<NumberForm/>
<form> with 1 input and 3 buttins. 
input: add a number to the bank
1. button one is to ut the number in the bank
2. button 2 is to move a umber from the bank to either odd or even. 
3. Last button is all numbers from the bank to go to either odd or even. 

<Numbers/>
<h2>{title}</h2>
{numbers array}

<Numbers
title=Bank
numbers= [72, 101]
/>

<Numbers
title=Odds
numbers=[1, 5, 3, 11, 13]
/>

<Numbers
title=Evens
numbers=[2,8,98]
/>
*/
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Odds and Evens</h1>
      <NumberForm></NumberForm>
      <NumberBank id="bank"></NumberBank>
      <NumberBank id="odds"></NumberBank>
      <NumberBank id="evens"></NumberBank>
    `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberBank#bank").replaceWith(NumberBank("Bank", bank));
  $app.querySelector("NumberBank#odds").replaceWith(NumberBank("Odds", odds));
  $app
    .querySelector("NumberBank#evens")
    .replaceWith(NumberBank("Evens", evens));
}
render();
