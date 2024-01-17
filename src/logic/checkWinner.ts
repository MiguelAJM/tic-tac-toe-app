import { WIN_COMBOS } from '../constats'

export const checkWinner = (boardToCheck: any[]) => {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo
    console.log(boardToCheck[a] && boardToCheck[a] === boardToCheck[b])
    console.log(boardToCheck[a] && boardToCheck[a] === boardToCheck[c])
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return 'not-winner'
}
