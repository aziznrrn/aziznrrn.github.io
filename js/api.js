import "../components/card-team-list.js";
import "../components/team-details.js";
import "../components/standing-list.js";
import {getFavorited, getFavoritedById} from "./db.js";

const fetchApi = url => {
    return fetch(url, {
        headers: {
            "X-Auth-Token": "07783031fc4c4849904e3808278162a6"
        }
    })
};
const json = (response) => response.json();

const getTeamList = () => {
    if (caches.open('standings')) {
        caches.match("https://api.football-data.org/v2/competitions/2021/standings/")
        .then((response) => {
            if (response) response.json()
            .then((data) => {
                let TeamList = "";
                const table = data["standings"]["0"]["table"];
                table.forEach((detail) => {
                    TeamList += `
                        <div class="card">
                            <a href="./team.html?id=${detail.team.id}">
                                <div class="card-image waves-effect waves-block waves-light image-crop">
                                    <img src="${detail.team.crestUrl}" alt="${detail.team.name}-image">
                                </div>
                                <div class="card-content">
                                    <span class="card-title">${detail.team.name}</span>
                                </div>
                            </a>
                        </div>
                    `;
                });
                document.getElementById("team-list").innerHTML = TeamList;
            })
        });
    } 
   
    fetchApi("https://api.football-data.org/v2/competitions/2021/standings/")
    .then(json)
    .then((data) => {
        let TeamList = "";
        const table = data["standings"]["0"]["table"];
        table.forEach((detail) => {
            TeamList += `
                <div class="card">
                    <a href="./team.html?id=${detail.team.id}">
                        <div class="card-image waves-effect waves-block waves-light image-crop">
                            <img src="${detail.team.crestUrl}" alt="${detail.team.name}-image">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${detail.team.name}</span>
                        </div>
                    </a>
                </div>
            `;
        });
        document.getElementById("team-list").innerHTML = TeamList;
    })
}

const getTeamDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    return new Promise((resolve, reject) => {     
        if (caches.open("teams"))
            caches.match(`https://api.football-data.org/v2/teams/${idParam}`)
            .then((response) => {
                if (response) response.json()
                .then((data) => {
                    renderTeamDetails(data);
                    resolve(data);            
                })
            }) 

        fetchApi(`https://api.football-data.org/v2/teams/${idParam}`)
        .then(json)
        .then((data) => {
            renderTeamDetails(data);
            resolve(data);
        })
    })
}

const getFavoritedTeam = () => 
    getFavorited()
    .then((data) => renderTeamList(data))

const getFavoritedTeamDetails = (idParam) =>
    getFavoritedById(idParam)
    .then((data) => renderTeamDetails(data))

const getStandingsList =() => {
    if (caches.open('standings'))
        caches.match("https://api.football-data.org/v2/competitions/2021/standings/")
        .then((response) => {
            if (response) response.json()
            .then((data) => renderStandingList(data["standings"]["0"]["table"]))
        })
    
    fetchApi("https://api.football-data.org/v2/competitions/2021/standings/")
    .then(json)
    .then(data => renderStandingList(data["standings"]["0"]["table"]))
}

const renderTeamList = (teamList) => {
    const cardTeamList = document.querySelector("card-team-list");
    cardTeamList.teamList = teamList;
}

const renderTeamDetails = (details) => {
    const teamDetails = document.querySelector("team-details");
    teamDetails.teamDetails = details;
}

const renderStandingList = (list) => {
    const standingList = document.querySelector("standing-list");
    standingList.list = list;
}

export {
    getTeamList, getTeamDetails,
    getFavoritedTeam, getFavoritedTeamDetails,
    getStandingsList, fetchApi
};