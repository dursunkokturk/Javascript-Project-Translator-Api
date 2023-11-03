const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");

for(let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        });
});

// Ceviri Ekraninda Ortada Yer Alan Degisim Oklarinin Ustune Tiklandiginda
exchange.addEventListener("click", () => {

    // Kelimenin Hangi Dil Alaninda Yazan Degeri Aliyoruz
    let text = fromText.value;

    // Secili Olan Diller Arasinda Degisim Yapiliyor
    fromText.value = toText.value;

    // Kelimenin Cevirilecegi Dil Alanina 
    // Kelimenin Yazildigi Alandaki Degeri Aktariyoruz
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
}); 

// Sayfada Class Atribute unda icon Degeri Yazan Elementleri Tarama Yapiyoruz
for(let icon of icons) {

    // Icon Elementlerine Tiklandiginda
    icon.addEventListener("click", (element) => {

        // Tiklanilan Element fa-copy Ise
        if(element.target.classList.contains("fa-copy")) {

            // Kopyalama Islemi Icin id Attribute unda from Yazan Elemente Tiklanmis Oluyor
           if(element.target.id == "from") {

                // Icon a Tiklama Isleminden Sonra
                // Cevirisi Yapilacak Alanda Yazili Olanlari Kopyaliyoruz
                navigator.clipboard.writeText(fromText.value);
            } else {

                // Icon a Tiklama Isleminden Sonra
                // Cevirisi Yapilan Alanda Yazili Olanlari Kopyaliyoruz
                navigator.clipboard.writeText(toText.value);
            }
        } else {

            // Tiklanilan Element Hoparlor Simgesi Ise
            let utterance;
            if(element.target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    });
}