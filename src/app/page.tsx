import axios from "axios";
import type { NextPage } from "next";
import { format } from "date-fns";
import Image from "next/image";

import { env } from "~/env";
import BlurFade from "~/components/magicui/blur-fade";
import { ScrollArea } from "~/components/ui/scroll-area";
import Particles from "~/components/magicui/particles";

type NaturalItem = {
  image: string;
  date: string;
};

const Home: NextPage = async () => {
  const { data, status } = await axios.get<NaturalItem[]>(
    "https://api.nasa.gov/EPIC/api/natural?api_key=".concat(env.NASA_API_KEY),
  );

  if (status == 200) {
    const items = data.map((e) => {
      const date = new Date(e.date);
      const src = `https://api.nasa.gov/EPIC/archive/natural/${format(date, "yyyy")}/${format(date, "MM")}/${format(date, "dd")}/png/${e.image}.png?api_key=${env.NASA_API_KEY}`;

      return {
        date,
        src,
      };
    });

    return (
      <ScrollArea className="bg-ctp-crust relative h-screen w-screen overflow-y-auto">
        <Particles
          className="fixed z-0 w-full h-full pointer-events-none"
          quantity={100}
          ease={80}
          color={"#ffffff"}
          refresh
        />

        <div className="w-full z-10 p-10">
          <div className="mx-auto flex w-full flex-wrap justify-center gap-4">
            {items.map((e, idx) => (
              <BlurFade key={e.src} delay={0.25 + idx * 0.05} inView>
                <Image
                  width={400}
                  height={400}
                  className="size-full max-w-[300px] rounded-3xl object-contain"
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

  return (
    <div>
      <h1>Error</h1>
    </div>
  );
};

export default Home;
