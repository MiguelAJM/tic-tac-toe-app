import { IconCircle, IconX } from "@tabler/icons-react"

export const getIcon = (turn: null | string) => {
    return turn === 'x' ? (
      <IconX size={40} />
    ) : turn === 'o' ? (
      <IconCircle size={40} />
    ) : null
  }