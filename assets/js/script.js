// Déclaration globale d'un tableau qui contiendra tous les postits : nous récupérons le contenu du localStorage myPostIt si il existe, sinon nous initialisons un tableau vide
const allPostIt = localStorage.getItem('myPostIt') ? JSON.parse(localStorage.getItem('myPostIt')) : []

// Déclaration globale d'un compteur de postIt : nous récupérons le dernier postIt du tableau allPostIt si il existe, sinon nous initialisons à 0
let postItNb = allPostIt.length > 0 ? allPostIt[allPostIt.length - 1].nb : 0

// appel de la fonction permettant de charger les post it depuis le localStorage
loadPostIt()

// ajout d'un écouteur d'événement sur le bouton "saveButton"
document.querySelector('#saveButton').addEventListener('click', function () {

    // récupération des valeurs des inputs
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;

    // nous testons si les champs sont vides et affichons un message d'alerte si c'est le cas
    if (title === '' || description === '') {
        alert('Veuillez remplir tous les champs')
        return; // on sort de la fonction avec return
    } else {
        // nous incrémentons la valeur de postItNb
        postItNb++

        // appel de la fonction permettant d'ajouter un post it : le numéro du post it, le titre et la description
        addPostIt(postItNb, title, description)

        // Nous allons créer un objet pour le stocker dans un notre tableau
        const postIt = {
            "nb": postItNb,
            "title": title,
            "description": description
        }

        // nous le stockons dans notre tableau à l'aide de méthode .push() 
        allPostIt.push(postIt)

        // on transforme notre tableau en chaine JSON, JSON.stringify(), avant de le stocker dans le localStorage myPostIt
        localStorage.setItem('myPostIt', JSON.stringify(allPostIt))

        // appel de la fonction permettant de vider les champs
        resetInput();
    }
});

// ajout d'un écouteur d'événement sur le bouton "resetButton"
document.querySelector('#resetButton').addEventListener('click', function () {
    // appel de la fonction permettant de vider les champs via erase()
    resetInput();
});

// fonction permettant de supprimer le post it : nous recupérerons l'élément cliqué en paramètre via this
function deletePostIt(element) {

    // nous récupérons le numéro du post it à supprimer à l'aide de dataset.postitNb
    let postItNb = element.parentElement.parentElement.parentElement.dataset.postitNb

    // nous créons une fonction pour trouver le post it à supprimer via son numéro
    const findPostIt = obj => obj.nb == postItNb

    // nous récupérons l'index du post it à supprimer
    const postItIndex = allPostIt.findIndex(findPostIt)

    // nous supprimons le post it du tableau à l'aide de la méthode .splice()
    allPostIt.splice(postItIndex, 1)

    // nous mettons à jour le localStorage
    localStorage.setItem('myPostIt', JSON.stringify(allPostIt))

    // nous remontons dans l'arborescence pour cacher le parent du parent du parent de l'élément cliqué : ça cache le post it complet pour conservé une place vide
    element.parentElement.parentElement.parentElement.style.visibility = 'hidden'
}

// fonction permettant de vider les champs titre et commentaires
function resetInput() {
    document.querySelector('#title').value = ''
    document.querySelector('#description').value = ''
}

// fonction permettant d'ajouter un post it avec les valeurs des inputs "titre et commentaires" recupérées
function addPostIt(nb, title, description) {
    document.querySelector('#board').innerHTML += `
    <div class="col" data-postit-nb="${nb}">
        <div class="p-2 text-center border border-secondary-subtle border-start-0 border-top-0 bg-warning-subtle shadow">
            <div class="text-center">
                <i class="pin position-relative bi bi-pin-angle-fill text-danger fs-3"></i>
                <i class="bi bi-x-lg float-end" onclick="deletePostIt(this)"></i>
            </div>
            <p class="h3">${title}</p>
            <p>${description}</p>
        </div>
    </div>
    `
}

// fonction permettant de charger les post it depuis le localStorage
function loadPostIt() {
    // nous parcourons le tableau allPostIt
    for (const postIt of allPostIt) {
        // nous appelons la fonction addPostIt pour chaque post it  : le numéro du post it, le titre et la description
        addPostIt(postIt.nb, postIt.title, postIt.description)
    }
}
