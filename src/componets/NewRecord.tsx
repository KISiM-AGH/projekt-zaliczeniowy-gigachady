
function NewRecord(word: string, time: number, incorrect_letters: number){
    fetch('http://localhost:5000/records/add', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "word_text": word,
            "time": time,
            "incorrect_letters_1": incorrect_letters
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });
}

export default NewRecord