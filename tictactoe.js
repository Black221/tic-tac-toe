//  TIC TA TOE GAME

const width = 600;

let player1 = "O";
let player2 = "X";

let joueurCourant = player1;

let plateau = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let gameover = false;

let canvas;
let ctx;

function setup() {
    canvas = document.getElementById("plateau");
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = width;
    canvas.style.border = "2px solid black";
    canvas.addEventListener("click", handleClick);
    draw();
}

function handleClick(event) {
    // si le jeu est terminé, on ne fait rien
    if (gameover) {
        return;
    }

    // récupérer les coordonnées de la souris
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;

    // déterminer la case cliquée
    let i = Math.floor(x / (canvas.width / 3));
    let j = Math.floor(y / (canvas.height / 3));

    // si la case est vide, on joue
    if (plateau[j][i] == "") {

        // mettre le joueur courant dans la case
        plateau[j][i] = joueurCourant; 
        // vérifier si le joueur a gagné
        let gagnant = regarderGagnant();

        // si le jeu est terminé, afficher un message
        if (gagnant != null) {
            if (gagnant == "tie") {
                alert("It's a tie!");
            } else {
                alert(`Player ${gagnant} wins!`);
            }
            gameover = true;
        } 
        
        // sinon, changer de joueur
        else {
            joueurCourant = joueurCourant == player1 ? player2 : player1;
        }
    }

    // redessiner le canvas
    draw();
}

setup();

// dessiner une ligne
function dessinerLigne(x1, y1, x2, y2) {

    ctx.color = "black";
    ctx.beginPath();
    ctx.moveTo(x1, y1); // point de départ
    ctx.lineTo(x2, y2); // point d'arrivée
    ctx.stroke(); // dessiner la ligne
}

function dessinerCroix (x, y, w, h) {
    dessinerLigne(x, y, x + w, y + h); // dessiner une ligne de gauche à droite
    dessinerLigne(x, y + h, x + w, y); // dessiner une ligne de droite à gauche
}

function dessinerEllipse(x, y, r) {
    ctx.beginPath(); 
    ctx.arc(x, y, r, 0, Math.PI * 2); // dessiner un cercle
    ctx.stroke(); // dessiner le contour
}




function draw() {
    // effacer le canvas
    ctx.clearRect(0, 0, width, width);

    // diviser le canvas en 3x3
    let tailleCase = width / 3;

    // dessiner les lignes
    dessinerLigne(tailleCase, 0, tailleCase, width); // vertical à 1/3 de la largeur
    dessinerLigne(tailleCase * 2, 0, tailleCase * 2, width); // vertical à 2/3 de la largeur

    dessinerLigne(0, tailleCase, width, tailleCase); // horizontal à 1/3 de la hauteur
    dessinerLigne(0, tailleCase * 2, width, tailleCase * 2); // horizontal à 2/3 de la hauteur

    // dessiner les X et O dans les cases
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {

            // on calcule le centre de la case
            let x = tailleCase * i + tailleCase / 2; // taille de la case * i + moitié de la taille de la case 
            let y = tailleCase * j + tailleCase / 2; // taille de la case * j + moitié de la taille de la case

            // on récupère le contenu de la case
            let spot = plateau[j][i];

            // on calcule le rayon du cercle
            let r = tailleCase / 4;

            // si la case appartient au joueur 1
            if (spot == player1) {
                dessinerEllipse(x, y, r * 2);
            } 
            
            // si la case appartient au joueur 2
            else if (spot == player2) {

                let xr = tailleCase / 4; // rayon de la croix
                dessinerCroix(x - xr, y - xr, xr * 2, xr * 2);
            }
        }
    }
}





function regarderGagnant() {
    let gagnant = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (plateau[i][0] == plateau[i][1] && plateau[i][1] == plateau[i][2] && plateau[i][0] != "") {
            gagnant = plateau[i][0];
        }
    }

    // vertical
    for (let i = 0; i < 3; i++) {
        if (plateau[0][i] == plateau[1][i] && plateau[1][i] == plateau[2][i] && plateau[0][i] != "") {
            gagnant = plateau[0][i];
        }
    }

    // diagonal
    if (plateau[0][0] == plateau[1][1] && plateau[1][1] == plateau[2][2] && plateau[0][0] != "") {
        gagnant = plateau[0][0];
    }

    if (plateau[0][2] == plateau[1][1] && plateau[1][1] == plateau[2][0] && plateau[0][2] != "") {
        gagnant = plateau[0][2];
    }

    // vérifier s'il reste des cases vides
    let pasEncoreJoue = 0;
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            if (plateau[j][i] == "") {
                pasEncoreJoue++;
            }
        }
    }

    // si le jeu est terminé et qu'il n'y a pas de gagnant
    if (gagnant == null && pasEncoreJoue == 0) {
        return "tie";
    } 
    
    // sinon, on retourne le gagnant
    else {
        return gagnant;
    }
}