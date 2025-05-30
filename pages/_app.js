import { RecoilRoot } from 'recoil'
import { NextSeo } from 'next-seo'

import 'styles/index.css'

export default function MyApp({ Component, pageProps }) {
   return (
      <>
         <NextSeo
            title="LLM Evaluation and Monitoring Framework"
            description="..."
            openGraph={{
               url: 'https://nhsengland.github.io/llm-eval-monitor-framework/',
               title: 'LLM Monitoring and Evaluation Framework',
               description: '...',
            }}
            twitter={{
               handle: '@NHSuk',
               site: '@NHSuk',
               cardType: 'summary_large_image',
            }}
         />
         <RecoilRoot>
            <div className="antialiased">
               <Component {...pageProps} />
            </div>
         </RecoilRoot>
      </>
   )
}