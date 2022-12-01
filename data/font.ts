export enum FontStandard {
  OpenType,
  TrueType
}
export default interface Font {
  name: string,
  description: string,
  type: FontStandard,
  encoding: string
}
