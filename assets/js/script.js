// Déclaration globale d'un tableau qui contiendra tous les postits créés
const allPostIt = []
// Déclaration globale d'un compteur de postIt
let postItNb = 0

// ajout d'un écouteur d'événement sur le bouton "saveButton"
document.querySelector('#saveButton').addEventListener('click', function () {

    // récupération des valeurs des inputs
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;

    // nous testons si les champs sont vides et affichons un message d'alerte si c'est le cas
    if (title === '' || description === '') {
        alert('Veuillez remplir tous les champs');
        return; // on sort de la fonction avec return
    } else {

        postItNb++

        // appel de la fonction permettant d'ajouter un post it
        addPostIt(postItNb, title, description);

        const newPostIt = {
            "nb": postItNb,
            "title": title,
            "description": description
        }

        allPostIt.push(newPostIt)

        console.log(allPostIt)

        // appel de la fonction permettant de vider les champs
        erase();
    }
});

// ajout d'un écouteur d'événement sur le bouton "resetButton"
document.querySelector('#resetButton').addEventListener('click', function () {
    // appel de la fonction permettant de vider les champs via erase()
    erase();
});

// fonction permettant de supprimer le post it : nous recupérerons l'élément cliqué
function deletePostIt(element) {


    let postItNb = element.parentElement.parentElement.parentElement.dataset.postitNb

    const findPostIt = obj => obj.nb == postItNb

    const postItIndex = allPostIt.findIndex(findPostIt)

    allPostIt.splice(postItIndex,1)

    // nous remontons dans l'arborescence pour cacher le parent du parent du parent de l'élément cliqué : ça cache le post it complet pour conservé une place vide
    element.parentElement.parentElement.parentElement.style.visibility = 'hidden';

    console.log(allPostIt)
}

// fonction permettant de vider les champs titre et commentaires
function erase() {
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
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
