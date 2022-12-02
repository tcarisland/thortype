import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import FontService from '../../services/font-service'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { Font } from '../../data/font'


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
        <div className="grid grid-cols-4 bg-slate-200 pt-4 pb-4 text-center dark:text-slate-900">
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

            <div style={{gridColumn: "2 / span 2"}}>
                <div>
                    <Image className="fontPageImage" id={fontObj?.name} alt={font} src={"../../fonts/" + font + ".jpg"} width="300px" height="200px">
                    </Image>
                    {
                        fontObj && 
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
                                 <a href={fontObj.meta.licenseUrl}> here</a> ||
                                 <a href={ "https://www.creativefabrica.com/product/" + fontObj.name + "/ref/38065"}> here</a>
                                }
                            </p>
                        </div>
                    }
                </div>
            {
                fontObj &&
                <div className="text-4xl" style={fontStyle}>
                    { fontObj.meta.sampleText }
                </div>
            }
            {
                fontObj &&
                <button className="ml-auto mr-auto mt-2 w-48 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                    <a className="text-center text-xs md:text-lg" href={"/static/fonts/" + FontService.getFontFilePath(fontObj)} download>
                        Download
                    </a>
                </button>
            }
            </div>
        </div>
    )
}

export default FontPage