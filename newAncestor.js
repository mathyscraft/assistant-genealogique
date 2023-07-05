// eel.get_data()(function(data) {
//   let jsonData = JSON.parse(data);

//   let dataURL = window.location.search.substring(1);
//   let dataURLArray = dataURL.split("&");
//   let ancestorData = {};

//   for (let i = 0; i < dataURLArray.length; i++) {
//     let splitedData = dataURLArray[i].split("=");
//     ancestorData[splitedData[0]] = splitedData[1];
//   }

//   console.log(ancestorData);
//   jsonData[jsonData.length] = ancestorData
//   console.log(jsonData);
//   eel.update_data(data)
// });

// localStorage.removeItem('data')
let data = [];

if (localStorage.getItem("data")) {
  data = localStorage.getItem("data")
  data = JSON.parse(data);
}

function newAncestor() {
  let dataURL = window.location.search.substring(1);
  dataURL = decodeURIComponent(dataURL)
  console.log(dataURL)
  let dataURLArray = dataURL.split("&");
  
  if (dataURLArray.length >= 2) {
    let ancestorData = {};
    
    for (let i = 0; i < dataURLArray.length; i++) {
      let [key, value] = dataURLArray[i].split("=");
      ancestorData[key] = value;
    }
    
    if (localStorage.getItem("edit-mode") === "true") {
      let ancestorPos = localStorage.getItem("ancestor-pos");
      data[ancestorPos] = ancestorData;
    } else {
      data.push(ancestorData);
    }
    
    localStorage.setItem("data", JSON.stringify(data));
    
    alert("Ajout réalisé avec succès, pensez à exporter !");
    let back = document.getElementById("back");
    back.click();
  }
}

newAncestor()

function editAncestor() {
  let ancestorPos = localStorage.getItem("ancestor-pos");
  let ancestorData = data[ancestorPos];
  let ancestorKeys = Object.keys(ancestorData);
  
  ancestorKeys.forEach((key) => {
    let currentInput = document.querySelector(`input[name="${key}"]`);
    
    if (currentInput.type === "radio") {
      let radioButton = document.getElementById(ancestorData.gender);
      radioButton.click();
    } else {
      currentInput.value = ancestorData[key];
    }
  });
}

if (localStorage.getItem("edit-mode") === "true") {
  editAncestor()
}

function removeAncestor(ancestorPos) {
  data = JSON.parse(localStorage.getItem("data"));
  data.splice(ancestorPos, 1);
  alert("Suppression réalisée avec succès !");
  localStorage.setItem("data", JSON.stringify(data));
  location.reload()
}
