const container = document.getElementById('item-list')
let data = localStorage.getItem('data')
for (i=0; i < data.length;i++) {
    data = data.replace('+', '-')
}
data = decodeURIComponent(data)
localStorage.setItem('data', data)
data = JSON.parse(data)
console.log(data)
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septmbre", "Octobre", "Novembre", "Décembre"];

localStorage.setItem("ancestor-pos", undefined)
localStorage.setItem("edit-mode", false)

let idAncestorToDelete = undefined

data.forEach((ancestorData) => {
    let newInfoBox = document.createElement('div')
    newInfoBox.className = "info-box"
    newInfoBox.id = data.indexOf(ancestorData)
    
    let birthDate;
    let deathDate;
    let weddingDate;
    if (ancestorData.birthdate !== "") {
        birthDate = new Date(ancestorData.birthdate)
    }
    if (ancestorData.deathdate !== "") {
        deathDate = new Date(ancestorData.deathdate)
    }
    if (ancestorData.weddingdate !== "") {
        weddingDate = new Date(ancestorData.weddingdate)
    }

    let womenE = ""
    if (ancestorData.gender === "femme") {
        womenE = "e"
    }


    //header
    if (ancestorData.gender === "femme") {
        newInfoBox.className += " female"
    } else if (ancestorData.gender === "homme") {
        newInfoBox.className += " male"
    }

    let header = document.createElement('header')

    let h3 = document.createElement('h3')
    h3.innerHTML = ancestorData.name
    h3.innerHTML = h3.innerHTML.toUpperCase()
    if (ancestorData.birthname !== ancestorData.name && ancestorData.birthname !== "") {
        h3.innerHTML = h3.innerHTML +" (Né"+womenE+" "+ancestorData.birthname+")"
    } 

    let h4 = document.createElement('h4')
    h4.innerHTML = ancestorData.firstname
    h4.innerHTML = h4.innerHTML[0].toUpperCase() + h4.innerHTML.slice(1)
    if (ancestorData.usualname !== ancestorData.firstname && ancestorData.usualname !== "") {
        h4.innerHTML = h4.innerHTML +' "'+ancestorData.usualname+'" '
    }

    let dates = document.createElement('p')
    if (birthDate) {
        if (deathDate) {
            dates.innerHTML = birthDate.getFullYear()+" - "+deathDate.getFullYear()+" (&TildeTilde;"+(deathDate.getFullYear()-birthDate.getFullYear())+"ans)"
        } else {
            dates.innerHTML = "Né"+womenE+" en "+birthDate.getFullYear()
        }
    } else if (deathDate) {
        dates.innerHTML = "Décédé"+womenE+" en "+deathDate.getFullYear()
    }

    header.appendChild(h3)
    header.appendChild(h4)
    header.appendChild(dates)
    newInfoBox.appendChild(header)


    // Contenu
    let p = document.createElement("p")
    function pushP() {
        if (p.innerHTML !== "") {
            newInfoBox.appendChild(p)
        }
        p = document.createElement("p")
    }
        // Naissance
    if (birthDate || ancestorData.birthplace) {
        p.innerHTML = "<b>Né"+womenE+"</b>"
        if (birthDate) {
            p.innerHTML = p.innerHTML+" <b>le</b> "+birthDate.getDate()+" "+months[birthDate.getMonth()]+" "+birthDate.getFullYear()
        }
        if (ancestorData.birthplace !== "") {
            p.innerHTML = p.innerHTML+" <b>à</b> "+ancestorData.birthplace
        }
    }
    pushP()

        // Parenté
    if (ancestorData.dadname || ancestorData.dadfirstname || ancestorData.momname || ancestorData.momfirstname) {
        if (ancestorData.gender === "femme") {
            p.innerHTML = "Fille de "
        } else {
            p.innerHTML = "Fils de "
        }
        if (ancestorData.dadname && ancestorData.dadfirstname) {
            p.innerHTML = p.innerHTML+ancestorData.dadname.toUpperCase()+" "+ancestorData.dadfirstname
        } else if (ancestorData.dadfirstname) {
            p.innerHTML = p.innerHTML+'"'+ancestorData.dadfirstname+'"'
        } else if (ancestorData.dadname) {
            p.innerHTML = p.innerHTML+"M. "+ancestorData.dadname
        }
        if ((ancestorData.dadfirstname || ancestorData.dadname) && (ancestorData.momfirstname || ancestorData.momname)) {
            p.innerHTML = p.innerHTML+" et de "
        }
        if (ancestorData.momname && ancestorData.momfirstname) {
            p.innerHTML = p.innerHTML+ancestorData.momname.toUpperCase()+" "+ancestorData.momfirstname
        } else if (ancestorData.momfirstname) {
            p.innerHTML = p.innerHTML+'"'+ancestorData.momfirstname+'"'
        } else if (ancestorData.momname) {
            p.innerHTML = p.innerHTML+"M. "+ancestorData.momname
        }
    }
    pushP()
        // Mariage
    if (weddingDate || ancestorData.weddingplace || ancestorData.partnerfirstname || ancestorData.partnername) {
        p.innerHTML = "<b>Marié"+womenE+"</b>"
        if (ancestorData.partnerfirstname !== "" && ancestorData.partnername !== "") {
            p.innerHTML = p.innerHTML+" <b>avec</b> "+ancestorData.partnername.toUpperCase()+" "+ancestorData.partnerfirstname    
        } else if (ancestorData.partnerfirstname !=="") {
            p.innerHTML = p.innerHTML+' <b>avec</b> "'+ancestorData.partnerfirstname+'"'
        } else if (ancestorData.partnername !=="") {
            p.innerHTML = p.innerHTML+' <b>avec</b> Mlle '+ancestorData.partnername.toUpperCase()
        }
        if (weddingDate) {
            p.innerHTML = p.innerHTML+" <b>le</b> "+weddingDate.getDate()+" "+months[weddingDate.getMonth()]+" "+weddingDate.getFullYear()
        }
        if (ancestorData.weddingplace !== "") {
            p.innerHTML = p.innerHTML+" <b>à</b> "+ancestorData.weddingplace
        }
    } else {
        p.innerHTML = "<b>Célibataire</b>"
    }
    pushP()
        // Profession
    if (ancestorData.job !== "") {
        p.innerHTML = "<b>Profession de</b> "+ancestorData.job
    }
    pushP()
        // Décès
    if (deathDate || ancestorData.deathplace) {
        p.innerHTML = "<b>Décédé"+womenE+"</b>"
        if (deathDate) {
            p.innerHTML = p.innerHTML+" <b>le</b> "+deathDate.getDate()+" "+months[deathDate.getMonth()]+" "+deathDate.getFullYear()
        }
        if (ancestorData.deathplace !== "") {
            p.innerHTML = p.innerHTML+" <b>à</b> "+ancestorData.deathplace
        }
    }
    pushP()
        // Notes
    if (ancestorData.notes !=="") {
        p.innerHTML = ancestorData.notes
    }
    pushP()
        // Liens
    if (ancestorData.birthurl) {
        let a = document.createElement('a')
        a.innerHTML = "acte de naissance"
        a.href = ancestorData.birthurl
        p.appendChild(a)
        if (ancestorData.deathurl || ancestorData.weddingurl) {
            p.innerHTML = p.innerHTML + " - "
        } 
    }
    if (ancestorData.weddingurl) {
        let a = document.createElement('a')
        a.innerHTML = "acte de mariage"
        a.href = ancestorData.weddingurl
        p.appendChild(a)
        if (ancestorData.deathurl ) {
            p.innerHTML = p.innerHTML + " - "
        } 
    }
    if (ancestorData.deathurl) {
        let a = document.createElement('a')
        a.innerHTML = "acte de décès"
        a.href = ancestorData.deathurl
        p.appendChild(a)
    }
    pushP()

    // Fonctions
    let editButton = document.createElement('button')
    editButton.addEventListener('click', function() {
        localStorage.setItem("ancestor-pos", this.parentElement.id)
        localStorage.setItem("edit-mode", true)
        let newAncestorButton = document.getElementById("newAncestor");
        newAncestorButton.click();
    })
    editButton.innerHTML = "éditer"

    let deleteButton = document.createElement("button")
    deleteButton.addEventListener('click', function() {   
        data = JSON.parse(localStorage.getItem("data"));
        document.getElementById("ancestor-to-delete").innerHTML = data[this.parentElement.id].name.toUpperCase()+" "+data[this.parentElement.id].firstname.toUpperCase()
        document.getElementById("delete-alert").hidden = false
        document.getElementById("overlay").hidden = false
        idAncestorToDelete = this.parentElement.id
      })
    deleteButton.innerHTML = "supprimer"

    newInfoBox.appendChild(editButton)
    newInfoBox.appendChild(deleteButton)

    let oldInfoBoxes = document.getElementsByClassName("info-box")
    container.insertBefore(newInfoBox, oldInfoBoxes[0])
  });

let cancelDeleteButton = document.getElementById("cancel-delete")
cancelDeleteButton.addEventListener('click', function() {
    idAncestorToDelete = undefined
    document.getElementById("delete-alert").hidden = true
    document.getElementById("overlay").hidden = true
})

let confirmDeleteButton = document.getElementById('confirm-delete')
confirmDeleteButton.addEventListener('click', function() {
    data.splice(idAncestorToDelete, 1);
    localStorage.setItem("data", JSON.stringify(data));
    alert("Suppression réalisée avec succès !");
    location.reload();
    idAncestorToDelete = undefined
})

// ancestorData = {
//     "name":"...",
//     "birthname":"",
//     "firstname":"...",
//     "usualname":"",
//     "job":"",
//     "birthdate" :"",
//     "birthplace":"",
//     "dadname":"",
//     "dadfirstname":"",
//     "momname":"",
//     "momfirstname":"",
//     "deathdate":"",
//     "deathplace":"",
//     "partnername":"",
//     "partnerfirstname":"",
//     "weddingdate":"",
//     "weddingplace":""
// }