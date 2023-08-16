export interface FindStateWithCity {
  id: number;
  desc_state: string;
  desc_state_short: string;
  cities: {
    id: number;
    desc_city: string;
  }[];
}
