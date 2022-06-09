import {TypedDispatch} from "../m2-bll/store";
import {clearErrorsAC, setErrorsAC} from "../m2-bll/appReducer";

export const serverErrorHandler = (error: string, dispatch: TypedDispatch) => {
    dispatch(setErrorsAC(error));
    setTimeout(() => {
        dispatch(clearErrorsAC())
    }, 2000)
};