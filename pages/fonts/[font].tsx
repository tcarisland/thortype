import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import FontService from '../../services/font-service'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { Font } from '../../data/font'
import Head from 'next/head'
import TextPreview from '../../components/text-preview'
import TextPreviewTopMenu from '../../components/text-preview-top-menu'

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
    const path = router.asPath

    const fontObj: Font | undefined = FontService.findFont(font);

    return (
        <div className="m-1 p-4 justify-center dark:text-slate-900 text-slate-900">
            <Head>
                <title>
                    { (fontObj && fontObj.name.charAt(0).toUpperCase() + fontObj.name.slice(1)) || "ThorType" }
                </title>
            </Head>
            {
                fontObj &&
                <style jsx>{`
                    @font-face {
                        font-display: block;
                        font-family: "tc-${fontObj.name}";
                        src: url("${fontObj.encoding}");
                    }
                `}
                </style>
            }
            {
                fontObj &&
                <div className='grid'>
                  <TextPreview  fontName={fontObj.name} font={fontObj} fontFilePath={"/static/fonts/" + FontService.getFontFilePath(fontObj)}></TextPreview>
                  <TextPreviewTopMenu fontName={font} location={path}></TextPreviewTopMenu>
                </div>

            }
        </div>
    )
}

export default FontPage
