const CHANGE_THEME = 'CHANGE-THEME'

const initState = {
  mode: true,
}

export const uiReducer = (state: InitStateType = initState, action: UiActionsType): InitStateType => {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, mode: action.mode}

    default:
      return state
  }
}

//actions
export const changeThemeAC = (mode: boolean) => {
  return ({type: CHANGE_THEME, mode} as const)
}

//types
export type UiActionsType =
  | ReturnType<typeof changeThemeAC>

type InitStateType = {
  mode: boolean;
}