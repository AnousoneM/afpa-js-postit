// ajoput d'un écouteur d'événement sur le bouton "saveButton"
document.querySelector('#saveButton').addEventListener('click', function () {

    // récupération des valeurs des inputs
    let titre = document.querySelector('#titre').value;
    let commentaires = document.querySelector('#commentaires').value;

    // nous testons si les champs sont vides
    if (titre === '' || commentaires === '') {
        alert('Veuillez remplir tous les champs');
        return; // on sort de la fonction avec return
    } else {
        // appel de la fonction permettant d'ajouter un post it
        addPostIt(titre, commentaires);

        // appel de la fonction permettant de vider les champs
        effacer();
    }
});

// fonction permettant de supprimer le post it : nous recupérerons l'élément cliqué
function supprimer(element) {
    // nous remontons dans l'arborescence pour supprimer le parent du parent de l'élément cliqué
    element.parentElement.parentElement.remove();
}

// fonction permettant de vider les champs titre et commentaires
function effacer() {
    document.querySelector('#titre').value = '';
    document.querySelector('#commentaires').value = '';
}

// fonction permettant d'ajouter un post it avec les valeurs des inputs "titre et commentaires" recupérées
function addPostIt(titre, commentaires) {
    document.querySelector('#board').innerHTML += `
        <div class="col p-2 m-3 text-center border border-secondary-subtle border-start-0 border-top-0 bg-warning-subtle shadow">
            <div class="text-center">
                <i class="bi bi-pin-angle-fill text-danger-subtle fs-3"></i>
                <i class="bi bi-x-lg float-end" onclick="supprimer(this)"></i>
            </div>
            <p class="h4">${titre}</p>
            <p>${commentaires}</p>
        </div>
    `
}