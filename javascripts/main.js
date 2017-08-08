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


// calling our factory...promise style
let colorPromise = Legos.loadLegos()
    .then(
        (resolve)=>{
            let newItem = {LegoName: "Brenda's Pick", ColorHex: "a3a3d1", YearFrom: "2009", YearTo: "Present"};
            resolve.push(newItem);
            showItems(resolve);
        },
        (reject)=>{
            console.log("Oops", reject);
        })

