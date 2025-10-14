export const Card = () => {
  const testPattern = {
    name: 'Test Pattern',
    image: 'https://images4-f-cdn.ravelrycache.com/uploads/BebaBlanket/725912127/webp/IMG_20200531_155343_small_small2.webp#jpg',
    gaude_description: '10 stitches = 4 inches',
  }

  return (
  <div
    className="border border-gray-300 rounded-md p-4 flex flex-col items-center w-fit max-w-[320px] cursor-pointer"
    onClick={() => {
      console.log('clicked')
    }}
  >
    <img src={testPattern.image} alt="Card" className="w-[320px] h-full object-cover" />
    <p className="text-lg font-bold">{testPattern.name}</p>
    <p className="text-sm text-gray-500">Craft: {testPattern.gaude_description}</p>
  </div>
  )
}