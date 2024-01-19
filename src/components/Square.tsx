interface SquereType {
  children?: React.ReactNode
  updateBoard?: () => void
  isSelected?: boolean
  index?: number
  className?: string
}

export const Square = ({
  children,
  className,
  updateBoard,
  isSelected,
  index
}: SquereType) => {
  const selected = isSelected ? 'bg-pink-500' : ''

  const handleClick = () => {
    if (updateBoard) return updateBoard()
  }

  return (
    <li
      onClick={handleClick}
      key={index}
      className={`${selected} ${className} select-none size-[100px] border-2 rounded-2xl text-white grid place-content-center text-4xl`}
    >
      {children}
    </li>
  )
}
