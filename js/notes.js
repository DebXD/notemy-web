let token = localStorage.getItem("token");
//console.log(token)
if (!token){
    window.location.href = './login.html'
    console.log("token is null")
}
else{
    // title = document.getElementById('title')
    // title.addEventListener('load', () => {

    const getNotes = (token) =>{
        fetch('https://notemy-api.deta.dev/api/v1/notes/',{
            method : "GET",
            headers : {
                "Authorization" : 'Bearer ' + token
            }
        })
        .then(res => {if (res.status ==200){
            return res.json();}
            else{
                console.log("Uauthorized")
                window.location.href = './login.html'
            }
            }
            )

        .then(data => { return data.data    })

        .then(items => { let NotesLength = items.length;

            for (let i=0; i< NotesLength; i++){
                console.log(items[i]['id']);
                console.log(items[i]['title']);
                console.log(items[i]['content']);
            }
        })
    }
    getNotes(token);

// })

}


