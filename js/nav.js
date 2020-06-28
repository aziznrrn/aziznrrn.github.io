import "./regServiceWorker.js";
import {
    getTeamList,
    getFavoritedTeam,
    getStandingsList
} from "./api.js";

document.addEventListener("DOMContentLoaded", function() {
  
	const elems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(elems);
	loadNav();

	function loadNav() {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				document.querySelectorAll(".topnav, .sidenav")
				.forEach((el) => el.innerHTML = xhttp.responseText);

				document.querySelectorAll(".sidenav a, .topnav a")
				.forEach((el) => {
					el.addEventListener("click", event => {
						const sidenav = document.querySelector(".sidenav");
						M.Sidenav.getInstance(sidenav).close();

						page = event.target.getAttribute("href").substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}

	let page = window.location.hash.substr(1);
	if (page === "") page = "home";
	loadPage(page);

	function loadPage(page) {
		const xhttp = new XMLHttpRequest();
		const content = document.querySelector("#body-content");

		xhttp.onreadystatechange = function() {
			if (this.readyState === 4) {
				
				if (page === "home") { 
					getTeamList();
				} else if (page === "favorite") { 
					getFavoritedTeam();
				} else if (page === "standings") {
					getStandingsList();
				}

				if (this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if (this.status == 404) {
					content.innerHTML = "<code>Page not found.</code>";
				} else { 
					content.innerHTML = "<code>Ups.. halaman tidak dapat diakses.</code>";
				}
			}
		};
		xhttp.open("GET", `pages/${page}.html`, true);
		xhttp.send();
	}
});