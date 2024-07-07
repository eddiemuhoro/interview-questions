// console.log("A")
// setTimeout(() => {
//     console.log("B")
// }, 1000)

// clearTimeout()
// console.log("C");

//Immediately Invoked Function Expression
function timeOut(){

    for(var a= 0 ; a < 3 ; a++){
       (function(a){
          {
                setTimeout(()=> {
                    console.log(a);
                }, 1000)
            }
        })(a)
    }
}

timeOut()