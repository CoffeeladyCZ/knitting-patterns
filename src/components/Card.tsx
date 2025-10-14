type Props = {
  name: string,
  image: string,
  gaude_description: string
}

export const Card = ({ pattern }: { pattern: Props }) => {
  return (
  <div
    className="border border-gray-300 rounded-md p-4 flex flex-col items-center w-fit max-w-[320px] cursor-pointer"
    onClick={() => {
      console.log('clicked')
    }}
  >
    <img src={pattern.image} alt="Card" className="w-[320px] h-full object-cover" />
    <p className="text-lg font-bold">{pattern.name}</p>
    <p className="text-sm text-gray-500">Craft: {pattern.gaude_description}</p>
  </div>
  )
}