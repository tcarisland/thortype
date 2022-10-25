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
        <div className="fontPageContainer">
            <Image alt={fontName} src={"../../fonts/" + fontName + ".jpg"} width="600px" height="450px">
            </Image>
            { font !== undefined &&
                <p>
                    <a href={ "/static/fonts/" + FontService.getFontFilePath(font)} download>
                        { FontService.getFontFilePath(font) }
                    </a>
                </p>
            }
        </div>
    )
}

export default FontPage