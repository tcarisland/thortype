export enum FontStandard {
  OpenType,
  TrueType
}
export default interface Font {
  name: string,
  type: FontStandard,
  encoding: string
}
