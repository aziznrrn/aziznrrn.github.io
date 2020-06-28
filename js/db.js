import "./idb.js";

const dbPromised = idb.open("team-epl", 1, (upgradeDb) => {
    upgradeDb.createObjectStore("favorited", {
        keyPath: "id"
    });
});

const addToFavorited = (favorite) => {
    dbPromised.then((db) => {
        const tx = db.transaction("favorited", "readwrite");
        const store = tx.objectStore("favorited");
        store.add(favorite);
        return tx.complete;
    })
    .then(() => console.log("Team added to favorited team"));
}

const getFavorited = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            const tx = db.transaction("favorited", "readonly");
            const store = tx.objectStore("favorited");
            return store.getAll();
        })
        .then(favorited => resolve(favorited));
    });
}

const getFavoritedById = (id) =>{
    return new Promise((resolve, reject) =>{
        dbPromised.then((db) => {
            const tx = db.transaction("favorited", "readonly");
            const store = tx.objectStore("favorited");
            return store.get(id);
        })
        .then(favorited => resolve(favorited))
    });
}

const delFromFavorite = (id) => {
    dbPromised
    .then((db) =>{
        const tx = db.transaction('favorited', 'readwrite');
        const store = tx.objectStore('favorited');
        store.delete(id);
        return tx.complete;
    }).then(() => console.log("Team has deleted from favorite"));
}

export {addToFavorited, getFavorited, getFavoritedById, delFromFavorite};