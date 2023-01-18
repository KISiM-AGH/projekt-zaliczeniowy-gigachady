
function deleteWord(word: string){
    fetch('http://localhost:5000/words/delete', {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "word_text": word,
        })
    });


}
export default deleteWord