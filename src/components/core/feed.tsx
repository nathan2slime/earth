'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import { useRef, useState } from 'react'

import { cn } from '~/lib/utils'
import { Lens } from '~/components/magicui/lens'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

import type { Vector3, NaturalItem, Unit } from '~/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

type Props = {
  images: NaturalItem[]
}

const getDistance = (init: Vector3, target: Vector3): number => {
  const dx = target.x - init.x
  const dy = target.y - init.y
  const dz = target.z - init.z

  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

const getValueByUnit = (value: number, unit: Unit) => {
  const metrics: Record<Unit, number> = {
    km: value,
    miles: value * 0.621371,
  }

  return parseFloat((metrics[unit] ?? 0).toFixed(2))
}

export const Feed = ({ images }: Props) => {
  const [unit, setUnit] = useState<Unit>('km')
  const [isHovering, setIsHovering] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const swiperRef = useRef<SwiperType>()

  const earthCoords: Vector3 = { x: 0, y: 0, z: 0 }
  const image = images[currentPhoto]
  const baseToEpic = image && getDistance(earthCoords, image.coords.dscovr_j2000_position)
  const sunToEpic = image && getDistance(image.coords.sun_j2000_position, image.coords.dscovr_j2000_position)

  const moonToEpic = image && getDistance(image.coords.lunar_j2000_position, image.coords.dscovr_j2000_position)

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-end justify-start gap-4">
      <div className="flex h-fit flex-wrap justify-between gap-1 rounded-lg bg-ctp-base p-2 md:gap-2">
        {images.map((e, idx) => (
          <Image
            key={e.image}
            onClick={() => swiperRef.current && swiperRef.current.slideTo(idx)}
            width={400}
            height={400}
            className={cn(
              'h-[40px] w-full max-w-[40px] cursor-pointer rounded-lg border-2 border-transparent object-contain opacity-40 transition-all duration-150 md:h-[55px] md:max-w-[55px] md:rounded-lg',
              currentPhoto == idx && 'border-ctp-green opacity-100',
            )}
            src={e.image}
            alt={e.image}
          />
        ))}
      </div>
      <div className="flex h-full w-full min-w-0 flex-col items-start justify-start gap-4 pb-4 md:flex-row">
        <Swiper
          className="swipper-wrapper w-full overflow-hidden"
          modules={[Navigation, EffectFade]}
          effect="fade"
          onSlideChange={(e) => setCurrentPhoto(e.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={50}
          slidesPerView="auto"
        >
          {images.map((e, idx) => (
            <SwiperSlide className="overflow-hidden" key={'slide' + idx}>
              <Lens hovering={isHovering} setHovering={setIsHovering}>
                <Image
                  width={400}
                  height={400}
                  className="size-full w-full flex-shrink-0 rounded-3xl object-cover"
                  src={e.image}
                  alt={e.image}
                />
              </Lens>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="w-full max-w-md rounded-lg bg-ctp-mantle p-4">
          <Tabs onValueChange={(e) => setUnit(e)} defaultValue={unit} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="km">Km</TabsTrigger>
              <TabsTrigger value="miles">Miles</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-1 p-2 text-ctp-text">
            <p className="border-b border-ctp-surface0 py-2 text-sm">
              DSCOVR:EPIC =&gt; Earth:&nbsp;
              <span className="font-semibold text-ctp-green">
                {getValueByUnit(baseToEpic ?? 0, unit)} {unit.toUpperCase()}
              </span>
            </p>

            <p className="border-b border-ctp-surface0 py-2 text-sm">
              DSCOVR:EPIC =&gt; Sun:&nbsp;
              <span className="font-semibold text-ctp-green">
                {getValueByUnit(sunToEpic ?? 0, unit)} {unit.toUpperCase()}
              </span>
            </p>

            <p className="border-b border-ctp-surface0 py-2 text-sm">
              DSCOVR:EPIC =&gt; Moon:&nbsp;
              <span className="font-semibold text-ctp-green">
                {getValueByUnit(moonToEpic ?? 0, unit)} {unit.toUpperCase()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
