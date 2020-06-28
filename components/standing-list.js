const header = document.createElement("div");
header.classList.add("row");
header.innerHTML = `
    <div class="col s6">Team</div>
    <div class="col s1">w</div>
    <div class="col s1">D</div>
    <div class="col s2">L</div>
    <div class="col s2">P</div>
`;

class StandingList extends HTMLElement {
    constructor() {
      super();
    }
  
    set list(list) {
        this._list = list;
        this.render();
    }

    render() {
        this.innerHTML= `
			<div class="row">
				<div class="col s6">Team</div>
				<div class="col s1">w</div>
				<div class="col s1">D</div>
				<div class="col s2">L</div>
				<div class="col s2">P</div>
			</div>
        `;
        this._list.forEach( standing => {
            const list = document.createElement("div");
            list.classList.add("row");
            list.innerHTML = `
                <div class="col s6">${standing.team.name}</div>
                <div class="col s1">${standing.won}</div>
                <div class="col s1">${standing.draw}</div>
                <div class="col s2">${standing.lost}</div>
                <div class="col s2">${standing.points}</div>
            `;
            this.appendChild(list); 
        });
    }
}

customElements.define("standing-list", StandingList);