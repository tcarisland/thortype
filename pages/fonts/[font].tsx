import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import FontService from '../../services/font-service'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { Font } from '../../data/font'
import Head from 'next/head'


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
    }
    return (
        <div className="m-2 lg:h-screen-85 md:h-screen sm:h-screen grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-3 bg-slate-200 p-12 justify-center dark:text-slate-900">
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
                <div>
                    <div>
                    <Image className="fontPageImage" id={fontObj?.name} alt={font} src={"../../fonts/" + font + ".jpg"} width="300px" height="200px">
                    </Image>
                    <br></br>
                    <button className="mt-2 mb-2 w-48 h-12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <a className="text-center text-xs md:text-lg" href={"/static/fonts/" + FontService.getFontFilePath(fontObj)} download>
                            Download
                        </a>
                    </button>
                    </div>
                    <div>
                        <p>
                            { fontObj.meta.description }
                        </p>
                        <p>
                            This font is free for personal use.
                        </p>
                        <p>
                            For commercial use, please purchase a license 
                            { fontObj.meta.licenseUrl  &&
                                <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={fontObj.meta.licenseUrl}> here</a> ||
                                <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={ "https://www.creativefabrica.com/product/" + fontObj.name + "/ref/38065"}> here</a>
                            }
                        </p>
                    </div>
                </div>
            }
            {
                fontObj &&
                <div className='col-span-2 '>
                    <textarea className="text-4xl w-full mb-2 bg-slate-100 p-2 pb-32" defaultValue={"TRY ME!\n" + fontObj.meta.sampleText} style={fontStyle}></textarea>
                </div>
            }
        </div>
    )
}

export default FontPage