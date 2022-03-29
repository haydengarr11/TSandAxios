type RandomUser = {
    data: Array<Team>;
  };
  
  type RandomPlayers = {
    data: Array<Player>;
  }
  
  // Define the type User to match the JSON structure from https://randomuser.me/api
  type Team = {
      city: string;
      conference: string;
      name: string;
  };
  
  type Player = {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    team: {
      full_name: string;
    }
  }
  
  
  
  export { Team, RandomUser, Player, RandomPlayers };