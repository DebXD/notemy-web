
let loginBtn = document.getElementById('loginbutton');


let getToken = (loginCredentials) => {    
    fetch("https://notemy-api.deta.dev/api/v1/auth/login/", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(loginCredentials)
    })
    .then(res => {if (res.status == 200){
        console.log('Success')
        //console.log(res)
    
    }else{
        console.log('error')
    }
        return res.json()
    })
    .then(data => { return data['user']} )
        
    .then(tokens => {
        //console.log(token);
        let authorization_token = tokens['access token'];
        let refreshToken = tokens['refresh token']
        //document.getElementById('tokenfield').innerText=authorization_token;
        return authorization_token, refreshToken;
        })
}




const isTokenValid = (accessToken) => {
    fetch("https://notemy-api.deta.dev/api/v1/auth/me/",{
            method : 'GET',
            headers : {
                "Authorization" : 'Bearer ' + accessToken
                        }
                    })
            .then(res => {
                if (res.status != 200){
                    return true
                
            }}
            )} 
const refreshAccessToken = (refreshToken) => {
    fetch("https://notemy-api.deta.dev/api/v1/auth/token/refresh/",{
                        method : 'POSt',
                        headers : {
                        "Authorization" : 'Bearer ' + refreshToken
                        }
                    })
    .then(res => {
        if (res.status == 200){
            console.log('Access Token Regenerated')

        }
        else{
            console.log('Error!')
        }
        return res.json()
        
    })
    .then( data => {
        return data['access token']
    })
    .then(token => {
        authorization_token =  token;
        return authorization_token
    })

}

const getNotes = (accessToken, refreshToken, refreshAccessToken) => {
    if (isTokenValid() == false){
            console.log('token is not valid')
            refreshAccessToken(refreshToken);
            }
    
    fetch("https://notemy-api.deta.dev/api/v1/notes/",{
        method : 'GET',
        headers : {
            "Authorization" : 'Bearer ' + accessToken
                    }
                })
        .then(res => {
            if (res.status == 200){
            console.log('getting notes json data')
            }
            return res.json();
        } )
        .then( data => {return data.data})
        
        .then( items => {
            for (item of items){
                console.log(item['title'])
                console.log(item['content'])
                //document.getElementById('title').innerText=item['title'];
                //document.getElementById('content').innerText=item['content']
                
            // notes = `
            // <div id="title">${item['title']}</div>
            // <div id="content">${item['content']}</div>`
            // document.getElementById('container').innerHTML = notes 
        } 
        })
        

        }

loginBtn.addEventListener('click', () => {
    console.log('button clicked')


    let user_email = document.getElementById("email-input").value;
    console.log(user_email)
    let user_password = document.getElementById('password-input').value;
    console.log(user_password)
    
    
    let loginCredentials = {
        email : 'demo@email.com',
        password : 'Demo@1234'
    };
    
    let accessToken, refreshToken = getToken(loginCredentials);
    if (accessToken, refreshToken == undefined){
        setTimeout(getNotes, 5000);
        console.log(accessToken, refreshToken);
        getNotes(accessToken, refreshToken, refreshAccessToken)
        
    }
    ;   
    })
   // }
    

//})

//     })
            //  .then((data) => {
            // for (item of data.data){
            // //console.log(data['title'])
            // //console.log(data['content'])
            // //document.getElementById('title').innerText=item['title'];
            // //document.getElementById('content').innerText=item['content']
            
            // notes = `
            // <div id="title">${item['title']}</div>
            // <div id="content">${item['content']}</div>`
            // document.getElementById('container').innerHTML = notes
//         }})

//     }
// }
// })