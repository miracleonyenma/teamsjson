// IIFE
// Immediately Invoked Function Expressions

(function () {

    // function toJSONString( form ) {
    //     var data = {};
    //     var elements = form.querySelectorAll( "input, textarea");

    //     for( let i = 0; i < elements.length; i++){
    //         var element = elements[i];
    //         var name = element.name;
    //         var value = element.value;

    //         // if(element.value == "twitter"){

    //         // }

    //         // switch(value){
    //         //     case "Twitter":
    //         //         value = "fa fa-twitter";
    //         //         break;
    //         //     case "Github":
    //         //         value = "fa fa-github";
    //         //         break;
    //         //     case "Facebook":
    //         //         value = "fa fa-facebook";
    //         //         break;
    //         // }

    //         console.log(data[name] = value);

    //         if( name ) {
    //             data[name] = value;
    //         }
    //     }

    //     return JSON.stringify(data);
    // }

    document.addEventListener("DOMContentLoaded", function(){
        var form = document.querySelector("form");
        var output = document.querySelector("#output");
        var imageFile = document.querySelector("#imageFile");
        var fakeBtn = document.querySelector("#fakeBtn");

        imageFile.addEventListener("change", function(e){
            var formData = new FormData();

            formData.append("imageFile", imageFile.files[0]);
            console.log(imageFile.files);

            if(imageFile.value){
                fakeBtn.querySelector("span").innerText = imageFile.files[0].name;
                console.log(imageFile.files[0]);
            }
            else{
                
            }

            fetch('http://localhost:3001/files', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json)
            .then(data => console.log(data))
            .catch(err => console.log(err))
            
        });

        fakeBtn.addEventListener("click", ()=>{
            imageFile.click();
        });


        form.addEventListener("submit", function(e){
            e.preventDefault();
            console.log("stuff");
            // var json = toJSONString(this);
            // output.innerHTML = json;

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
            for(let i = 0; i < icons.length; i++){
 
                switch(icons[i]){
                    case "Twitter":
                        icons[i] = "fa fa-twitter";
                        break;
                    case "Github":
                        icons[i] = "fa fa-github";
                        break;
                    case "Facebook":
                        icons[i] = "fa fa-facebook";
                        break;
                }


            }
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
            .then(response => response.json())
            .then(data => {
                console.log(data.path);
            })
            .catch(error => console.log(error))
        });

    });

})();



