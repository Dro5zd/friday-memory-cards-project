const CHANGE_THEME = 'CHANGE-THEME'
const PASSWORD_TOGGLE = 'PASSWORD-TOGGLE'
const CHANGE_EDIT_MODE = 'CHANGE-EDIT-MODE'

const initState = {
  mode: true,
  passOn: true,
  editMode: true,
}

export const uiReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, mode: action.mode}
    case PASSWORD_TOGGLE:
      return {...state, passOn: action.passOn}
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
export const passwordToggleAC = (passOn: boolean) => {
  return ({type: PASSWORD_TOGGLE, passOn} as const)
}
export const changeEditModeAC = (editMode: boolean) => {
  return ({type: CHANGE_EDIT_MODE, editMode} as const)
}

//types
type ActionsType =
  | ReturnType<typeof changeThemeAC>
  | ReturnType<typeof passwordToggleAC>
  | ReturnType<typeof changeEditModeAC>

type InitStateType = {
  mode: boolean,
  passOn: boolean,
  editMode: boolean
}