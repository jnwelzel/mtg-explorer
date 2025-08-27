import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { encodeParams, getParams } from '../../../../utils'
import type { ScryfallSearchParams, SortingDirection, SortingOrder } from '../../../../types/search'

interface FormState {
  cardName: string
  oracleText: string
  cardType: string
  set: string
  order: SortingOrder
  direction: SortingDirection
  colors: string
}

interface useAdvancedSearchFormProps {
  onSubmit?: () => void
}

type UseAdvancedSearchFormResult = {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
  handleSubmit: () => void
}

export const useAdvancedSearchForm = ({
  onSubmit,
}: useAdvancedSearchFormProps): UseAdvancedSearchFormResult => {
  const [urlParams, setSearchParams] = useSearchParams()
  const paramValues = getParams(urlParams)
  const [formState, setFormState] = useState<FormState>({
    cardName: paramValues?.cardName?.join(' ') ?? '',
    oracleText: paramValues?.o?.join(' ') ?? '',
    cardType: paramValues?.t?.join(' ') ?? '',
    set: paramValues?.e ?? '',
    order: paramValues?.order ?? 'name',
    direction: paramValues?.direction ?? 'ascending',
    colors: paramValues?.c ?? '',
  })

  const handleSubmit = () => {
    const scryfallParams: ScryfallSearchParams = {
      cardName: formState.cardName ? formState.cardName.trim().split(' ') : null,
      o: formState.oracleText ? formState.oracleText.trim().split(' ') : null,
      t: formState.cardType ? formState.cardType.trim().split(' ') : null,
      e: formState.set.trim() || null,
      order: formState.order,
      direction: formState.direction,
      q: null,
      c: formState.colors || null,
    }
    setSearchParams(encodeParams(scryfallParams))
    if (onSubmit) {
      onSubmit()
    }
  }

  return { formState, setFormState, handleSubmit }
}
