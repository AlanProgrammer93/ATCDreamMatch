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
    addMemberToTeam: (teamName: string | undefined, members: Member[]) => void;
    removeMember: (id: string) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
    teams: [],
    players: [],
    addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
    addMember: (member) => set((state) => ({ players: [...state.players, member] })),
    removeTeam: (name) => set((state) => ({ teams: state.teams.filter((team) => team.name !== name) })),
    setTeams: (teams) => set({ teams }),
    addMemberToTeam: (teamName, members) =>
        set((state) => ({
            teams: state.teams.map((team) =>
                team.name === teamName
                    ? { ...team, members: members }
                    : team
            ),
        })),
    removeMember: (id) => set((state) => ({ players: state.players.filter((player) => player !== id) })),
}));
