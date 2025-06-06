import { useRecoilValue } from "recoil";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, ChevronDownIcon } from "@heroicons/react/outline"
import { frameworkVersionState } from "../atoms/framework"

const SearchBox = ({ searchTerm, setSearchTerm, searchRef }) => (
   <div className="relative font-mono">
      <input
         ref={searchRef}
         type="text"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         className="w-full py-3 px-4 peer bg-white bg-opacity-10 border border-blue-400 placeholder:text-blue-200 text-blue-50 rounded-md text-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
         placeholder="Search dimensions"
      />
      {!searchTerm && (
         <div className="hidden peer-focus:hidden lg:flex justify-center items-center absolute right-0 top-0 p-2 border border-transparent">
            <div className="flex-1 px-2 py-1 bg-white rounded bg-opacity-10 text-sm text-blue-200">
               /
            </div>
         </div>
      )}
   </div>
)

export default function Header({ searchTerm, setSearchTerm, searchRef, VersionDisplay }) {
   const version = useRecoilValue(frameworkVersionState);

   return (
      <Disclosure as="nav" className="px-4 py-4 md:py-8 md:px-8 lg:px-12 bg-blue-500">

         {({ open }) => (
            <>
               {/* Prototype banner */}
               <div className="bg-nhsuk-yellow px-4 py-2 text-center text-sm font-medium rounded-md mb-2">
                  ⚠️ This is a prototype - this content is draft, does not constitute NHS policy, and is likely to change ⚠️
               </div>
               <div className="flex justify-between items-center">

                  {/* Logo / headline */}
                  <div className="flex-row">
                     <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-white font-mono">Draft LLM Evaluation and Monitoring Framework v{version}</h1>
                     </div>
                  </div>

                  {/* Current Search */}
                  {searchTerm && (
                     <div className="hidden lg:flex text-sm text-blue-200 font-medium font-mono max-w-md text-ellipsis overflow-hidden whitespace-pre">
                        Searching for: <span className="text-blue-100">{searchTerm}</span>
                     </div>
                  )}

                  {/* Desktop search */}
                  <div className="hidden sm:ml-6 sm:flex">
                     <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchRef={searchRef} />
                  </div>

                  {/* Mobile menu toggle */}
                  <div className="flex items-center sm:hidden">
                     {/* Mobile menu button */}
                     <Disclosure.Button className="bg-white bg-opacity-10 inline-flex items-center justify-center p-2 rounded-md text-blue-50 hover:text-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                           <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                           <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                     </Disclosure.Button>
                  </div>

               </div>

               {/* Mobile menu */}
               <Disclosure.Panel className="sm:hidden pt-4">
                  <div className="py-3">
                     <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchRef={searchRef} />
                  </div>
               </Disclosure.Panel>

               <Disclosure defaultOpen={true}>
                        {({ open }) => (
                           <>
                              <Disclosure.Button className="flex items-center text-sm text-blue-200 hover:text-white mt-2">
                                 <h3 className="text-base text-white">More information on the framework</h3>
                                 <ChevronDownIcon
                                    className={`${open ? 'transform rotate-180' : ''} w-4 h-4 mr-1 ml-2`}
                                 />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 p-4 bg-blue-300/20 rounded-lg text-white text-sm flex leading-relaxed">
                                 <p className="mb-2 space-y-3">
                                    This framework presents a structured approach to evaluating and monitoring in the responsible use of Large Language Models (LLMs) in healthcare settings.
                                    <br></br>It is organised around three key groups:
                                    <ul className="list-disc pl-6 space-y-1">
                                       <li><strong>Suitability in Context: </strong>addresses if the model is continuing to do what it was designed for.</li>
                                       <li><strong>Wider Impact: </strong>looks at the responsible use of the model.</li>
                                       <li><strong>Quantifiable Changes: </strong>attempts to group considerations that can be measured through metrics.</li>
                                    </ul>
                                    <br></br>Each group contains a set of dimensions that cover different aspects of LLM performance. The emphasis across the whole framework is on the practical implications i.e. how often to review each dimension, what decisions they inform, and what actions they drive.
                                 </p>
                              </Disclosure.Panel>
                           </>
                        )}
                     </Disclosure>

            </>
         )}
      </Disclosure>
   )
}
