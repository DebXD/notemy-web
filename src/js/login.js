
let token;

const fetchToken = async(loginCredentials) => {
    let response = await fetch("https://notemy-api.deta.dev/api/v1/auth/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginCredentials)
    })
    if (response.status == 200){
        let data =  await response.json();
        let accessToken = await data['user']['access token'];
        let refreshToken = await data['user']['refresh token'];
        // Set cookie
        document.cookie= `access_token=${accessToken}`;
        document.cookie = `refresh_token=${refreshToken}`;

        window.location.href = '/src/notes.html'
    };
};

// const getMe = async (accessToken) => {

//     let res = await fetch("https://notemy-api.deta.dev/api/v1/auth/me/",{
//         method : 'GET',
//         headers : {
//             "Authorization" : 'Bearer ' + accessToken})

//     if (res.status == 200){
//     Swal.fire(
//         'Good job!',
//         'You have logged in.',
//         'success'
//         );
//         document.cookie= `token=${accessToken}`;
//         window.location.href = './notes.html'
        
//     }
//     else{
//         console.log("Error getting userdata")
//     }

// }
        

const loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', () =>{
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPassword = document.getElementById('inputPassword').value;

    const loginCredentials = {
        email: inputEmail,
        password: inputPassword
    };
    console.log(loginCredentials)

    fetchToken(loginCredentials)
    

})


