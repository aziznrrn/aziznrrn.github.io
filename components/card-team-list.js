class CardTeamList extends HTMLElement {
    constructor() {
		super();
	}
  
    set teamList(teamList) {
		this._teamList = teamList;
		this.render();
	}
	
    render() {
		console.log(this._teamList);
        this._teamList.forEach(team =>{
            const card = document.createElement("div");
			card.innerHTML = `
				<div class="card">
					<a href="./team.html?id=${team.id}&favorited=true">
						<div class="card-image waves-effect waves-block waves-light image-crop">
							<img src="${team.crestUrl}" alt="${team.name}-image">
						</div>
						<div class="card-content">
							<span class="card-title">${team.name}</span>
						</div>
					</a>
				</div>
			`;
            this.appendChild(card); 
        });
    }
}

customElements.define("card-team-list", CardTeamList);