import { describe, expect, it } from 'vitest'
import { getParams, getOrder, getDirection, extractCardName } from './search'

describe('getParams', () => {
  it('returns null if q is missing', () => {
    const params = new URLSearchParams('')
    expect(getParams(params)).toBeNull()
  })

  it('parses all fields from query string', () => {
    const params = new URLSearchParams(
      'q=steelswarm operator order:price direction:ascending o:draw o:discard e:eoe t:creature t:artifact'
    )
    const result = getParams(params)

    expect(result).toMatchObject({
      cardName: ['steelswarm', 'operator'],
      q: 'steelswarm operator order:price direction:ascending o:draw o:discard e:eoe t:creature t:artifact',
      order: 'price',
      direction: 'ascending',
      o: ['draw', 'discard'],
      e: 'eoe',
      t: ['creature', 'artifact'],
    })
  })
})

describe('getOrder', () => {
  it('returns correct order', () => {
    expect(getOrder('order:name')).toBe('name')
    expect(getOrder('order:price')).toBe('price')
    expect(getOrder('')).toBeNull()
    expect(getOrder('foo')).toBeNull()
  })
})

describe('getDirection', () => {
  it('returns correct direction', () => {
    expect(getDirection('direction:ascending')).toBe('ascending')
    expect(getDirection('direction:descending')).toBe('descending')
    expect(getDirection('')).toBeNull()
    expect(getDirection('foo')).toBeNull()
  })
})

describe('extractCardName', () => {
  it('returns correct card name', () => {
    expect(extractCardName('steelswarm operator order:price direction:ascending')).toEqual([
      'steelswarm',
      'operator',
    ])
    expect(extractCardName('order:price direction:ascending steelswarm')).toEqual(['steelswarm'])
    expect(extractCardName('order:price direction:ascending steelswarm operator')).toEqual([
      'steelswarm',
      'operator',
    ])
    expect(extractCardName('order:price steelswarm direction:ascending')).toEqual(['steelswarm'])
    expect(extractCardName('order:price steelswarm operator direction:ascending')).toEqual([
      'steelswarm',
      'operator',
    ])
    expect(extractCardName('order:price direction:ascending')).toBeNull()
    expect(extractCardName('')).toBeNull()
  })
})
