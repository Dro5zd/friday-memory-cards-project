import React, {useEffect} from 'react'
import s from './packsList.module.css'
import {getCardPackTC} from '../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {changePacksCurrentPageAC} from '../../../m2-bll/appReducer';
import {PacksContainer} from './p1-packs/PackContainer/PacksContainer';
import {PaginationNew} from '../../common/c11-Pagination/PaginationNew';
import {PackSettings} from "./p1-packs/PackSettings/PackSettings";
import {PackHeader} from "./p1-packs/PackHeader/PackHeader";
import ServerErrors from "../../common/c0-ErrorsBlock/ServerErrors";

export const PacksList = () => {
  const pack = useTypedSelector(state => state.packs)
  const sortUserId = useTypedSelector(state => state.sort.user_id)
  const packNameValue = useTypedSelector(state => state.sort.packName)
  const requestPackMinValue = useTypedSelector(state => state.sort.packMinValue)
  const requestPackMaxValue = useTypedSelector(state => state.sort.packMaxValue)
  const dispatch = useTypedDispatch()

    const serverErrors = useTypedSelector(state => state.app.errors)
  // const [packName, setPackName] = useState('')

  useEffect(() => {
    dispatch(getCardPackTC())
  }, [sortUserId, packNameValue, requestPackMinValue, requestPackMaxValue])



  // const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
  //     setValue1(nums[0])
  //     setValue2(nums[1])
  // }

  // const createPackButtonHandler = (data: CreatePackDataType) => {
  //   dispatch(changePacksCurrentPageAC(1))
  //   dispatch(postPacksTC(data))
  // }
  // const showMyPacksHandler = () => {
  //     dispatch(setMyAllFilterAC(userId))
  //     dispatch(setRangeValueAC(0, value2))
  // }
  // const showAllPacksHandler = () => {
  //     dispatch(setMyAllFilterAC(''))
  // }


  const changeCurrentPackPage = (page: number) => {
    dispatch(changePacksCurrentPageAC(page))
    dispatch(getCardPackTC())
  }

  // const onMouseUpSetFilter = () => {
  //     dispatch(setRangeValueAC(value1, value2))
  //     dispatch(getCardPackTC())
  // }

  // const debounceHandler = (text: string) => {
  //   dispatch(setPackNameValue(text))
  //   setPackName(text)
  //   // urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
  // };

  return (
    <div className={s.container}>
      <div className={s.components}>
        <PackHeader/>
          {serverErrors && <ServerErrors errors={serverErrors}/>}
        <div className={s.wrapper}>
          <PackSettings maxCardsCount={pack.maxCardsCount} minCardsCount={pack.minCardsCount}/>
          <PacksContainer/>
        </div>
        <PaginationNew
          totalCount={pack.cardPacksTotalCount}
          pageSize={pack.pageCount}
          currentPage={pack.page}
          onPageChange={changeCurrentPackPage}
          siblingCount={3}
        />
      </div>
    </div>
  )
}