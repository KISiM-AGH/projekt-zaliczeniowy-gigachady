
function deleteWord(id: string){
    fetch('http://localhost:5000/records/delete', {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "_id": id,
        })
    });


}
export default deleteWord