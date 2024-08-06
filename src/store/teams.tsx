import create from 'zustand';

export interface Member {
    id: string;
    name: string;
    image: string;
}

export interface Team {
    name: string;
    members: Member[];
}

interface TeamState {
    teams: Team[];
    players: string[];
    addTeam: (team: Team) => void;
    addMember: (member: string) => void;
    removeTeam: (id: string) => void;
    setTeams: (teams: Team[]) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
    teams: [],
    players: [],
    addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
    addMember: (member) => set((state) => ({ players: [...state.players, member] })),
    removeTeam: (name) => set((state) => ({ teams: state.teams.filter((team) => team.name !== name) })),
    setTeams: (teams) => set({ teams }),
}));
