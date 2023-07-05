data = localStorage.getItem('data')

function exportData() {
    let blob = new Blob([data],{type: 'text/javascript'}); // Convertit values en données brutes
    let exportLink = document.createElement('a');
    exportLink.setAttribute('href', window.URL.createObjectURL(blob));
    const date = new Date
    exportLink.setAttribute('download', 'data-'+date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+'-'+date.getHours()+'h'+date.getMinutes()+'.gnl')
    exportLink.click();
    window.URL.revokeObjectURL(blob);
    alert("exportation réalisée avec succès !")
}

// Créer un élément input qui sera activé par la fonction import data
let importInput = document.createElement('input');
importInput.setAttribute('type', 'file');
importInput.setAttribute('accept', '.gnl');

function importData() {
    importInput.click();
}

// Lorqu'un fichier est chargé :
importInput.addEventListener("change", loadData, false);

function loadData() {
    let file = importInput.files;

    // Si il y a des fichiers importés :
    if (file.length !== 0) {
        let reader = new FileReader();
        reader.onload = function(e) {
          let newData = e.target.result;
          newData = JSON.parse(newData)
          console.log(newData)
          localStorage.setItem('data', JSON.stringify(newData));
          alert("importation réalisée avec succès !")
          location.reload()
        };
        reader.readAsText(file[0])
    }
}

let exportButton = document.getElementById('export')
exportButton.addEventListener('click', exportData)

let importButton = document.getElementById('import')
importButton.addEventListener('click', importData)