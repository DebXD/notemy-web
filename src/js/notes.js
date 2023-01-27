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


// let token = localStorage.getItem("token");


const notesContainer = document.getElementById("note-container");

let page = 1;

async function getNotesList(accessToken,refreshToken, page){
    try {
        let notesList = [];
        while (page){
            let endpoint = `https://notemy-api.deta.dev/api/v1/notes/?page=${page}`;
            const response = await fetch(endpoint,{
                method: 'GET',
                headers: {"Authorization" : "Bearer " + accessToken}});
            if (response.status == 200){
                const data = await response.json();
                const arrayData = await data.data;
                //console.log(arrayData)

                for (let i=0; i<5; i++){
                    if (arrayData[i]!== undefined){
                        //console.log(arrayData[i])
                        notesList.push(arrayData[i]);
                    }
                }
                const meta = await data.meta;
                if (meta['has_next'] == false){
                    break;
                }
            
                page ++;
                }
            else{
            
                let result = await refreshAccessToken(refreshToken)
                if (result != true){
                    console.log('changed access token')
                    //window.location.href = './notes.html';
                    break;
                    }
                else{
                    window.location.href = './login.html'
                    break;
                }
                }
        }
        if (notesList.length !== 0){
            let htmlString = ''
            for (let i=notesList.length-1; i>=0; i--){
            //console.log(notesList.length)
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
    
        
        
    } catch (error) {
        let result = await refreshAccessToken(refreshToken)
            if (result == true){
                window.location.href = './notes.html'
            }
            else{
                window.location.href = './login.html'
            }
            
        
    }
    
        
            
        
    }
    
    

async function refreshAccessToken(refreshToken){
    let response = await fetch('https://notemy-api.deta.dev/api/v1/auth/token/refresh/',{
            method: "POST",
            headers: {
                "Authorization" : "Bearer " + refreshToken
            }})
        //console.log(response)
    if (response.status == 200){
        let data = await response.json();
        //console.log(data.values('access token'))
        let access_token = await data['access token']
        //console.log(access_token)
        //console.log(access_token)
        // refresh access token in cookie
        document.cookie = `access_token=${access_token}`;
        window.location.href = './notes.html'
        return true;
    }

}

async function run(){
    let accessToken  = await getToken('access_token');
    let refreshToken = await getToken('refresh_token');
    //console.log(accessToken)
    if (!accessToken){
        await Swal.fire(
            'Logged out',
            'Login again.',
            'error'
          );
        window.location.href = './login.html'
        //   try {
        //     if (!refreshAccessToken(refreshToken)){
        //         window.location.href = './login.html'
        //     }
            
        //   } catch (error) {
        //     console.log(error)
        //   }
        
    }
    else{
         
        await getNotesList(accessToken, refreshToken, page);
        
    
    
    }
}
run()




