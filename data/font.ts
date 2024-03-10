export enum FontStandard { OpenType, TrueType }
export interface Font {
  meta: Meta,
  name: string,
  characterMap: CharacterMap,
  type: FontStandard,
  encoding: string
}
export interface CharacterMap {
  subtables: Subtable[],
  numberOfGlyphs: number
}
export interface Subtable {
  subtableIndex: number,
  characterList: number[]
}
export interface Meta {
  designerUrl: string,
  licenseUrl: string,
  manufacturerUrl: string,
  description: string,
  sampleText: string
}
