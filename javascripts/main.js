"use strict";
console.log("main.js", );


// create a  most basic promise 
// that waits 3 seconds and logs "World"
// let greetingPromise = ()=>{
//     new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve("World");
//         }, 3000);
//     })
//     .then((resolve)=>{
//         console.log("resolve: ", resolve);
//     });
// }

// greetingPromise();
// console.log("Hello");

let showItems = (legosData)=>{
    let legoDisplay = document.getElementById("lego-display");
    legosData.forEach((lego)=>{
        let legoBlock = buildLego(lego);
        legoDisplay.innerHTML += legoBlock;
    });
}

let buildLego = (lego) => {
    //building a string to create the visual display

    //each seperated by comma
    let block = "",
        wrapper = `<section class="block-wrapper" style="border: 2px solid #000000; background-color:#${lego.ColorHex}">`,
        title = `<h3>Name: ${lego.LegoName}</h3>`,
        years = `<div class="block-years">Manufactured ${lego.YearFrom} - ${lego.YearTo}</div>`;
        // image = `<div class="card-img" style="background-image: url('images/${car.image}')"></div>`,
        let link = lego.ColorstreamLinkImage;
        if (link){
             block += `<a href="${link}">${wrapper + title + years}</section></a>`;
        }else{
            block += `${wrapper + title + years}</section>`;
        }
      return block;
}



// version 1: calling our factory and doing one thing
// let colorPromise = Legos.loadLegos()
//     .then(
//         (resolve)=>{
//             let newItem = {LegoName: "Brenda's Pick", ColorHex: "a3a3d1", YearFrom: "2009", YearTo: "Present"};
//             resolve.push(newItem);
//             showItems(resolve);
//         },
//         (reject)=>{
//             console.log("Oops", reject);
//         })


// version 2: chaining 'then'
let colorPromise = Legos.loadLegos()
    .then((resolve) => {
        //just creating a new item to show demonstrate that you can
        let newItem = {LegoName: "Brenda's Pick", ColorHex: "a3a3d1", YearFrom: "2009", YearTo: "Present"};
        resolve.push(newItem);
        //returning the resolve here
        //makes it available "down the line"
        return resolve;
    },
    (reject) => {
        console.log("OOPs:", reject);
    })
    //we're stringing this along with 
    //the resolve returned on line 67
    .then(
        (resolve) => {
            showItems(resolve);
        },
        //setting up a default here to catch anything else
        () => {
            console.log("there was an error somewhere");
        }
        )

// promise.all....
// setting up a few promises
// with some slightly different syntax (thanks MDN)
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 1000, 'foo');
});

// '.all' will take a series of promises
// wait until they are resolved and return them only
// when they are all resolved
// Promise.all(p3, p1, p2)
//     .then(
//         (resolve)=> console.log("resolve values:", resolve));


// Promise.race is a great way to get
// them back in the order they return (resolve)
var p11 = new Promise((resolve, reject)=>{
    setTimeout(resolve, 1000, "one");
});

var p22 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 2000, "two");
})

var p33 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 3000, "three");
})

var p44 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 400, "four");
})

var p55 = new Promise((resolve,reject)=>{
    setTimeout(resolve, 1000, "five");
    // reject("i don't like peas.");
})

// again, like Promise.all, Promise.race is all or nothing
// if one of them rejects, the whole thing rejects
// see line 122
Promise.race([p11,p22,p33,p44,p55])
    .then(
        (winner)=>{
            console.log("winner: ", winner);
        },
        (reject)=>{
            console.log("reject:", reject);
        });





