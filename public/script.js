
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
        renderedDeleteBtns = {},
        renderedUserbtns = {},
        filePath;

    const usersUrl = "http://localhost:3001/users",
        filesUrl = "http://localhost:3001/files",
        downloadUrl = "http://localhost:3001/download"
        ;

        //https://teamjson.herokuapp.com
        //http://localhost:3001

    document.addEventListener("DOMContentLoaded", function(){
        var form = document.querySelector("form"),
            // submitBtn = document.querySelector("#submit"),
            output = document.querySelector("#output"),
            imageFile = document.querySelector("#imageFile"),
            fakeBtn = document.querySelector("#fakeBtn"),
            submitCont = document.querySelector("#submit-cont"),
            usersCont = document.querySelector("#users ul"),
            downloadCont = document.querySelector("#download-disp ul"),
            refreshBtn = document.querySelector("#refresh"),
            downloadBtn = document.querySelector("#download"),
            submitAction = {status : "CREATE", id : ""},
            resetBtn = document.querySelector("#reset"),
            submitBtn = document.querySelector("#submit"),
            alertsCont = document.querySelector("#alerts-cont ul")
        ;
        

        //set attribute helper function
        const setAttributes = (el, attrs)=>{
            for(k in attrs){
                el.setAttribute(k, attrs[k]);
            }
        }

        //error handler
        const handleErr = (err, status) => {
            console.error(err);
            const alert = document.createElement("li");
            if(status <= 200) alert.classList.add("info");
            const alertText = document.createElement("p");
            const alertBtn = document.createElement("button");
            alertText.textContent = err;
            alertBtn.innerHTML = "&#x2715";
            alert.appendChild(alertText);
            alert.appendChild(alertBtn);
            alertsCont.appendChild(alert);
            setTimeout(()=>{
                alert.style.transform = "translateY(0) scale(1)";
            }, 100);



            alertBtn.addEventListener("click", ()=>{
                alert.style.transform = "translate(100%) scale(0)";
                // setTimeout(()=>{
                //     alert.style.display = "none";
                // }, 100);    
                alert.ontransitionend = ()=>{
                    alert.style.display = "none"; 
                }
            })
        } 

        //set the download link

        setAttributes(downloadBtn.parentElement, {href : downloadUrl});


        const memberBtnFunc = (users, membersPresent)=>{
            var deleteBtn = document.querySelector("#delete");

            if(membersPresent){
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
                        console.log(submitBtn.value);        
                        submitBtn.value = (`${submitAction.status} User`).toLowerCase();

                    });
                    renderedDeleteBtns.forEach(item => {
                        item.addEventListener("click", function(e){
                            const id = e.target.getAttribute("data-id");
                            console.log(e.target);
                            
                            submitAction = {status: "DELETE", id : id};
                            submitBtn.value = (`${submitAction.status} User`).toLowerCase();
                            console.log(submitAction);
                        });
                    });

                    console.log(submitBtn.value);
                    submitBtn.value = (`${submitAction.status} User`).toLowerCase();
    
                }    
            }
        }

        //get the users
        const getMembers = (url, element, membersPresent)=>{
            fetch(url)
            .then( res => {
                return res.json()
            })
            .then( data => {
                console.log(membersPresent, data);
                membersPresent ? usersData = data.members : usersData = data
                populateElement();
                return usersData
            })
            .catch( err => handleErr(err));

            console.log(usersData, usersData.length, element.children);

            const populateElement = () => {
                if(usersData.length !== undefined){

                    while(element.firstElementChild){
                        element.removeChild(element.firstElementChild);
                    }
                    for(let i = 0; i < usersData.length; i++){
    
                        var userSect = document.createElement("li");
                        var userLink = document.createElement("a");
                        var userBtn = document.createElement("button");
                        var deleteBtn = document.createElement("button");
                        var deleteBtnSpan = document.createElement("span");
                        deleteBtnSpan.innerHTML = "&#x2715";
                        deleteBtn.appendChild(deleteBtnSpan);
        
                        membersPresent ? userBtn.innerText = usersData[i].name : userBtn.innerText = usersData[i]
                        
                        element.appendChild(userSect);
                        userSect.appendChild(userLink);
                        userLink.appendChild(userBtn);
                        if(membersPresent) {
                            userSect.appendChild(deleteBtn);
                            setAttributes(deleteBtn, {"class" : "delete" , "data-id" : i});
                        }
                        membersPresent ? setAttributes(userLink, {"data-id" : i}) : setAttributes(userLink, {"href" : `${downloadUrl}/${usersData[i]}`})
                        setAttributes(userBtn, {"data-id" : i});
                    }
                    renderedUserbtns = element.querySelectorAll("li a button");
                    renderedDeleteBtns = element.querySelectorAll("li button.delete");
                    memberBtnFunc(usersData, membersPresent);
                    console.log(renderedUserbtns)
                }
    
            }

        };

        const createUser = (e, formFiles, formData)=>{
            e.preventDefault();
            console.log("stuff");
            console.log(formFiles);
            fetch(filesUrl, {
                method: 'POST',
                body: formFiles
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                (data.status == "success") ? handleErr(`${data.status} : ${data.message}`, 200) : handleErr(`${data.status} : ${data.message}`);

                console.log(data.path);
                getPath(data.path);
                return data.path
            })
            .catch(err => handleErr(err))

            const getPath = (path)=>{

                filePath = path;       
                console.log(filePath);

                fetch(usersUrl, {
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
                    // res.ok ? handleErr("SUCCESS", 200) : handleErr("ERROR");
                    
                    console.log(res)
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))    

            }
    
        };
        

        const updateUser = (e, formFiles, formData, id)=>{
            e.preventDefault();            
            fetch(`${filesUrl}/${id}`, {
                method: 'PUT',
                body: formFiles
            })
            .then(res => {
                // res.ok ? handleErr("SUCCESS", 200) : handleErr("ERROR");
                return res.json()
            })
            .then(data => {
                (data.status == "success") ? handleErr(`${data.status} : ${data.message}`, 200) : handleErr(`${data.status} : ${data.message}`);
                console.log(data);
                getPath(data.path);
                return data.path
            })
            .catch(err => handleErr(err))

            const getPath = (path)=>{

                filePath = path;       
                console.log(filePath);

                fetch(`${usersUrl}/${id}`, {
                    method: 'PUT',
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
                    // res.ok ? console.log("SUCCESS") : console.log("ERROR");
                    // res.ok ? handleErr("SUCCESS", 200) : handleErr("ERROR");

                    return res.json();
                })
                .then(data => {
                    (data.status == "success") ? handleErr(`${data.status} : ${data.message}`, 200) : handleErr(`${data.status} : ${data.message}`);
                    console.log(data);
                })
                .catch(err =>handleErr(err));
            }
        }

        const deleteUser = (e, formFiles, formData, id) => {
            e.preventDefault();  
            console.log("deleting");

            fetch(`${usersUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                }
                // body: JSON.stringify({
                //     name : formData.name,
                //     role : formData.role,
                //     company : formData.company,
                //     bio : formData.bio,
                //     img : filePath,
                //     social : formData.social,
                //     icons: formData.icons
                // })
            })
            .then(res => {
                res.ok ? console.log("SUCCESS") : console.log("ERROR");
                return res.json();
            })
            .then(data => {
                // console.log(data);
                (data.status == "success") ? handleErr(`${data.status} : ${data.message}`, 200) : handleErr(`${data.status} : ${data.message}`);
                deleteFile(id);
            })
            .catch(err =>handleErr(err));
            
            const deleteFile = (id)=>{
                console.log("runnu")
                fetch(`${filesUrl}/${id}`, {
                    method: 'DELETE',
                })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data);
                    // getPath(data.path);
                    // return data.path
                })
                .catch(err => handleErr(err))

            }

        }

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
            }else if(submitAction.status == "DELETE"){
                deleteUser(e, formFiles, formData, submitAction.id);
                alert("deleting")
            }
        });
        refreshBtn.addEventListener('click', ()=> getMembers(usersUrl, usersCont, true));
        downloadBtn.addEventListener('click', ()=> getMembers(downloadUrl, downloadCont, false));
        resetBtn.addEventListener('click', ()=>{
            submitAction = {status : "CREATE", id : ""};
            submitBtn.value = (`${submitAction.status} User`).toLowerCase();
        })
    });





