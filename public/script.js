// IIFE
// Immediately Invoked Function Expressions

(function () {

    function toJSONString( form ) {
        var data = {};
        var elements = form.querySelectorAll( "input, select, textarea");

        for( let i = 0; i < elements.length; i++){
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            // if(element.value == "twitter"){

            // }

            switch(value){
                case "Twitter":
                    value = "fa fa-twitter";
                    break;
                case "Github":
                    value = "fa fa-github";
                    break;
                case "Facebook":
                    value = "fa fa-facebook";
                    break;
            }

            if( name ) {
                data[name] = value;
            }
        }

        return JSON.stringify(data);
    }

    document.addEventListener("DOMContentLoaded", function(){
        var form = document.querySelector("form");
        var output = document.querySelector("#output");

        form.addEventListener("submit", function(e){
            e.preventDefault();
            console.log("stuff")

            var json = toJSONString(this);
            output.innerHTML = json;

        });
    });

})();