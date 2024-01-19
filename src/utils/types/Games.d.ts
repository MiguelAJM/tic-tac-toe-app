export interface GameTypes {
  gameId: string
  currentPlayer: string
  playerHost: string
  players: Player[]
  gameRoom: string
  currentTurn: string
  status: string
  board: any[]
  winner: string
}

export interface Player {
  isOnline: boolean
  player_name: string
  turn?: Turn
  uid: string
  status?: string
}

export interface Turn {
  turn: string
  svg: string
}
