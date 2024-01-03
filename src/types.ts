export interface Match {
  date: string;
  team1: string;
  team2: string;
  goals1: number;
  goals2: number;
}

export interface Player {
  name: string;
  matches: number;
  score: number;
}
