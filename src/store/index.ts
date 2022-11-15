// import create from 'zustand'

// interface Player {
//     id: number,
//     score: number
// }

// type State = {
//     players: Player{};
// }

// const useGameStore = create<State>((set, get) => ({
//   players: {
//     id: 0, {
//         score: 0
//     }},
//   setScorePlayer: (player, score) => set((state) => {
//     const playerUpdated = get().players.find(el => el.id === player.id);
//     playerUpdated.score = score;

//     return ({
//         players: [
//             ...state.players,

//         ]
//     })
//   })
// }))
