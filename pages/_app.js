import { RecoilRoot } from 'recoil'
import { NextSeo } from 'next-seo'

import 'styles/index.css'

export default function MyApp({ Component, pageProps }) {
   return (
      <>
         <NextSeo
            title="LLM Evaluation and Monitoring Framework"
            description="A draft framework for evaluating and monitoring large language models (LLMs) in healthcare applications."
            openGraph={{
               url: 'https://nhsengland.github.io/llm-eval-monitor-framework/',
               title: 'LLM Monitoring and Evaluation Framework',
               description: 'A draft framework for evaluating and monitoring large language models (LLMs) in healthcare applications.',
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