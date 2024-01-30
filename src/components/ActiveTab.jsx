import React, { useState } from 'react'

const ActiveTab = () => {

    const [activeTab, setActiveTab] = useState(1)

    const handleToggle = (index)=>{
        setActiveTab(index)
    }

  return (
    <div className='w-[50%] h-fit mx-auto mt-5 border'>
      <div className='w-full h-fit border-b-[1px] flex bg-gray-200'>
        <span onClick={()=>handleToggle(1)} className={`${activeTab === 1? "bg-white border-blue-800": ""} w-1/3 text-center font-semibold py-3 border-b-2 cursor-pointer`}>Tab 1</span>
        <span onClick={()=>handleToggle(2)} className={`${activeTab === 2? "bg-white border-blue-800": ""} w-1/3 text-center font-semibold py-3 border-b-2 cursor-pointer`}>Tab 2</span>
        <span onClick={()=>handleToggle(3)} className={`${activeTab === 3? "bg-white border-blue-800": ""} w-1/3 text-center font-semibold py-3 border-b-2 cursor-pointer`}>Tab 3</span>
      </div>

      {activeTab ===1 && <div className='py-2 px-3'>
        <h3 className='text-2xl font-bold py-2'>Content 1 </h3>
        <p>In the whimsical realm of technicolor dreams, where dancing unicorns waltz under a sky adorned with shimmering confetti clouds, a peculiar melody resonates through the air. The symphony of giggles from mischievous fairies blends seamlessly with the rhythmic tap dance of pixelated butterflies. As time pirouettes in this surreal dimension, a cascade of neon rain showers down, painting the landscape in hues only found in the palette of the imagination. Meanwhile, a wise old owl perched on a floating bookshelf imparts sagacious advice to curious squirrels embarking on epic quests. This fantastical tapestry of enchantment unfolds in a kaleidoscope of wonder, where the ordinary surrenders to the extraordinary.</p>
      </div>}

      {activeTab ===2 && <div className='py-2 px-3'>
        <h3 className='text-2xl font-bold py-2'>Content 2 </h3>
        <p>Beneath the glistening moonlight, a clandestine meeting of stardust creatures takes place in the secret garden of cosmic serenity. Luminescent fireflies twirl in an intricate ballet, casting ethereal shadows on the petals of intergalactic roses that bloom only once in a millennium. The whispers of ancient constellations echo through the celestial breeze, as celestial beings weave tales of forgotten galaxies in a language known only to the cosmic custodians. A shimmering portal to the astral realms materializes, revealing a cosmic carousel where astral horses with comet tails gallop in perpetual splendor. Time, suspended in the cosmic ballet, unravels its mysteries to those who dare to wander through the astral garden of infinite possibilities.</p>
      </div>}

      {activeTab ===3 && <div className='py-2 px-3'>
        <h3 className='text-2xl font-bold py-2'>Content 3 </h3>
        <p>In the heart of the enchanted forest, where emerald leaves whisper secrets to the wise old trees, a congregation of mystical creatures assembles for a celestial celebration. Moonlit pixies adorn the branches with silken strands of moonbeams, while benevolent tree spirits sway to the rhythm of a breeze orchestrated by the woodland symphony. Unseen elves harmonize with the babbling brook, creating a melody that resonates with the very soul of the enchanted glade. Hidden doorways to parallel realms open sporadically, inviting curious squirrels to embark on whimsical journeys across dimensions. The air is laced with the scent of ancient wisdom, and as the night deepens, the forest becomes a haven for dreams and the ethereal dance of the nocturnal enchantment.</p>
      </div>}


    </div>
  )
}

export default ActiveTab
