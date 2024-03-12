import { createAppSlice } from "../../app/createAppSlice"
import { fetchCount } from "./counterAPI"

export interface CounterSliceState {
  value: number
  status: "idle" | "loading" | "failed"
}

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const counterSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),

    incrementAsync: create.asyncThunk(
      async amount => {
        const response = await fetchCount(amount)
        //@ts-ignore
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value += action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),

  selectors: {
    selectCount: counter => counter.value,
    selectStatus: counter => counter.status,
  },
})

// Action creators are generated for each case reducer function.
export const { increment, incrementAsync } = counterSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCount, selectStatus } = counterSlice.selectors

// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())

//     // if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//     //   dispatch(incrementByAmount(amount))
//     // }
//   }

export default counterSlice.reducer
