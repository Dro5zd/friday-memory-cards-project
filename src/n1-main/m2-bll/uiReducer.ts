const CHANGE_THEME = 'CHANGE-THEME'
const CHANGE_EDIT_MODE = 'CHANGE-EDIT-MODE'

const initState = {
  mode: true,
  editMode: true,
}

export const uiReducer = (state: InitStateType = initState, action: UiActionsType): InitStateType => {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, mode: action.mode}
    case CHANGE_EDIT_MODE:
      return {...state, editMode: action.editMode}

    default:
      return state
  }
}

//actions
export const changeThemeAC = (mode: boolean) => {
  return ({type: CHANGE_THEME, mode} as const)
}
export const changeEditModeAC = (editMode: boolean) => {
  return ({type: CHANGE_EDIT_MODE, editMode} as const)
}

//types
export type UiActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof changeEditModeAC>

type InitStateType = {
  mode: boolean;
  editMode: boolean;
}