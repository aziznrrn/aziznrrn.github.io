import {
    getTeamDetails,
    getFavoritedTeamDetails
} from "./api.js";

import {
    addToFavorited,
    delFromFavorite
} from "./db.js";

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isFavorited = urlParams.get("favorited");
    const idParam = parseInt(urlParams.get("id"));
    const btnFav = document.getElementById("add-to-fav");
    const btnDel = document.getElementById("del-from-fav");
    btnDel.style.display = "none";
    
    if (isFavorited) {
        btnFav.style.display = "none";
        getFavoritedTeamDetails(idParam);
        btnDel.style.display = "block";
        btnDel.onclick = () => {
            delFromFavorite(idParam);
            M.toast({html: 'Deleted from favorite'});
        }
    } else {
        const team = getTeamDetails();
        btnFav.onclick = function () {
            M.toast({html: 'Added to favorite'});
            team.then((favorite) => addToFavorited(favorite));
        };
    }
});