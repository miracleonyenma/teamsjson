// IIFE
// Immediately Invoked Function Expressions

/*
    function toJSONString( form ) {
        var data = {};
        var elements = form.querySelectorAll( "input, textarea");

        for( let i = 0; i < elements.length; i++){
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            // if(element.value == "twitter"){

            // }

            // switch(value){
            //     case "Twitter":
            //         value = "fa fa-twitter";
            //         break;
            //     case "Github":
            //         value = "fa fa-github";
            //         break;
            //     case "Facebook":
            //         value = "fa fa-facebook";
            //         break;
            // }

            console.log(data[name] = value);

            if( name ) {
                data[name] = value;
            }
        }

        return JSON.stringify(data);
    }
*/
    var usersData = {},
        renderedUserbtns = {},
        filePath;



    document.addEventListener("DOMContentLoaded", function(){
        var form = document.querySelector("form"),
            output = document.querySelector("#output"),
            imageFile = document.querySelector("#imageFile"),
            fakeBtn = document.querySelector("#fakeBtn"),
            usersCont = document.querySelector("#users ul"),
            refreshBtn = document.querySelector("#refresh"),
            submitAction = {status : "CREATE", id : ""};
        ;

        const memberBtnFunc = (users)=>{
            for(let i = 0; i < renderedUserbtns.length; i++){
                renderedUserbtns[i].addEventListener("click", function(e){
                    const id = e.target.getAttribute("data-id");
                    console.log(id);

                    form.querySelector("#name").value = users[id].name;
                    form.querySelector("#role").value = users[id].role;
                    form.querySelector("#company").value = users[id].company;
                    form.querySelector("#bio").value = users[id].bio;
                    form.querySelector("#social1").value = users[id].social[0];
                    form.querySelector("#social2").value = users[id].social[1];
                    form.querySelector("#icons1").value = users[id].icons[0];
                    form.querySelector("#icons2").value = users[id].icons[1];
                    
                    submitAction = {status: "UPDATE", id : id};
                });
            }    
        }

        const updateUser = (e, formFiles, formData, id)=>{
            e.preventDefault();
            fetch(`https://teamjson.herokuapp.com/files/${id}`, {
                method: 'PUT',
                body: formFiles
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.path);
                getPath(data.path);
                return data.path
            })
            .catch(err => console.log(err))


            fetch(`https://teamjson.herokuapp.com/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name : formData.name,
                    role : formData.role,
                    company : formData.company,
                    bio : formData.bio,
                    img : imageFile.files[0].name,
                    social : formData.social,
                    icons: formData.icons
                })
            })
            .then(res => {
                res.ok ? console.log("SUCCESS") : console.log("ERROR");
                return res.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error))

        }


        //get the users
        const getMembers = ()=>{
            fetch('https://teamjson.herokuapp.com/users')
            .then( res => res.json() )
            .then( data => usersData = data.members)
            .catch( err => console.log(err));

            console.log(usersData.length);

            //set attribute helper function
            const setAttributes = (el, attrs)=>{
                for(k in attrs){
                    el.setAttribute(k, attrs[k]);
                }
            }

            if(usersData.length !== undefined && document.querySelectorAll("#users ul li").length !== usersData.length){
                for(let i = 0; i < usersData.length; i++){

                    var userSect = document.createElement("li");
                    var userBtn = document.createElement("button");
                    userBtn.innerText = usersData[i].name;

                    usersCont.appendChild(userSect);
                    userSect.appendChild(userBtn);
                
                    setAttributes(userBtn, {"data-id" : i});
                    
                }
                renderedUserbtns = usersCont.querySelectorAll("li button");
                memberBtnFunc(usersData);
                console.log(renderedUserbtns)
            }
        };

        const createUser = (e, formFiles, formData)=>{
            e.preventDefault();
            console.log("stuff");
            
            fetch('https://teamjson.herokuapp.com/files', {
                method: 'POST',
                body: formFiles
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.path);
                getPath(data.path);
                return data.path
            })
            .catch(err => console.log(err))

            const getPath = (path)=>{

                filePath = path;       
                console.log(filePath);

                fetch('https://teamjson.herokuapp.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        name : formData.name,
                        role : formData.role,
                        company : formData.company,
                        bio : formData.bio,
                        img : filePath,
                        social : formData.social,
                        icons: formData.icons
                    })
                })
                .then(res => {
                    res.ok ? console.log("SUCCESS") : console.log("ERROR");
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))    

            }
    
        };


        imageFile.addEventListener("change", function(e){
            fakeBtn.querySelector("span").innerText = imageFile.files[0].name;
            console.log(imageFile.files[0]);
        });

        fakeBtn.addEventListener("click", ()=>{
            imageFile.click();
        });


        form.addEventListener("submit", function(e){
            //files
            var formFiles = new FormData();
            formFiles.append("imageFile", imageFile.files[0]);
            // console.log(imageFile.files);

            var formData = {
                name : form.querySelector("#name").value,
                role : form.querySelector("#role").value,
                company : form.querySelector("#company").value,
                bio : form.querySelector("#bio").value,
                social : [
                    form.querySelector("#social1").value,
                    form.querySelector("#social2").value
                ],
                icons : [
                    form.querySelector("#icons1").value,
                    form.querySelector("#icons2").value
                ]
            }
            console.log(submitAction);
            if(submitAction.status == "CREATE"){
                createUser(e, formFiles, formData);
            }else if(submitAction.status == "UPDATE"){
                updateUser(e, formFiles, formData, submitAction.id);
            }else{
                deleteUser(e);
            }
            // switch (submitAction.status) {
            //     case "CREATE" :
            //         createUser(e, formFiles, formData);
            //     case "UPDATE" :
            //         updateUser(e, formFiles, formData, submitAction.id);
            //     case "DELETE" :
            //         deleteUser(e);
            // }
        });

        refreshBtn.addEventListener('click', getMembers);
    });





