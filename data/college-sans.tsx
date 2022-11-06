import Font from "../model/font";
import { FontStandard } from "../model/font-standard";

const tccollegesans: Font = {
    name: "college-sans",
    type: FontStandard.TrueType,
    encoded: "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",
}
export default tccollegesans;
