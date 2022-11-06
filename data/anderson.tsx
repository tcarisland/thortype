import Font from "../model/font";
import { FontStandard } from "../model/font-standard";

const tcanderson: Font = {
    name: "anderson",
    type: FontStandard.TrueType,
    encoded: "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",
}
export default tcanderson;
