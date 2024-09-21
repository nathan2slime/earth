import axios from 'axios'
import type { NextPage } from 'next'
import { format } from 'date-fns'

import { env } from '~/env'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Particles } from '~/components/magicui/particles'
import { Feed } from '~/components/core/feed'

import type { NaturalItem } from '~/types'

export const revalidate = 13

const baseAssetsDomain = 'https://api.nasa.gov/EPIC/archive/natural'
const baseApiDomain = 'https://api.nasa.gov/EPIC/api/natural'

const Home: NextPage = async () => {
  const { data, status } = await axios.get<NaturalItem[]>(baseApiDomain + '?api_key='.concat(env.NASA_API_KEY))

  if (status == 200) {
    const items = data.map((e) => {
      const date = new Date(e.date)

      const image = `${baseAssetsDomain}/${format(date, 'yyyy')}/${format(date, 'MM')}/${format(date, 'dd')}/png/${e.image}.png?api_key=${env.NASA_API_KEY}`

      return {
        date,
        image,
        coords: e.coords,
      }
    })

    return (
      <ScrollArea className="relative h-screen w-screen overflow-y-auto bg-ctp-crust">
        <Particles
          className="pointer-events-none fixed z-0 h-full w-full"
          quantity={100}
          ease={80}
          color={'#ffffff'}
          refresh
        />

        <div className="z-10 h-screen w-screen p-4 md:p-8">
          <Feed images={items} />
        </div>
      </ScrollArea>
    )
  }

  return <div className="h-full w-full" />
}

export default Home
