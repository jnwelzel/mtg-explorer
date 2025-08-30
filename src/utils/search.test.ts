import { describe, expect, it } from 'vitest'
import {
  getParams,
  getOrder,
  getDirection,
  extractCardName,
  encodeParams,
  extractColors,
} from './search'
import type { SortingDirection, SortingOrder } from '../types/search'

describe('getParams', () => {
  it('returns null if q is missing', () => {
    const params = new URLSearchParams('')
    expect(getParams(params)).toBeNull()
  })

  it('parses all fields from query string', () => {
    const params = new URLSearchParams(
      'q=steelswarm operator order:price direction:ascending o:draw o:discard e:eoe t:creature t:artifact c:wr'
    )
    const result = getParams(params)

    expect(result).toMatchObject({
      cardName: ['steelswarm', 'operator'],
      q: 'steelswarm operator order:price direction:ascending o:draw o:discard e:eoe t:creature t:artifact c:wr',
      order: 'price',
      direction: 'ascending',
      o: ['draw', 'discard'],
      e: 'eoe',
      t: ['creature', 'artifact'],
      c: ['c:', 'wr'],
    })
  })

  it('returns empty name when no name value provided', () => {
    const params = new URLSearchParams(
      'q=order:price direction:ascending o:draw o:discard e:eoe t:creature t:artifact c:wr'
    )
    const result = getParams(params)

    expect(result).toMatchObject({
      cardName: null,
      q: 'order:price direction:ascending o:draw o:discard e:eoe t:creature t:artifact c:wr',
      order: 'price',
      direction: 'ascending',
      o: ['draw', 'discard'],
      e: 'eoe',
      t: ['creature', 'artifact'],
      c: ['c:', 'wr'],
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

describe('encodeParams', () => {
  it('correctly encodes all fields into a query string', () => {
    const params = {
      q: 'steelswarm operator',
      cardName: ['steelswarm', 'operator'],
      order: 'name' as SortingOrder,
      direction: 'ascending' as SortingDirection,
      o: ['artifact', 'spell'],
      e: 'eoe',
      t: ['artifact', 'creature'],
      c: ['c:', 'u'] as [string, string],
    }
    const result = encodeParams(params)
    // Result decodes to: "q=steelswarm+operator+order:name+direction:ascending+o:artifact+o:spell+e:eoe+t:artifact+t:creature+c:u"
    expect(result.toString()).toBe(
      'q=steelswarm+operator+order%3Aname+direction%3Aascending+o%3Aartifact+o%3Aspell+e%3Aeoe+t%3Aartifact+t%3Acreature+c%3Au'
    )
  })

  it('does not encode cardName when it is null', () => {
    const params = {
      q: 'order:price direction:ascending o:draw o:discard e:eoe t:creature t:artifact c:wr',
      cardName: null,
      order: 'price' as SortingOrder,
      direction: 'ascending' as SortingDirection,
      o: ['draw', 'discard'],
      e: 'eoe',
      t: ['creature', 'artifact'],
      c: ['c:', 'wr'] as [string, string],
    }
    const result = encodeParams(params)
    // Result decodes to: "q=order:price+direction:ascending+o:draw+o:discard+e:eoe+t:creature+t:artifact+c:wr"
    expect(result.toString()).toBe(
      'q=order%3Aprice+direction%3Aascending+o%3Adraw+o%3Adiscard+e%3Aeoe+t%3Acreature+t%3Aartifact+c%3Awr'
    )
  })
})

describe('extractColors', () => {
  it('extracts color comparisons from query string', () => {
    expect(
      extractColors('war order:name direction:ascending o:foo o:bar t:ayy t:lmao c:wr')
    ).toEqual(['c:', 'wr'])
    expect(
      extractColors('war order:name direction:ascending o:foo o:bar t:ayy t:lmao c<=wr')
    ).toEqual(['c<=', 'wr'])
    expect(
      extractColors('war order:name direction:ascending o:foo o:bar t:ayy t:lmao c=wr')
    ).toEqual(['c=', 'wr'])
    expect(extractColors('')).toEqual(null)
  })
})
