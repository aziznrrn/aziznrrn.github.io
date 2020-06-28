class TeamDetails extends HTMLElement {
    constructor() {
      super();
    }
  
    set teamDetails(teamDetails) {
        this._teamDetails = teamDetails;
        this.render();
    }

    render() {
        this.innerHTML= `
            <blockquote>
                <h4>${this._teamDetails.shortName}</h4>
            </blockquote>
            <div id="team-image" class="center-align">
                <img 
                    src="${this._teamDetails.crestUrl}" 
                    alt="${this._teamDetails.name}-image" 
                    class="center-align"
                >
            </div>
            <div>
                <h5 class="center-align">${this._teamDetails.name}</h5>
                <p>founded : ${this._teamDetails.founded}</p>
                <p>address : ${this._teamDetails.address}</p>
                <p>venue : ${this._teamDetails.venue}</p>
                <p>website : 
                    <a href="${this._teamDetails.website}" target="_blank">
                        ${this._teamDetails.website}
                    </a>
                </p>
                <hr/>
            </div>
            <h5 class="center-align">Squad</h5>
        `;

        this._teamDetails.squad.forEach(squad => {
            const teamSquad = document.createElement("div");
            teamSquad.classList.add("row");
            teamSquad.innerHTML = `
                <div class="col s6">${squad.name}</div>
                <div class="col s6 right-align">${squad.position}</div>
            `;
            this.appendChild(teamSquad); 
        });
    }
}

customElements.define("team-details", TeamDetails);