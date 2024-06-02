const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("form input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
          newOption.selected = "Selected";
        }
        else if (select.name === "to" && currCode === "INR"){
        newOption.selected = "Selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlage(evt.target);
    });
};
 const updateFlage =(element)=> {
    let currCode= element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let  img = element.parentElement.querySelector("img");
    img.src = newSrc;
 };

 btn.addEventListener("click", async (evt) => {
    evt.preventDefault();//this will stop all acctions that are defualt ,like refreshing page on every click.
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    };
    // console.log(fromCurr.value);
    // console.log(toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
 });
 

