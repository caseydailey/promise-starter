"use strict";
console.log("lego-factory.js", );

// now let's build a little 'factory'
// to get some data using a promise to 
// manage xhr

var Legos = (function(legos){

    let legoItems = [];

    let parseData = (data)=>{
        data.LegoColorss.forEach((color)=>{
            legoItems.push(color);
        });
        return legoItems
    }

    legos.loadLegos = () => {
        return new Promise((resolve, reject)=>{
            let request = new XMLHttpRequest();
            request.onload = ()=>{
                if(request.status === 200){
                    let data = JSON.parse(request.responseText);
                    console.log("data:", data);
                    resolve(parseData(data));
                } else {
                    reject(new Error("XMLHttpRequest error", reject));
                }
            };
            request.open('GET', '../lego-colors.json');
            request.send();
        })
    }



    return legos;

})(Legos || {});