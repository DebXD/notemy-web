
let token;

const fetchToken = (loginCredentials, getNotes) => {
    return fetch("https://notemy-api.deta.dev/api/v1/auth/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginCredentials)
    })
    .then(response =>   response.json())
    .then(data => {
        token = data['user']['access token'];
        //console.log(token)
        getMe(token);
    });
};


function sleep(ms){
        return new Promise( resolver => setTimeout(resolver, ms));
    };

const getMe = async (accessToken) => {

    await fetch("https://notemy-api.deta.dev/api/v1/auth/me/",{
        method : 'GET',
        headers : {
            "Authorization" : 'Bearer ' + accessToken
                    }
        })
        .then(res => {
            if (res.status == 200){
            //console.log('getting notes json data')
            Swal.fire(
                'Good job!',
                'You have logged in.',
                'success'
              );
                
            }
            else{
                console.log("Error getting userdata")
            }
            
            return res.json();

        })  
        
        .then( data => {
            //console.log(data);
            return data.data;
        })
        
        .then( items => {
            //console.log(items)
            // Set cookie
            document.cookie= `token=${accessToken}`;
            // set localstorage
            //localStorage.setItem("token", accessToken);
            //console.log(localStorage.getItem("token"));

            window.location.href = './notes.html'
            
            
            
        })
        

}

const loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', () =>{
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPassword = document.getElementById('inputPassword').value;

    const loginCredentials = {
        email: inputEmail,
        password: inputPassword
    };
    console.log(loginCredentials)

    fetchToken(loginCredentials, getMe)
    

})


