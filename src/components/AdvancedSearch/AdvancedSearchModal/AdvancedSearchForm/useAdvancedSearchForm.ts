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
  colorComparison: string
}

interface useAdvancedSearchFormProps {
  onSubmit?: () => void
}

type UseAdvancedSearchFormResult = {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
  handleSubmit: () => void
  shouldDisableColorInput: (color: string) => boolean
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
    colors: paramValues?.c ? (paramValues.c[1] ?? '') : '',
    colorComparison: paramValues?.c ? (paramValues.c[0] ?? 'c:') : 'c:',
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
      c: formState.colors ? [formState.colorComparison, formState.colors] : null,
    }
    setSearchParams(encodeParams(scryfallParams))
    if (onSubmit) {
      onSubmit()
    }
  }

  const shouldDisableColorInput = (color: string): boolean => {
    if (!formState.colors) return false

    if (color === 'c') {
      return formState.colors.split('').some(c => c !== 'c')
    }
    return color !== 'c' && formState.colors.includes('c')
  }

  return { formState, setFormState, handleSubmit, shouldDisableColorInput }
}
