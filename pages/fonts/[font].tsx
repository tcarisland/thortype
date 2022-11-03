import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FontStandard } from '../../model/font-standard'
import FontService from '../../services/font-service'
import Font from '../../model/font'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'


export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: FontService.fontList.map(fontName => {return { params: {font: fontName}}}),
      fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: { }, // will be passed to the page component as props
    }
  }
  

const FontPage: NextPage = () => {
    const router = useRouter()

    const font = router.asPath.replace(/\/fonts\/(.*?)\//g, "$1");
    const fontCssName = "tc-" + router.asPath.replace(/\/fonts\/(.*?)\//g, "$1");

    const fontObj: Font | undefined = FontService.findFont(font);
    const fontStyle = {
        fontFamily: fontCssName,
        fontSize: "24pt"
    }
    return(
        <div className="fontPageContainer">
            <Image className="fontPageImage" alt={font} src={"../../fonts/" + font + ".jpg"} width="300px" height="200px">
            </Image>
            {
                fontObj &&
                <div style={fontStyle}>
                        THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
                </div>
            }
            {
                fontObj &&
                <div style={fontStyle}>
                        the quick brown fox jumps over the lazy dog
                </div>        
            }
            {
                fontObj &&
                <div style={fontStyle}>
                    0123456789
                </div>
            }
            {
                fontObj &&
                <a href={ "/static/fonts/" + FontService.getFontFilePath(fontObj)} download>
                    Click here to download { fontObj.name }
                </a>
            }

        </div>
    )
}

export default FontPage