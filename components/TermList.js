import { motion } from "framer-motion"
import { useState } from "react"
import Badge from "./Badge"

export default function TermList({ terms, isShowingTerm, onSelectTermSlug }) {

   const [firstGradientOpacity, setFirstGradientOpacity] = useState(0)

   const getBadgeColor = (metaGroup) => {
      const colors = {
         'Suitability in Context': 'bg-nhsuk-green',
         'Wider Impact': 'bg-nhsuk-dark-blue',
         'Quantifiable Changes': 'bg-nhsuk-pink',
      }
      return colors[metaGroup] || 'text-gray-200'
   }

   return (
      <main className="relative overflow-y-hidden flex-1 flex">

         {/* Gradients */}
         <motion.div animate={{ opacity: firstGradientOpacity }} transition={{ duration: .2 }} className="z-10 absolute left-0 top-0 w-full h-8 lg:h-12 bg-gradient-to-b from-blue-500 pointer-events-none"></motion.div>
         <div className="z-10 absolute left-0 bottom-0 w-full h-8 lg:h-12 bg-gradient-to-t from-blue-600 pointer-events-none"></div>

         {/* List */}
         <div onScroll={(e) => setFirstGradientOpacity(Math.min(1, e.target.scrollTop))} className="flex-1 overflow-y-auto scrollbar px-4 pb-8 md:px-8 lg:px-12 lg:pb-12 bg-gradient-to-b from-blue-500 to-blue-600">
            <div className={`ease-out flex flex-col items-start space-y-4 duration-300 ${isShowingTerm ? '-translate-x-5 opacity-0' : 'translate-x-0 opacity-100'}`}>
               {terms.length == 0 && <p className="text-blue-200 hover:text-white text-lg md:text-2xl font-mono duration-100 text-left">No results found.</p>}
               {terms.map((term, index) => (
                  <button
                     key={term.metaDimension + index}
                     type="button"
                     onClick={() => onSelectTermSlug(term.termCode)}
                     className="text-blue-200 hover:text-white text-lg md:text-2xl font-mono duration-100 text-left flex items-center space-x-4"
                  >
                     <span className="ml-auto">{term.metaDimension}</span>
                     {term.metaGroup && <Badge className={`${getBadgeColor(term.metaGroup)}`}>
                     {term.metaGroup}</Badge>}

                  </button>
               ))}
            </div>
         </div>

      </main>
   )
}
