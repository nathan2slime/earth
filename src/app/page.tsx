import axios from 'axios';
import type { NextPage } from 'next';
import { format } from 'date-fns';
import Image from 'next/image';

import { env } from '~/env';
import BlurFade from '~/components/magicui/blur-fade';
import { ScrollArea } from '~/components/ui/scroll-area';
import Particles from '~/components/magicui/particles';

type NaturalItem = {
  image: string;
  date: string;
};

export const revalidate = 13;

const baseAssetsDomain = 'https://api.nasa.gov/EPIC/archive/natural';
const baseApiDomain = "https://api.nasa.gov/EPIC/api/natural"

const Home: NextPage = async () => {
  const { data, status } = await axios.get<NaturalItem[]>(baseApiDomain + '?api_key='.concat(env.NASA_API_KEY));

  if (status == 200) {
    const items = data.map((e) => {
      const date = new Date(e.date);

      const src = `${baseAssetsDomain}/${format(date, 'yyyy')}/${format(date, 'MM')}/${format(date, 'dd')}/png/${e.image}.png?api_key=${env.NASA_API_KEY}`;

      return {
        date,
        src,
      };
    });

    return (
      <ScrollArea className="relative h-screen w-screen overflow-y-auto bg-ctp-crust">
        <Particles
          className="pointer-events-none fixed z-0 h-full w-full"
          quantity={100}
          ease={80}
          color={'#ffffff'}
          refresh
        />

        <div className="z-10 w-full p-10">
          <div className="mx-auto flex w-full flex-wrap justify-center gap-4">
            {items.map((e, idx) => (
              <BlurFade key={e.src} delay={0.25 + idx * 0.05} inView>
                <Image
                  width={400}
                  height={400}
                  className="size-full max-w-[600px] rounded-3xl object-contain"
                  src={e.src}
                  alt={e.src}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  }

  return <div className="h-full w-full" />;
};

export default Home;
