import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectCount, selectStatus } from "./counterSlice"

export const Counter = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)

  return <div></div>
}
