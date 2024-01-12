export const checkEndGame = (checkNewBoard: any[]) => {
  return checkNewBoard.every((square) => square !== null)
}
