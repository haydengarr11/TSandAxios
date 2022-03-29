import axios, { AxiosResponse } from "axios";
import { RandomUser, Team, Player, RandomPlayers } from "./datatypes";

const limitInput: Element | null = document.getElementById("input1");
const searchBtn = document.getElementById("btn1");
const myTable = document.getElementById("teams");
const playerTable = document.getElementById("players");
const randomPlayerButton = document.getElementById("btn2");

const teamID: {[key: string]: number} = {
  "Atlanta": 1,
  "Boston": 2,
  "Brooklyn": 3,
  "Charlotte": 4,
  "Chicago": 5,
  "Cleveland": 6,
  "Dallas": 7,
  "Denver": 8,
  "Detroit": 9,
  "Golden State": 10,
  "Houston": 11,
  "Indiana": 12,
  "LA": 13,
  "Los Angeles": 14,
  "Memphis": 15,
  "Miami": 16,
  "Milwaukee": 17,
  "Minnesota": 18,
  "New Orleans": 19,
  "New York": 20,
  "Oklahoma City": 21,
  "Orlando": 22,
  "Philadelphia": 23,
  "Phoenix": 24,
  "Portland": 25,
  "Sacramento":26,
  "San Antonio": 27,
  "Toronto":28,
  "Utah": 29,
  "Washington": 30
}

// Define a click listener on the button
searchBtn?.addEventListener("click", () => {
  removeOldTeamData();
  fetchNewTeamData();
});

/* 
  Button listener to remove old data and fetch 
  new data to fill the table
*/
randomPlayerButton?.addEventListener("click", () => {
  removeOldPlayerData();
  fetchNewPlayer();
});

function removeOldTeamData() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPIteam");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    myTable?.removeChild(rows[k]);
  }
}

function removeOldPlayerData() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPIplayers");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    playerTable?.removeChild(rows[k]);
  }
}

function randomizeArray(players: Array<Player>): Array<Player> {
  for (let i = players.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i +1));
    [players[i], players[j]] = [players[j], players[i]];
  }
  return players;
}

function fetchNewTeamData() {
  // Use the user input to control the number of random users to fetch
  const teamSearch: string = (limitInput as HTMLInputElement)?.value ?? "";
  const search = teamID[teamSearch];

  axios
    .request({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/teams/",
      params: {page: 0,
        per_page: 30
      },
    })
    .then((r: AxiosResponse) => r.data)
    .then((ru: RandomUser) => {
      if (teamSearch == ""){
      for (let k = 0; k < 30; k++) {
        const u: Team = ru.data[k];
        const aRow = document.createElement("tr");
        // Use a unique class name so it is easy to remove rows later
        aRow.setAttribute("class", "fromAPIteam");
        myTable?.appendChild(aRow);


        // Create a table data cell to show team city 
        const nameCell = document.createElement("td");
        nameCell.innerText = u.city;
        aRow.appendChild(nameCell);

        // Create a table data cell to show name of Team
        const DOBCell = document.createElement("td");
        DOBCell.innerText = u.name;
        aRow.appendChild(DOBCell);
        aRow.appendChild(DOBCell);

        // Create a table data cell to show the teams conference 
        const conference = document.createElement("td");
        aRow.appendChild(conference);
        conference.innerText = u.conference;
  
      }
      /*

      */
    } else if (teamSearch != ""){
      const searchedTeam: Team = ru.data[search - 1];
      const aRow = document.createElement("tr");
        // Use a unique class name so it is easy to remove rows later
        aRow.setAttribute("class", "fromAPIteam");
        myTable?.appendChild(aRow);
        // Create a table data cell to show team city
        const nameCell = document.createElement("td");
        nameCell.innerText = searchedTeam.city;
        aRow.appendChild(nameCell);

        // Create a table data cell to show team name
        const DOBCell = document.createElement("td");
        DOBCell.innerText = searchedTeam.name;
        aRow.appendChild(DOBCell);
        aRow.appendChild(DOBCell);

        // Create a table data cell to show the teams conference 
        const conference = document.createElement("td");
        aRow.appendChild(conference);
        conference.innerText = searchedTeam.conference;
    }
    });
}


/*
  pulls data from API using Axios and parses the data to display in a table format

*/
function fetchNewPlayer() {
  var randomPlayer = Math.floor(Math.random() * 21); 
  axios
    .request({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/players/",
      params: {page: randomPlayer,
        per_page: 100,
      }
    })
    .then((r: AxiosResponse) => r.data)
    .then((ru: RandomPlayers) => {
      let randomizedArray = randomizeArray(ru.data);
      const aPlayer: Player = randomizedArray[0];
      const newRow = document.createElement("tr");

      newRow.setAttribute("class", "fromAPIplayers");
      playerTable?.appendChild(newRow);

      const playerName = document.createElement("td");
      playerName.innerText = `${aPlayer.first_name} ${aPlayer.last_name}`;
      newRow.appendChild(playerName);

      const playerPosition = document.createElement("td");
      playerPosition.innerText = aPlayer.position;
      newRow.appendChild(playerPosition);

      const playerTeam = document.createElement("td");
      playerTeam.innerText = aPlayer.team.full_name;
      newRow.appendChild(playerTeam);
    });
}


fetchNewPlayer();

fetchNewTeamData();