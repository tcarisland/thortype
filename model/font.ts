import { FontStandard } from "./font-standard"

export default interface Font {
    name: string,
    type: FontStandard,
    encoded: string,
}