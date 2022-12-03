import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import FontService from '../../services/font-service'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { Font } from '../../data/font'
import Head from 'next/head'
import TextPreview from '../../components/text-preview'

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

    const fontObj: Font | undefined = FontService.findFont(font);

    return (
        <div className="m-2 lg:h-screen-85 md:h-screen sm:h-screen grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-4 bg-slate-200 p-12 justify-center dark:text-slate-900">
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
                <div className='mr-8'>
                    <div>
                        <Image className="fontPageImage" id={fontObj?.name} alt={font} src={"../../fonts/" + font + ".jpg"} width="300px" height="200px">
                        </Image>
                    </div>
                    <div >
                        <p>
                            { fontObj.meta.description }
                        </p>
                        <br>
                        </br>
                        <p>
                            This font is free for personal use.
                        </p>
                        <br>
                        </br>
                        <p>
                            For commercial use, please purchase a license 
                            { fontObj.meta.licenseUrl  &&
                                <a className='font-bold' href={ fontObj.meta.licenseUrl }> here</a> ||
                                <a className='font-bold' href={ "https://www.creativefabrica.com/designer/thorchristopherarisland/ref/38065" }> here</a>
                            }
                        </p>
                    </div>
                </div>
            }
            {
                fontObj &&
                <div className='lg:col-start-2 lg:col-span-3'>
                    <TextPreview  fontName={fontObj.name} font={fontObj} fontFilePath={"/static/fonts/" + FontService.getFontFilePath(fontObj)}></TextPreview>
                </div>
                    
            }
        </div>
    )
}

export default FontPage