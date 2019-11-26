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
        renderedUserbtns = {};



    document.addEventListener("DOMContentLoaded", function(){
        var form = document.querySelector("form"),
            output = document.querySelector("#output"),
            imageFile = document.querySelector("#imageFile"),
            fakeBtn = document.querySelector("#fakeBtn"),
            usersCont = document.querySelector("#users ul"),
            refreshBtn = document.querySelector("#refresh");

        //get the users
        const getMembers = ()=>{
            fetch('http://localhost:3001/users')
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


        imageFile.addEventListener("change", function(e){
            if(imageFile.value){
                fakeBtn.querySelector("span").innerText = imageFile.files[0].name;
                console.log(imageFile.files[0]);
            }
            else{
                
            }

        });

        fakeBtn.addEventListener("click", ()=>{
            imageFile.click();
        });


        form.addEventListener("submit", function(e){
            e.preventDefault();
            console.log("stuff");
            // var json = toJSONString(this);
            // output.innerHTML = json;

            //files
            var formData = new FormData();
            var filePath = "";

            formData.append("imageFile", imageFile.files[0]);
            console.log(imageFile.files);


            fetch('http://localhost:3001/files', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                filePath = data.path;
            })
            .catch(err => console.log(err))
            console.log(filePath);


            var name = form.querySelector("#name").value;
            var role = form.querySelector("#role").value;
            var company = form.querySelector("#company").value;
            var bio = form.querySelector("#bio").value;
            var social = [
                form.querySelector("#social1").value,
                form.querySelector("#social2").value
            ];
            var icons = [
                form.querySelector("#icons1").value,
                form.querySelector("#icons2").value
            ];

            console.log(icons);

            fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name : name,
                    role : role,
                    company : company,
                    bio : bio,
                    img : imageFile.files[0].name,
                    social : [
                        social[0],
                        social[1]
                    ],
                    icons: [
                        icons[0],
                        icons[1]
                    ]
                })
            })
            .then(response => {
                if(response.ok){
                    console.log("SUCCESS")
                    // redirect();
                }
                else{
                    console.log("ERROR")     
                }
                response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error))
        });


        refreshBtn.addEventListener('click', getMembers);

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
                    
                });
            }    
        }
    });





