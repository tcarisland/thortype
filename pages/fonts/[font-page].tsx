import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

const FontPage: NextPage = () => {
    const router = useRouter()

    const fontName = router.asPath.replace(/\/fonts\/(.*?)\//g, "$1");

    return(
        <div>
            <Image alt={fontName} src={"../../fonts/" + fontName + ".jpg"} width="600px" height="450px">
            </Image>
        </div>
    )
}

export default FontPage