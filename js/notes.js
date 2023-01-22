// let token = localStorage.getItem("token");
//  Get token from cookie items
const cookieItems = document.cookie.split(';')
const getToken = () => {
    for (let i=0; i<cookieItems.length; i++){
            let item = cookieItems[i]
        if (item.includes('token')){
            let tokenArray = item.split('=');
            if (tokenArray[1] != undefined){
                return tokenArray[1];
            }
        }
    }
}
const token  = getToken();
console.log(token)

const notesContainer = document.getElementById("note-container")

let page = 1;

async function getNotesList(token, page){
    let notesList = [];
    while (page){
        let endpoint = `https://notemy-api.deta.dev/api/v1/notes/?page=${page}`;
        const response = await fetch(endpoint,{
            method: 'GET',
            headers: {"Authorization" : "Bearer " + token}});
        if (response.status == 200){
            const data = await response.json();
            const arrayData = data.data;

            for (let i=0; i<5; i++){
                if (arrayData[i]!== undefined){
                notesList.push(arrayData[i]);
                }
            }
            const meta = data.meta;
            if (meta['has_next'] == false){
                break;
            }
            
            page ++;
        }
        else{
            window.location.href = './login.html'
        }
    }
    
    //console.log(notesList)

    if (notesList.length !== 0){
        let htmlString = ''
        for (let i=0; i<notesList.length; i++){

           //console.log(notesList[i]['title'])
           htmlString += `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${notesList[i]['title']}</h5>
                            <p class="card-text">${notesList[i]['content']}</p> 
                        </div>
                    </div>
                </div>
              `
            }
        notesContainer.innerHTML = htmlString

        }
}


if (!token){
    Swal.fire(
        'Logged out',
        'Login again.',
        'error'
      );
    window.location.href = './login.html'
    console.log("token is null")
}
else{
     
    getNotesList(token, page);


}


