import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import FontService from '../../services/font-service'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { Font } from '../../data/font'
import Head from 'next/head'
import TextPreview from '../../components/text-preview'
import TextPreviewTopMenu from '../../components/text-preview-top-menu'
import BottomNavbar from "../../components/bottom-navbar";
import NavLink from "../../model/nav-link";

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

const pages: NavLink[] = [
  {
    name: "Try It",
    link: "/tryit"
  },
  {
    name: "Character List",
    link: "/characters"
  }
]

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
                        src: url("${fontObj.dataUri}");
                    }
                `}
                </style>
            }
            {
                fontObj &&
                <div>
                  <TextPreview  fontName={fontObj.name} font={fontObj} fontFilePath={"/static/fonts/" + FontService.getFontFilePath(fontObj)}></TextPreview>
                </div>

            }
            <BottomNavbar pages={[{name: "Character List", link: "/characterlist/" + font}]}></BottomNavbar>
        </div>
    )
}

export default FontPage
