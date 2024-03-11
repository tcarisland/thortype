import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TextPreview from '../../components/text-preview';
import FontService from '../../services/font-service';
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { Font } from '../../data/font'
import CharacterList from "../../components/character-list";
import TextPreviewTopMenu from '../../components/text-preview-top-menu';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: FontService.fontList.map(fontName => { return { params: { characterlistfont: fontName } } }),
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}, // will be passed to the page component as props
  }
}
const FontCharacterListPage: NextPage = () => {

  const router = useRouter()

  const font = router.asPath.replace(/\/characterlist\/(.*?)\//g, "$1");
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
      <div className="grid">
        {
          fontObj &&
          <CharacterList fontName={fontObj.name} font={fontObj} fontFilePath={"/static/fonts/" + FontService.getFontFilePath(fontObj)} />
        }
          <TextPreviewTopMenu fontName={font} location={path}></TextPreviewTopMenu>
      </div>
    </div>
    )
}

export default FontCharacterListPage;
