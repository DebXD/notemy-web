const searchInput = document.getElementById('search')
let filteredNotes = []
const notesContainer = document.getElementById("note-container");

searchInput.addEventListener("keyup", async(event)=>{
    //console.log(event.target.value)
    let searchString = await event.target.value.toLowerCase();
    if( searchString.length > 0){
        await filterNotes(searchString);
        
        if (filteredNotes.length !== 0){
            //console.log(filteredNotes)
            displayNotes(filteredNotes)
            }
        else{
            notesContainer.innerHTML = "<h1>No maching notes available..<h1>"
        }
    }
    else{
        getNotesList();
        

    }
})

async function filterNotes(searchString){
    let accessToken  = await getToken('access_token');
    let response = await fetch(`https://notemy-api.deta.dev/api/v1/notes/search/?query=${searchString}`,{
        method: 'GET',
        headers: {"Authorization" : "Bearer " + accessToken}});
    if (response.status == 200){
        let data = await response.json()
        let itemsArray = await data.data
        filteredNotes = itemsArray
        
    }
}



// GET token
const cookieItems = document.cookie.split(';')
const getToken = async(cookieItemName) => {
    for (let i=0; i<cookieItems.length; i++){
            let item = await cookieItems[i]
        if (item.includes(cookieItemName)){
            let tokenArray = await item.split('=');
            if (tokenArray[1] != undefined){
                return tokenArray[1];
            }
        }
    }
}

function displayNotes(filteredNotes){
    let htmlString = '';
    for(let i=0; i<filteredNotes.length; i++ ){
        htmlString += `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${filteredNotes[i]['title']}</h5>
                            <p class="card-text">${filteredNotes[i]['content']}</p> 
                        </div>
                    </div>
                </div>
              `
            }
        notesContainer.innerHTML = htmlString;

}


async function getNotesList(){
        let notesList = [];
        let page = 1;
        let accessToken  = await getToken('access_token');
        while (page){
            let endpoint = `https://notemy-api.deta.dev/api/v1/notes/?page=${page}`;
            const response = await fetch(endpoint,{
                method: 'GET',
                headers: {"Authorization" : "Bearer " + accessToken}});
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

            }
                }

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
        
    
        