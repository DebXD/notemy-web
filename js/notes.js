let token = localStorage.getItem("token");

const notesList = document.getElementById("note-container")

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
    // title = document.getElementById('title')
    // title.addEventListener('load', () => {

    const getNotes = (token) =>{
        fetch('https://notemy-api.deta.dev/api/v1/notes/?page=1',{
            method : "GET",
            headers : {
                "Authorization" : 'Bearer ' + token
            }
        })
        .then(res => {if (res.status ==200){
            return res.json();}
            else{
                
                window.location.href = './login.html'
            }
            }
            )

        .then(data => { return data.data  })

        .then(items => { let NotesLength = items.length;
            let htmlString = ''
            for (let i=0; i< NotesLength; i++){
                htmlString += `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${items[i]['title']}</h5>
                            <p class="card-text">${items[i]['content']}</p> 
                        </div>
                    </div>
                </div>
              `
            }
            notesList.innerHTML = htmlString;
        })
    }
    getNotes(token);

// })

}


