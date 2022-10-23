import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const FontPage: NextPage = () => {
    const router = useRouter()
    const { pid } = router.query

    return(
        <div>
            <h1> FontPage { pid } </h1>
        </div>
    )
}

export default FontPage