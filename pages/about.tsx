import type { NextPage } from 'next';
import Image from 'next/image';
import FontService from '../services/font-service';

const About: NextPage = () => {
    return(
        <div className='grid grid-cols-6 min-h-screen dark:text-slate-900 dark:bg-slate-200'>
            <div style={{gridColumn: "1 / span 6"}} className="h-full">
                <div className='p-4 grid grid-cols-8'>
                    <div style={{gridColumn: "1 / span 7"}}>
                        <h2 className='text-xl'>
                            Hi, and welcome to ThorType.
                        </h2>
                        <br></br>
                        <p>
                            My name is Thor Arisland and I&apos;m a type designer from Oslo, Norway.
                            I currently live in Sweden where I work as a Software Developer by day.
                        </p>
                        <p>
                            Over the years I&apos;ve created a portfolio of over { FontService.fontList.length } fonts in various different styles.
                        </p>
                        <br></br>
                        <p>
                            My fonts are all free for personal use, with commercial licences available on <a href="http://www.creativefabrica.com/designer/thorchristopherarisland/ref/3806">Creative Fabrica</a>.                            
                        </p>
                        <p>
                            You can download most of my fonts on <a href="https://www.dafont.com/thor-christopher-arisland.d6824">DaFont here</a>, but if you want a demonstration of colorfont or variable font features, you can test it with compatible browsers on this site.
                        </p>
                        <br></br>
                        <p>
                            For feedback, bug reports and improvement suggestions for my work, feel free to contact me on the contact page <a href="../contact">here</a>.
                        </p>
                    </div>
                    <div style={{gridColumn: "8 / span 1"}}>
                    <Image src={"../images/prof-500x500.jpeg"} alt="profile" width={500} height={500}></Image>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
