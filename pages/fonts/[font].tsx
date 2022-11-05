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
        paths: FontService.fontList.map(fontName => { return { params: { font: fontName } } }),
        fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {}, // will be passed to the page component as props
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
    return (
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
                <button className="ml-auto mr-auto w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                    <a className="text-center" href={"/static/fonts/" + FontService.getFontFilePath(fontObj)} download>
                        Download
                    </a>
                </button>
            }

        </div>
    )
}

export default FontPage