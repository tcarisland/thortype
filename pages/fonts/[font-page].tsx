import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FontStandard } from '../../model/font-standard'
import FontService from '../../services/font-service'
import Font from '../../model/font'

const FontPage: NextPage = () => {
    const router = useRouter()

    const fontName = router.asPath.replace(/\/fonts\/(.*?)\//g, "$1");
    const fontCssName = "tc-" + router.asPath.replace(/\/fonts\/(.*?)\//g, "$1");

    const font: Font | undefined = FontService.findFont(fontName);
    const fontStyle = {
        fontFamily: fontCssName,
        fontSize: "24pt"
    }
    return(
        <div className="fontPageContainer">
            <Image alt={fontName} src={"../../fonts/" + fontName + ".jpg"} width="600px" height="450px">
            </Image>
            { font !== undefined &&
                <p>
                    <a href={ "/static/fonts/" + FontService.getFontFilePath(font)} download>
                        Click here to download { font.name }
                    </a>
                    <h3>
                        Preview:
                    </h3>
                    <div style={fontStyle}>
                        <p>
                            THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
                        </p>
                        <p>
                            the quick brown fox jumps over the lazy dog
                        </p>
                        <p>
                            0123456789
                        </p>
                    </div>
                </p>
            }
        </div>
    )
}

export default FontPage