import { Fragment } from "react"
import { Dialog, Transition, Disclosure } from "@headlessui/react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid"
import { ChevronDownIcon } from "@heroicons/react/outline"
import data from "data/terms.json"
import Badge from "./Badge"

export default function Term({ isOpen, 
   metaDimension, 
   considerationsSetup, 
   monitoringAction, 
   monitoringRationale, 
   monitoringFrequency,
   monitoringUpdate,
   monitoringRetire,
   updateretireUpdate,
   updateretireRetire,
   metaGroup, 
   related,
   onClose, 
   onNext, 
   onPrev, 
   onSelectTermSlug 
}) {

   /**
    * Get related terms from array
    */
   const relatedTerms = related?.length ? related.map(termCode => data.terms.find(term => term.termCode === termCode)) : []

   const getBadgeColor = (metaGroup) => {
      const colors = {
         'Suitability in Context': 'bg-nhsuk-green',
         'Wider Impact': 'bg-nhsuk-dark-blue',
         'Quantifiable Changes': 'bg-nhsuk-pink',
      }
      return colors[metaGroup] || 'text-gray-200'
   }

   return (
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={onClose}
         >
            <div className="min-h-screen">
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <Dialog.Overlay className="fixed bg-gradient-to-b from-blue-500 to-blue-600 inset-0" />
               </Transition.Child>

               <Transition.Child
                  as={Fragment}
                  className="relative z-10 inset-0 px-4 py-4 md:py-8 md:px-8 lg:px-12 max-w-7xl mx-auto"
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-x-5"
                  enterTo="opacity-100 translate-x-0"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-5"
               >
                  <div>

                     {/* Close */}
                     <button
                        type="button"
                        onClick={onClose}
                        className="font-medium underline text-white hover:text-blue-200 duration-100 mb-8 focus:outline-none"
                     >
                        Back to framework
                     </button>

                     {/* Prototype banner */}
                     <div className="bg-nhsuk-yellow px-4 py-2 text-center text-sm font-medium rounded-md mb-2">
                        ⚠️ This is a prototype - this content is draft, does not constitute NHS policy, and is likely to change ⚠️
                     </div>
                     
               <div className="flex justify-between items-center"></div>
                     <div className="flex justify-between space-x-8 items-start">
                        <div>
                           <Dialog.Title as="h2" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">
                              {metaDimension}
                           </Dialog.Title>
                        </div>
                        <div className="flex items-center">
                           <button type="button" className="block p-1 text-white w-10 h-10" onClick={onPrev}>
                              <ArrowLeftIcon />
                           </button>
                           <button type="button" className="block p-1 text-white w-10 h-10" onClick={onNext}>
                              <ArrowRightIcon />
                           </button>
                        </div>
                     </div>

                     <Dialog.Description as="div" className="mt-6 text-xl md:text-2xl text-blue-200">
                        {(metaGroup) && (
                           <div className="flex space-x-2 mb-8">
                              {metaGroup && <Badge className={`${getBadgeColor(metaGroup)}`}>
                              {metaGroup}</Badge>}
                           </div>
                        )}

                        <div className="space-y-6 mt-4">
                           <div id="first-outer-box" className="bg-nhsuk-dark-blue/30 rounded-lg p-6 backdrop-blur-sm">
                           <Disclosure>
                              {({ open }) => (
                                 <>
                                    <Disclosure.Button className="flex items-center text-sm text-blue-200 hover:text-white mt-2">
                                       <h3 className="text-lg font-bold text-white">Considerations</h3>
                                       <ChevronDownIcon
                                          className={`${open ? 'transform rotate-180' : ''} w-4 h-4 mr-1 ml-2`}
                                       />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="mt-2 p-4 bg-blue-300/20 rounded-lg text-blue-100 text-sm flex">
                                       <p className="mb-2">
                                          As a large range of considerations need to be addressed for LLM monitoring, these have been grouped into three categories:<br></br>'Suitability in Context' addresses if the model is continuing to do what it was designed for.<br></br>'Wider Impact' looks at the responsible use of the model.<br></br>'Quantifiable Changes' attempts to group considerations that can be measured through metrics.<br></br> 
                                       </p>
                                    </Disclosure.Panel>
                                 </>
                              )}
                           </Disclosure>
                              <p className="text-base text-white mt-2">Question to ask when setting up monitoring</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: considerationsSetup }}></div>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 mt-4">
                           <div id="second-outer-box" className="bg-nhsuk-dark-blue/30 rounded-lg p-6 backdrop-blur-sm">
                           <Disclosure>
                              {({ open }) => (
                                 <>
                                    <Disclosure.Button className="flex items-center text-sm text-blue-200 hover:text-white mt-2">
                                       <h3 className="text-lg font-bold text-white">Monitoring Plan</h3>
                                       <ChevronDownIcon
                                          className={`${open ? 'transform rotate-180' : ''} w-4 h-4 mr-1 ml-2`}
                                       />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="mt-2 p-4 bg-blue-300/20 rounded-lg text-blue-100 text-sm flex">
                                       <p className="mb-2">
                                          This section of the framework aims to support the creation of a monitoring plan that focusses on when action needs to be taken.
                                          <br></br>The first two sections ('Suitability in Context' and 'Wider Impact') are qualitative in nature and require manual review points with an MDT discussion.
                                          <br></br>The third section ('Quantifiable Changes') is quantitative in nature and may suit continuous or regular automatic monitoring through metrics.
                                          <br></br>Each consideration has an action to undertake at the defined monitoring frequency.
                                          <br></br>Decisions to act are defined based on the information across the whole consideration category 
                                       </p>
                                    </Disclosure.Panel>
                                 </>
                              )}
                           </Disclosure>
                              <p className="text-base text-white mt-2">Action at monitoring time</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: monitoringAction }}></div>
                              </div>

                              <p className="text-base text-white mt-2">Rationale</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: monitoringRationale }}></div>
                              </div>

                              <p className="text-base text-white mt-2">Frequency</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: monitoringFrequency }}></div>
                              </div>

                              <p className="text-base text-white mt-2">When to Update</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: monitoringUpdate }}></div>
                              </div>

                              <p className="text-base text-white mt-2">When to Retire</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: monitoringRetire }}></div>
                              </div>
                           </div>   
                        </div>

                        <div className="space-y-6 mt-4">
                           <div id="third-outer-box" className="bg-nhsuk-dark-blue/30 rounded-lg p-6 backdrop-blur-sm">
                           <Disclosure>
                              {({ open }) => (
                                 <>
                                    <Disclosure.Button className="flex items-center text-sm text-blue-200 hover:text-white mt-2">
                                       <h3 className="text-lg font-bold text-white">Update/Retirement Plan</h3>
                                       <ChevronDownIcon
                                          className={`${open ? 'transform rotate-180' : ''} w-4 h-4 mr-1 ml-2`}
                                       />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="mt-2 p-4 bg-blue-300/20 rounded-lg text-blue-100 text-sm flex">
                                       <p className="mb-2">
                                          Once a decision to act has been made by monitoring all the considerations previously, an update and retirement plan need to be ready to put into action. These plans cut across all the consideration categories.
                                       </p>
                                    </Disclosure.Panel>
                                 </>
                              )}
                           </Disclosure>
                              <p className="text-base text-white mt-2">How to Update</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: updateretireUpdate }}></div>
                              </div>

                              <p id="first-subtitle" className="text-base text-white mt-2">How to Retire</p>
                              <div className="text-base">
                                 <div id="term-content" dangerouslySetInnerHTML={{ __html: updateretireRetire }}></div>
                              </div>
                           </div>
                        </div>
                     </Dialog.Description>

                     {/* Related terms */}
                     {
                        relatedTerms?.length > 0 && (
                           <div className="space-y-2 font-mono mt-24">
                              <h3 className="text-white font-bold">Related terms</h3>
                              {relatedTerms.map((term, index) => (
                                 <button
                                    key={term.metaDimension}
                                    type="button"
                                    onClick={() => onSelectTermSlug(term.termCode)}
                                    className="block text-blue-200 hover:text-white duration-100"
                                 >
                                    {term.metaDimension}
                                 </button>

                              ))}
                           </div>
                        )
                     }

                  </div>
               </Transition.Child>
            </div>
         </Dialog>
      </Transition>
   )
}