let saveBtn = document.getElementById('save-note-btn');



saveBtn.addEventListener("click", async() => {
    console.log("clicked saved")
    let inputTitle = await document.getElementById('input-title').value;
    let inputContent = await document.getElementById('input-content').value;

    if (inputTitle !== '' && inputContent !== ''){
        let note = {
            title : inputTitle,
            content : inputContent
        }
        //note = JSON.stringify(note)
        console.log(note)
        await saveNote(note)
    }
    

})

const saveNote = async(note) =>{
    let accessToken = await getToken('access_token');
    let response = await fetch("https://notemy-api.deta.dev/api/v1/notes/",{
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify(note)
    })
    if (response.status == 201){
        //console.log(response)
        await Swal.fire(
            'Saved',
            'Your Note is saved',
            'success'
          );
        window.location.href = './notes.html'
        //location.reload()
    }
    else{
        await Swal.fire(
            'Failure',
            'Something goes wrong!',
            'error'
          );
    }

}


// Get token from cookie items
const cookieItems = document.cookie.split(';')
const getToken = async(cookieItemName) => {
    for (let i=0; i<cookieItems.length; i++){
            let item = cookieItems[i]
        if (item.includes(cookieItemName)){
            let tokenArray = item.split('=');
            if (tokenArray[1] != undefined){
                return tokenArray[1];
            }
        }
    }
}