
function Skeleton() {
  return [1,2,3,4].map((item, index) => (
            <div
              key={index}
              className="h-[250px] w-full bg-slate-200 animate-pulse rounded-lg"
            />
  ))}

export default Skeleton