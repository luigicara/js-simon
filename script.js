// dichiaro la variabile che contiene l'elemento button
const btnStart = document.querySelector(".startgame")

// aggiungo un evento al click del button
btnStart.addEventListener('click',
    function() {
        // faccio scomparire il bottone
        btnStart.classList.add("d-none");

        // creo un array di numeri casuali da 1 a 100
        const generatedNumbers = genRandomNumbers(5, 1, 100);

        // creo una variabile con un div specifico all'interno
        const numbers = document.querySelector(".numbers");

        // creo una variabile con un div specifico all'interno
        const counter = document.querySelector(".counter");

        const quote = document.querySelector(".quote");

        // imposto una variabile che sarà il punto di partenza del timer
        let seconds = 30;

        // svuoto il div dei numeri
        numbers.innerHTML = "";

        // stampo i 5 numeri generati casualmente nel div .numbers
        for (let i = 0; i < generatedNumbers.length; i++) {
            numbers.innerHTML += `${generatedNumbers[i]}; &nbsp;`;
        }

        // facio partire il timer
        let timer = setInterval(() => {
        counter.innerHTML = seconds;
        
        // quando il timer raggiunge lo 0:
        if (seconds === 0) {
            // Interrompo l'intervallo
            clearInterval(timer);

            // Svuoto il timer
            counter.innerHTML = "";

            // Faccio scomparire i numeri
            numbers.innerHTML = "";

            // Prendo gli elementi per poter inserire i numeri dall'HTML e li faccio apparire
            let inputNum = document.querySelector("input");

            let submitBtn = document.querySelector(".bet");

            inputNum.classList.remove("d-none");

            submitBtn.classList.remove("d-none");

            // Creo l'array in cui inserire i numeri ricordati dall'utente
            let insertedNumbers = [];

            // Aggiungo al click sul bottone la funzione che mi salverà il valore inserito
            submitBtn.addEventListener('click',
                function() {
                    insertedNumbers.push(parseInt(inputNum.value)); 

                    // inserisco una frase che faccia capire all'utente a che numero è
                    quote.innerHTML = `okay inserisci il ${insertedNumbers.length + 1}° numero`;

                    if (insertedNumbers.length === 5) { 
                        // faccio scomparire il riferimento del numero inserito
                        quote.innerHTML = "";

                        // faccio scomparire entrambi gli elementi (input e button)
                        inputNum.classList.add("d-none");
        
                        submitBtn.classList.add("d-none");

                        // imposto una variabile di punteggio 
                        let score = 0;

                        // imposto una variabile che darà il risultato all'utente
                        let output;

                        let wrongNumbers = "e hai sbagliato: ";
                        
                        // creo un array vuoto che conterrà i numeri indovinati
                        let correctNumbers = [];

                        // controllo se i numeri inseriti corrispondano a quelli del gioco
                        for (let n = 0; n < 5; n++) {
                            if (generatedNumbers.includes(insertedNumbers[n])) {
                                // prendo l'index del valore che corrisponde
                                const index = generatedNumbers.indexOf(insertedNumbers[n]);

                                // pusho il numero indovinato nell'array apposito
                                correctNumbers.push(generatedNumbers[index]);

                                // e lo elimino dall'array per far si che in caso di ripetizioni il numero non aumenti cmq il punteggio
                                const x = generatedNumbers.splice(index, 1);

                                // aumento il punteggio
                                score++;
                            }
                            
                            // Dopo l'ultimo controllo "calcolo" il risultato e il relativo output
                            
                            if (n === 4) {
                                switch (score) {
                                    case 0:
                                        output = `Sei a corto di memoria, hai indovinato ${score} numeri!`;
                                        break;

                                    case 1:
                                        output = `Pessimo, hai indovinato ${score} numero!`;
                                        break;
                                    case 2:
                                        output = `Puoi fare di meglio, hai indovinato ${score} numeri!`;
                                        break;
                                    case 3:
                                        output = `Non male, hai indovinato ${score} numeri!`;
                                        break;
                                    case 4:
                                        output = `C'eri quasi, hai indovinato ${score} numeri!`;
                                        break;
                                    case 5:
                                        output = `Complimenti, hai vinto! Hai indovinato tutti i numeri!`;

                                        wrongNumbers = "";
                                        break;
                                } 
                            }
                        }
                        

                        // Scrivo l'output
                        numbers.innerHTML = output + " I numeri sono: ";

                        for (let k = 0; k < correctNumbers.length; k++) {
                            numbers.innerHTML += `${correctNumbers[k]}; &nbsp;`;
                        }

                        numbers.innerHTML += wrongNumbers;

                        for (k = 0; k < generatedNumbers.length; k++) {
                            numbers.innerHTML += `${generatedNumbers[k]}; &nbsp;`;
                        }

                        // Rifaccio apparire il button per giocare
                        btnStart.innerHTML = "Rigioca";

                        btnStart.classList.remove("d-none");

                    }
        
                }
            )

        }

        seconds--;
        }, 1000);
    }
)

function randomInteger(min, max) {
    return ( Math.floor(Math.random() * ((max + 1) - min) + min));
}

function genRandomNumbers(quantity, minNum, maxNum) {

    const newArr = [];

    while (newArr.length < quantity) {
        let newNumber = randomInteger(minNum, maxNum);

        if(!newArr.includes(newNumber)) {
            newArr.push(newNumber);
        }
    }

    return newArr
}


