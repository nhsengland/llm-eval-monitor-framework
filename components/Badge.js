export default function Badge({ children, className }) {
   return (
      <div className={`inline-flex w-48 justify-center px-2 py-1 rounded text-sm bg-opacity-80 ${className} space-x-2`}>
         <span className="text-white">{children}</span>
      </div>
   )
}    /**
    * Border?
    */