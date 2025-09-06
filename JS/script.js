const synonyms = (arr) => {
    if(arr.length > 0){
        const HTMLElements = arr.map(el => `<span class=" bg-[#EDF7FF] border-[#D7E4EF] px-5 py-2 text-[20px] rounded-md mr-4">${el}</span>`);
        return HTMLElements.join(" ");
    }
    else{
        return `<span class=" bg-[#EDF7FF] border-[#D7E4EF] px-5 py-2 text-[20px] rounded-md mr-4">"There is no Synonyms.</span>`
    }
}

fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res => res.json())
.then(data => showData(data.data));

const showData = (data) => {
    const lessonContainer = document.getElementById('lessonContainer');
    data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `<button onclick = "loadCard(${element.level_no})" id="btn_lesson_${element.level_no}" class=" btn btn-outline btn-primary AllCard"><i class="fa-solid fa-book-open"></i> lesson-${element.level_no}</button>`;
        lessonContainer.appendChild(div);
    });
}

const loadCard = (id) =>{
    ManageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => ShowCard(data.data))
    //active class toggle 
    const AllCard = document.getElementsByClassName('AllCard');
    for(card of AllCard){
        card.classList.remove("active");
    }
    document.getElementById(`btn_lesson_${id}`).classList.add('active')

}

const ShowCard = (cardData) => {
    const len = cardData.length;
    const parent = document.getElementById('wordContainer');
    parent.innerHTML = "";
    if(len == 0){
        const divCard = document.createElement('div');
        divCard.innerHTML = `
        <div class=" text-center py-16 bg-[#F8F8F8]">
            <div class="flex justify-center" >
                <img src="./assets/alert-error.png"alt="">
            </div>
            <p class="bangla_font text-[0.8rem] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="bangla_font text-[2rem] text-[#292524] font-medium">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        divCard.classList.add('colspan')
        parent.appendChild(divCard);
    }
    else{
        for(let card of cardData){
            const divCard = document.createElement('div');
            divCard.innerHTML = `
            <div class="boxShadow bg-[#fff] p-14 text-center h-[100%] round">
                <h1 id="card${card.id}" class=" text-2xl font-bold inter word">${card.word}</h1>
                <p class="inter text-[1.2rem] font-medium p-6">Meaning /Pronunciation</p>
                <h1 class="bangla_font font-semibold text-3xl mb-14 text-[#18181B]">"${card.meaning} / ${card.pronunciation}"</h1>
                <div class="flex justify-between items-end">
                    <button id="detailsBtn" class="btn btn-soft btn-primary"  onclick="details(${card.id})"><i class="fa-solid fa-circle-info"></i></button>
                    <button id="SoundBtn${card.id}" onclick="clickSoundBtn(${card.id})" class="btn btn-soft btn-primary Sound"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
            `;
            divCard.classList.add('round')
            parent.appendChild(divCard);
        }
    }
    ManageSpinner(false);
}

 function clickSoundBtn(num){
    const text = document.getElementById(`card${num}`);
    let speech = new  SpeechSynthesisUtterance(text.innerText);
    speech.lang = "en-US"; // language
    speech.rate = 0.9;       // speed (0.1 - 10)
    speech.pitch = 1;      // pitch (0 - 2)
    window.speechSynthesis.speak(speech); 

}
function details(id){
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => showWordDetails(data.data));
}

function showWordDetails(details){
    document.getElementById('my_modal_1').showModal();
    const parent = document.getElementById('wordDetailContainer');
    parent.innerHTML = "";
    const div = document.createElement('div');
    div.innerHTML = `
        <h1 class=" text-4xl font-semibold mb-8">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.meaning})</h1>
        <p class=" font-semibold text-2xl">Meaning</p>
        <p class="bangla_font text-2xl font-medium mb-8">${details.meaning}</p>
        <h3 class="font-semibold text-2xl mb-2">Example</h3>
        <p class=" mb-8 text-2xl">${details.sentence}</p>

        <h4 class="bangla_font  text-2xl font-medium mb-2">সমার্থক শব্দ গুলো</h4>
        <div class="flex gap-2">
            ${synonyms(details.synonyms)}
        </div>
    `;
    parent.appendChild(div);
}


const ManageSpinner = (status) => {
    if(status == true){
        document.getElementById('spinnerContainer').classList.remove('hidden');
        document.getElementById('wordContainer').classList.add('hidden');
    }
    else{
        document.getElementById('wordContainer').classList.remove('hidden');
        document.getElementById('spinnerContainer').classList.add('hidden')
    }
}

const plusMinusContainer_1 = document.getElementById('plusMinusContainer_1');
plusMinusContainer_1.addEventListener('click', function(){
const Plus = document.getElementById('Plus_1');
const Minus = document.getElementById('Minus_1');
const ans = document.getElementById('ans_1');
    Minus.classList.toggle("hidden_data");
    Plus.classList.toggle("hidden_data");
    ans.classList.toggle("hidden_data");   
});
const plusMinusContainer_2= document.getElementById('plusMinusContainer_2');
plusMinusContainer_2.addEventListener('click', function(){
const Plus = document.getElementById('Plus_2');
const Minus = document.getElementById('Minus_2');
const ans = document.getElementById('ans_2');
    Minus.classList.toggle("hidden_data");
    Plus.classList.toggle("hidden_data");
    ans.classList.toggle("hidden_data");   
});
const plusMinusContainer_3 = document.getElementById('plusMinusContainer_3');
plusMinusContainer_3.addEventListener('click', function(){
const Plus = document.getElementById('Plus_3');
const Minus = document.getElementById('Minus_3');
const ans = document.getElementById('ans_3');
    Minus.classList.toggle("hidden_data");
    Plus.classList.toggle("hidden_data");
    ans.classList.toggle("hidden_data");   
});
const plusMinusContainer_4 = document.getElementById('plusMinusContainer_4');
plusMinusContainer_4.addEventListener('click', function(){
    const Plus = document.getElementById('Plus_4');
    const Minus = document.getElementById('Minus_4');
    const ans = document.getElementById('ans_4');
    Minus.classList.toggle("hidden_data");
    Plus.classList.toggle("hidden_data");
    ans.classList.toggle("hidden_data");   
});
const plusMinusContainer_5 = document.getElementById('plusMinusContainer_5');
plusMinusContainer_5.addEventListener('click', function(){
const Plus = document.getElementById('Plus_5');
const Minus = document.getElementById('Minus_5');
const ans = document.getElementById('ans_5');
    Minus.classList.toggle("hidden_data");
    Plus.classList.toggle("hidden_data");
    ans.classList.toggle("hidden_data");   
});