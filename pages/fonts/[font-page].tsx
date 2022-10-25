import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FontStandard } from '../../model/font-standard'
import FontService from '../../services/font-service'
import Font from '../../model/font'

const FontPage: NextPage = () => {
    const router = useRouter()

    const fontName = router.asPath.replace(/\/fonts\/(.*?)\//g, "$1");

    const font: Font | undefined = FontService.findFont(fontName);

    return(
        <div>
            <Image alt={fontName} src={"../../fonts/" + fontName + ".jpg"} width="600px" height="450px">
            </Image>
            {
                font !== undefined &&
                <div>
                    { FontService.getFontFilePath(font) }
                </div>
            }
        </div>
    )
}

export default FontPage