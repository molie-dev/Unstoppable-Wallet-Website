'use client'

import { useEffect, useState } from 'react'
import { animated, useTransition } from '@react-spring/web'

function IconSwitcher({ running, icons, width, height }) {
  const items = mapIcons(icons)

  const getPath = (i, style) => {
    const item = items[i]

    if (item.tag && item.icon.length) {
      return (
        <animated.g style={style}>{
          item.icon.map((d, i) => <path d={d} key={i} fillRule="evenodd" clipRule="evenodd" fill="#808085" />)
        }</animated.g>
      )
    }

    return <animated.path style={style} d={item.icon} fillRule="evenodd" clipRule="evenodd" fill="#808085" />
  }

  const [index, setIndex] = useState(null)
  const active = index || 0
  const config = {
    tension: 120,
    friction: 14,
  }

  const onClick = () => setIndex((state = active) => (state + 1) % items.length)

  const transitions = useTransition(active, {
    from: { transform: 'translate3d(70px,0,0)', opacity: 0, },
    enter: { transform: 'translate3d(0,0,0)', opacity: 1, },
    leave: { transform: 'translate3d(-70px,0,0)', opacity: 0, },
    immediate: index === null,
    config
  })

  useEffect(() => {
    let timer
    if (running) {
      onClick()
      timer = setInterval(onClick, 800)
    }

    return () => clearInterval(timer)
  }, [running])

  return (
    <div className="d-flex justify-content-around flex-column">
      <svg width={width || 200} height={height || 74} fill="none" xmlns="http://www.w3.org/2000/svg">
        {transitions((style, i) => getPath(i, style))}
      </svg>
      <div className="text-center py-2">
        {items[active].title}
      </div>
    </div>
  )
}

function mapIcons(name) {
  switch (name) {
    case 'private-tools':
      return [
        {
          title: 'TOR',
          icon: [
            'M100.001.336a2.834 2.834 0 0 1 2.834 2.833v18.89a2.834 2.834 0 0 1-5.667 0V3.168a2.833 2.833 0 0 1 2.833-2.833ZM100.001 52.28a7.556 7.556 0 1 0 0-15.111 7.556 7.556 0 0 0 0 15.111Zm0 5.667c7.303 0 13.223-5.92 13.223-13.222 0-7.303-5.92-13.222-13.223-13.222-7.302 0-13.222 5.92-13.222 13.222s5.92 13.222 13.222 13.222Z',
            'M81.845 6.25a2.833 2.833 0 0 1 3.743 1.43l6.147 13.751a2.833 2.833 0 0 1-1.38 3.72c-7.7 3.627-13.02 11.454-13.02 20.518 0 12.519 10.148 22.667 22.666 22.667 12.519 0 22.667-10.148 22.667-22.667 0-9.064-5.32-16.89-13.021-20.518a2.833 2.833 0 0 1-1.379-3.72l6.147-13.751a2.833 2.833 0 1 1 5.173 2.312l-5.069 11.341c8.271 4.945 13.816 13.99 13.816 24.336 0 15.648-12.686 28.334-28.334 28.334S71.668 61.317 71.668 45.669c0-10.345 5.545-19.391 13.816-24.336l-5.07-11.34a2.833 2.833 0 0 1 1.431-3.744Z'
          ],
          tag: 'g'
        },
        {
          title: 'SPV wallet',
          icon: 'M79.868 8.664a8.202 8.202 0 0 0-8.201 8.202v13.048a2.833 2.833 0 1 0 5.666 0v-5.246c.799.26 1.65.4 2.535.4h42.799A2.834 2.834 0 0 1 125.5 27.9v6.263h-5.667a8.5 8.5 0 0 0 0 17h5.667v5.667a2.834 2.834 0 0 1-2.833 2.833h-42.5a2.833 2.833 0 0 1-2.834-2.833v-1.417a2.833 2.833 0 1 0-5.666 0v1.417a8.5 8.5 0 0 0 8.5 8.5h42.5a8.5 8.5 0 0 0 8.5-8.5V27.9a8.5 8.5 0 0 0-8.5-8.5h-3.036v-2.828a7.91 7.91 0 0 0-7.909-7.909H79.868Zm39.965 31.167a2.834 2.834 0 0 0 0 5.666h5.667v-5.666h-5.667ZM79.868 19.4a2.535 2.535 0 1 1 0-5.07h31.854a2.242 2.242 0 0 1 2.242 2.242v2.828H79.868Zm6.795 12.76a2.833 2.833 0 0 0 0 4.006l3.663 3.664H68.833a2.833 2.833 0 0 0 0 5.666h21.493l-3.663 3.664a2.833 2.833 0 1 0 4.007 4.006l8.5-8.5a2.833 2.833 0 0 0 0-4.006l-8.5-8.5a2.833 2.833 0 0 0-4.007 0Z'
        },
        {
          title: 'Switchable RPC',
          icon: 'M117.831 13.5a2.834 2.834 0 0 1 4.007-4.006l8.5 8.5a2.832 2.832 0 0 1 0 4.007l-8.5 8.5a2.834 2.834 0 0 1-4.007-4.007l3.663-3.663h-12.238L89.681 55.455a2.834 2.834 0 0 1-2.43 1.376h-12.75a2.833 2.833 0 1 1 0-5.667h11.146l19.575-32.624a2.832 2.832 0 0 1 2.429-1.376h13.843l-3.663-3.663Zm0 34a2.834 2.834 0 0 1 4.007-4.006l8.5 8.5a2.832 2.832 0 0 1 0 4.007l-8.5 8.5a2.834 2.834 0 0 1-4.007-4.007l3.663-3.663h-13.843a2.833 2.833 0 0 1-2.429-1.376l-5.1-8.5a2.833 2.833 0 1 1 4.859-2.915l4.275 7.124h12.238l-3.663-3.663ZM93.809 30.928a2.833 2.833 0 0 0 .972-3.887l-5.1-8.5a2.833 2.833 0 0 0-2.43-1.376h-12.75a2.833 2.833 0 1 0 0 5.667h11.146l4.275 7.124a2.833 2.833 0 0 0 3.887.972Z'
        },
      ]
    case 'market-ranks':
      return [
        {
          title: 'Gainers & Losers',
          icon: [
            'M124.892 24.895a2.55 2.55 0 0 1 1.457 2.303v30.6a2.55 2.55 0 0 1-2.55 2.55h-47.6a2.55 2.55 0 0 1-2.55-2.55v-13.6c0-.787.364-1.531.986-2.014l13.388-10.389a2.55 2.55 0 0 1 3.127 0l11.783 9.145 19.253-15.717a2.55 2.55 0 0 1 2.706-.328Zm-3.643 7.677-16.663 13.602a2.55 2.55 0 0 1-3.176.04l-11.824-9.177-10.837 8.41v9.801h42.5V32.573Z',
            'M125.774 8.586a2.55 2.55 0 0 1-.363 3.588l-20.825 17a2.55 2.55 0 0 1-3.176.04l-11.824-9.177-11.824 9.176a2.55 2.55 0 1 1-3.127-4.03l13.388-10.388a2.55 2.55 0 0 1 3.127 0l11.783 9.145 19.253-15.717a2.55 2.55 0 0 1 3.588.363Z'
          ],
          tag: 'g'
        },
        {
          title: 'Top Platforms',
          icon: 'm100.002 5.555 12.365 7.139V26.97l-12.365 7.14-12.365-7.14V12.694l12.365-7.14Zm0 5.889-7.265 4.194v8.389l7.265 4.194 7.265-4.194v-8.389l-7.265-4.194ZM117.002 33.888l12.365 7.139v14.278l-12.365 7.139-12.365-7.14V41.028l12.365-7.139Zm-7.265 10.084v8.388l7.265 4.195 7.265-4.195v-8.389l-7.265-4.194-7.265 4.194ZM95.367 41.027l-12.365-7.139-12.365 7.139v14.278l12.365 7.139 12.365-7.14V41.028ZM75.737 52.36v-8.389l7.265-4.194 7.265 4.194v8.39l-7.265 4.194-7.265-4.195Z'
        },
        {
          title: 'Top Pairs',
          icon: 'M99.091 7.174a19.834 19.834 0 1 0-10.247 37.978c1.297 9.698 9.604 17.179 19.657 17.179 10.954 0 19.834-8.88 19.834-19.834 0-10.053-7.481-18.36-17.179-19.657A19.83 19.83 0 0 0 99.091 7.174Zm6.337 15.727a14.162 14.162 0 0 0-16.69-11.298 14.167 14.167 0 0 0 .167 27.821c1.32-8.492 8.03-15.202 16.523-16.523ZM94.335 42.497c0-7.824 6.342-14.166 14.166-14.166 7.824 0 14.167 6.342 14.167 14.166 0 7.824-6.343 14.167-14.167 14.167s-14.166-6.343-14.166-14.167Z'
        },
        {
          title: 'Sectors',
          icon: 'M122.101 33.997c0 12.205-9.895 22.1-22.1 22.1-12.206 0-22.1-9.895-22.1-22.1 0-12.206 9.894-22.1 22.1-22.1h.001v19.968c0 1.174.952 2.125 2.125 2.125h19.974v.007Zm-22.1 27.2c15.022 0 27.2-12.178 27.2-27.2 0-15.022-12.178-27.2-27.2-27.2-15.022 0-27.2 12.178-27.2 27.2 0 15.022 12.178 27.2 27.2 27.2Z'
        },
      ]
    case 'verified':
      return [
        {
          tag: 'g',
          title: 'bitcoin.org',
          icon: [
            'M189.536 52.035c1.41.369 4.492 1.175 4.982-.775.502-1.994-2.487-2.658-3.945-2.982a20.175 20.175 0 0 1-.425-.097l-.948 3.767.336.087ZM190.866 46.53c1.176.31 3.74.988 4.186-.785.456-1.812-2.036-2.359-3.253-2.626-.137-.03-.258-.056-.356-.08l-.86 3.417.283.073Z',
            'M187.714 63.131c8.438 2.084 16.983-3.002 19.087-11.359 2.103-8.357-3.031-16.823-11.469-18.907-8.435-2.083-16.98 3.003-19.083 11.361-2.104 8.357 3.03 16.822 11.465 18.905Zm7.288-21.29c2.182.744 3.777 1.86 3.464 3.935-.227 1.52-1.077 2.255-2.206 2.513 1.55.8 2.339 2.026 1.587 4.151-.932 2.64-3.148 2.863-6.095 2.31l-.715 2.84-1.728-.427.706-2.801c-.448-.11-.905-.227-1.377-.354l-.708 2.814-1.726-.427.715-2.844c-.161-.04-.324-.083-.487-.125a85.63 85.63 0 0 0-.745-.19l-2.249-.555.858-1.96s1.273.336 1.256.311c.489.12.706-.196.792-.406l1.13-4.488.124.03.059.015a1.463 1.463 0 0 0-.18-.057l.806-3.203c.021-.364-.105-.823-.805-.996.027-.018-1.255-.309-1.255-.309l.46-1.828 2.383.59-.002.008c.358.089.727.172 1.103.257l.708-2.81 1.727.426-.694 2.756c.464.105.931.21 1.385.322l.689-2.737 1.728.426-.708 2.812Z',
            'M221.927 41.84c1.278 0 2.381.226 3.308.67a6.641 6.641 0 0 1 2.317 1.817c.609.766 1.061 1.66 1.354 2.685.29 1.029.436 2.134.436 3.317 0 1.817-.336 3.534-1.015 5.153-.679 1.62-1.6 3.026-2.771 4.226-1.17 1.198-2.552 2.142-4.146 2.84-1.591.697-3.321 1.046-5.178 1.046-.24 0-.663-.006-1.259-.019a18.567 18.567 0 0 1-2.05-.175 24.2 24.2 0 0 1-2.452-.477 12.351 12.351 0 0 1-2.453-.868l6.896-28.702 6.177-.948-2.469 10.185a9.653 9.653 0 0 1 1.592-.552 7.14 7.14 0 0 1 1.713-.199Zm-5.181 16.901c.931 0 1.807-.227 2.631-.672a6.914 6.914 0 0 0 2.135-1.796 9.05 9.05 0 0 0 1.414-2.548 8.618 8.618 0 0 0 .519-2.963c0-1.263-.213-2.249-.638-2.96-.425-.71-1.211-1.067-2.352-1.067-.374 0-.856.07-1.453.197a3.64 3.64 0 0 0-1.617.831l-2.629 10.817c.158.027.298.054.418.079.117.026.247.045.376.059.136.015.292.022.48.022l.716.001ZM235.749 63.043h-5.9l4.982-20.766h5.94l-5.022 20.766Zm2.87-23.296c-.823 0-1.57-.243-2.232-.73-.668-.483-.999-1.228-.999-2.23 0-.553.114-1.07.338-1.559.228-.487.526-.907.899-1.264a4.408 4.408 0 0 1 1.294-.85 3.984 3.984 0 0 1 1.577-.314c.823 0 1.565.243 2.23.73.663.488.996 1.233.996 2.23 0 .554-.113 1.074-.339 1.561a4.113 4.113 0 0 1-.896 1.265c-.37.354-.805.636-1.294.847a3.923 3.923 0 0 1-1.574.314ZM245.94 37.104l6.179-.948-1.517 6.12h6.617l-1.195 4.816h-6.577l-1.752 7.264a8.135 8.135 0 0 0-.279 1.697c-.029.527.038.98.198 1.363.158.382.443.677.857.886.411.212 1 .319 1.773.319.636 0 1.256-.06 1.856-.18.596-.116 1.2-.28 1.811-.492l.44 4.502c-.797.29-1.661.539-2.591.749-.931.212-2.034.315-3.309.315-1.833 0-3.254-.27-4.266-.807-1.011-.54-1.725-1.279-2.153-2.214-.422-.932-.61-2.005-.558-3.215.055-1.213.239-2.488.558-3.83l3.908-16.345ZM256.959 54.753c0-1.789.292-3.475.876-5.054a12.428 12.428 0 0 1 2.514-4.15c1.086-1.18 2.409-2.114 3.967-2.8 1.55-.683 3.286-1.027 5.199-1.027 1.198 0 2.267.112 3.208.336.945.227 1.8.52 2.573.888l-2.034 4.582a19.286 19.286 0 0 0-1.654-.572c-.571-.174-1.268-.258-2.092-.258-1.969 0-3.526.672-4.685 2.012-1.154 1.341-1.735 3.147-1.735 5.411 0 1.342.292 2.427.879 3.258.584.83 1.662 1.243 3.228 1.243.772 0 1.518-.08 2.232-.236.72-.158 1.355-.357 1.915-.592l.44 4.697c-.746.287-1.569.546-2.472.773-.904.218-1.981.332-3.23.332-1.648 0-3.043-.239-4.184-.71-1.142-.477-2.086-1.111-2.829-1.915a7.206 7.206 0 0 1-1.615-2.825 11.478 11.478 0 0 1-.501-3.393ZM283.165 63.595c-1.408 0-2.631-.213-3.668-.633-1.035-.421-1.892-1.011-2.569-1.777-.679-.761-1.187-1.663-1.535-2.703-.348-1.04-.515-2.19-.515-3.452 0-1.582.256-3.163.774-4.74.516-1.58 1.282-3 2.294-4.263a12.222 12.222 0 0 1 3.705-3.103c1.458-.8 3.135-1.203 5.019-1.203 1.383 0 2.599.213 3.651.633 1.047.42 1.909 1.015 2.591 1.777a7.703 7.703 0 0 1 1.531 2.705c.347 1.037.518 2.191.518 3.453 0 1.577-.253 3.159-.755 4.74a13.637 13.637 0 0 1-2.232 4.263c-.983 1.262-2.211 2.295-3.686 3.098-1.474.802-3.183 1.205-5.123 1.205Zm2.949-16.898c-.875 0-1.648.252-2.31.749a6.463 6.463 0 0 0-1.672 1.896 9.309 9.309 0 0 0-1.02 2.507c-.226.91-.337 1.769-.337 2.586 0 1.317.215 2.343.637 3.082.427.735 1.196 1.104 2.312 1.104.878 0 1.647-.25 2.313-.752a6.502 6.502 0 0 0 1.672-1.894 9.335 9.335 0 0 0 1.02-2.507c.223-.907.337-1.77.337-2.586 0-1.314-.214-2.343-.64-3.08-.425-.735-1.197-1.105-2.312-1.105ZM301.392 63.043h-5.905l4.982-20.766h5.943l-5.02 20.766Zm2.866-23.296a3.674 3.674 0 0 1-2.23-.73c-.665-.483-.999-1.228-.999-2.23 0-.553.115-1.07.34-1.559.225-.487.525-.907.898-1.264a4.4 4.4 0 0 1 1.295-.85 3.957 3.957 0 0 1 1.572-.314c.825 0 1.57.243 2.233.73.664.488.999 1.233.999 2.23 0 .554-.119 1.074-.342 1.561a4.09 4.09 0 0 1-.894 1.265 4.381 4.381 0 0 1-1.294.847 3.932 3.932 0 0 1-1.578.314ZM310.661 43.223c.448-.13.948-.286 1.492-.455a19.97 19.97 0 0 1 1.837-.47 22.199 22.199 0 0 1 2.27-.358c.836-.094 1.789-.14 2.848-.14 3.111 0 5.256.898 6.44 2.687 1.183 1.79 1.388 4.239.62 7.343l-2.714 11.213h-5.938l2.63-10.977c.161-.685.287-1.348.38-1.995.094-.642.088-1.207-.022-1.697a2.022 2.022 0 0 0-.735-1.186c-.389-.301-.977-.453-1.775-.453-.769 0-1.552.082-2.351.24l-3.866 16.067h-5.941l4.825-19.819Z'
          ]
        },
        {
          tag: 'g',
          title: 'certik.com',
          icon: [
            'm201.442 33.59.228 1.367c.18 1.273.264 2.558.25 3.843a35.17 35.17 0 0 1-1.031 8.429 31.447 31.447 0 0 1-4.748 10.47c-2.559 3.644-6.259 7.23-11.653 10.11l-.66.352-.66-.352c-5.394-2.88-9.093-6.466-11.654-10.11a31.444 31.444 0 0 1-4.747-10.47 35.158 35.158 0 0 1-1.031-8.427c-.014-1.286.069-2.57.25-3.843l.228-1.368a.852.852 0 0 0-.395-.874.872.872 0 0 0-1.197.278.854.854 0 0 0-.118.315l-.229 1.369a27.082 27.082 0 0 0-.274 4.123c.002 2.98.364 5.948 1.081 8.842a33.165 33.165 0 0 0 5.011 11.04c2.702 3.85 6.62 7.635 12.259 10.64l1.072.57a.869.869 0 0 0 .822 0l1.07-.57c5.633-3.006 9.553-6.79 12.259-10.64a33.154 33.154 0 0 0 5.008-11.039 36.866 36.866 0 0 0 1.08-8.842 26.828 26.828 0 0 0-.274-4.123l-.228-1.368a.854.854 0 0 0-.349-.562.877.877 0 0 0-.967-.032.859.859 0 0 0-.394.874l-.009-.003Z',
            'm170.948 32.66 12.88-3.897 13.167 3.98c.22.065.458.041.661-.066a.862.862 0 0 0 .356-1.164.868.868 0 0 0-.512-.419l-13.42-4.056a.869.869 0 0 0-.505 0l-13.134 3.97a.873.873 0 0 0-.517.417.852.852 0 0 0 .095.955.861.861 0 0 0 .589.31.882.882 0 0 0 .339-.034l.001.003Z',
            'm164.592 33.84 18.464 35.686a.866.866 0 0 0 .764.467.87.87 0 0 0 .771-.453l11.26-20.855.017-.033 7.207-14.837a.85.85 0 0 0 .034-.653.861.861 0 0 0-.44-.487.876.876 0 0 0-1.156.39l-7.195 14.826-10.464 19.393-17.72-34.23a.867.867 0 0 0-1.437-.172.845.845 0 0 0-.105.954v.003Z',
            'M173.425 49.735h20.533c.23 0 .45-.09.613-.251a.856.856 0 0 0 .254-.607.856.856 0 0 0-.254-.607.872.872 0 0 0-.613-.251h-20.533c-.23 0-.45.09-.613.251a.855.855 0 0 0 .613 1.465Zm57.273-7.404H217.34a.88.88 0 0 0-.615.255.864.864 0 0 0-.257.609v10.617a.867.867 0 0 0 .257.608.882.882 0 0 0 .615.255h13.358v1.798H217.34a2.69 2.69 0 0 1-1.899-.774 2.642 2.642 0 0 1-.782-1.88V43.202a2.634 2.634 0 0 1 1.653-2.455 2.69 2.69 0 0 1 1.028-.199h13.358v1.783Zm25.082-1.792v1.798h-12.864v5.256h10.34v1.814h-10.342v5.265h12.865v1.798h-14.681V40.54h14.682Z',
            'M282.275 43.217v4.667a2.614 2.614 0 0 1-.782 1.88 2.669 2.669 0 0 1-1.898.774h-2.456l5.047 5.927h-2.39l-5.026-5.927h-5.902a8.641 8.641 0 0 1-.872-.089v6.016h-1.816V40.562h13.401a2.694 2.694 0 0 1 1.899.775 2.632 2.632 0 0 1 .782 1.88h.013Zm-13.401 5.507h10.721a.85.85 0 0 0 .604-.243.827.827 0 0 0 .245-.597v-4.667a.84.84 0 0 0-.245-.609.807.807 0 0 0-.605-.255h-10.722a.88.88 0 0 0-.615.255.868.868 0 0 0-.257.609v4.667a.8.8 0 0 0 .258.6.848.848 0 0 0 .616.24Z',
            'M291.879 40.54h16.076v1.797h-7.113v14.135h-1.817V42.337h-7.146V40.54Zm25.82 15.924V40.54h1.816v15.925h-1.816Zm25.954-15.925h2.323l-6.723 7.963 6.746 7.962h-2.346l-5.986-7.056h-5.182v7.056h-1.828V40.54h1.831v7.054h5.182l5.983-7.054Z',
          ]
        },
        {
          tag: 'g',
          title: 'walletscrutiny.com',
          icon: [
            'M199.268 58.859c-.162 0-.261-.072-.297-.216l-5.063-18.387-.027-.081c0-.144.09-.216.269-.216h2.182c.162 0 .26.081.296.243l3.528 13.446c.018.036.036.054.054.054.036 0 .063-.018.081-.054l3.34-13.446c.036-.162.134-.243.296-.243h2.128c.161 0 .26.081.296.243l3.528 13.473c.018.036.036.054.054.054.018 0 .036-.018.054-.054l3.555-13.473c.036-.162.135-.243.296-.243h2.047c.09 0 .153.027.189.081.054.054.072.126.054.216l-4.875 18.36c-.036.162-.135.243-.296.243h-2.074c-.162 0-.261-.081-.297-.243l-3.528-13.932c-.018-.054-.036-.081-.054-.081-.018 0-.036.027-.054.081l-3.42 13.932c-.018.162-.117.243-.296.243h-1.966ZM222.354 44.9c1.095 0 2.047.198 2.855.594.826.378 1.454.918 1.885 1.62.449.684.673 1.467.673 2.349v9.126c0 .18-.089.27-.269.27h-2.047c-.179 0-.269-.09-.269-.27v-.972c0-.09-.045-.108-.135-.054a4.798 4.798 0 0 1-1.724 1.134c-.664.252-1.409.378-2.235.378-1.329 0-2.433-.333-3.313-.999-.862-.684-1.293-1.71-1.293-3.078 0-1.404.485-2.502 1.455-3.294.987-.81 2.361-1.215 4.121-1.215h3.016c.072 0 .108-.036.108-.108v-.729c0-.792-.234-1.404-.7-1.836-.449-.45-1.141-.675-2.074-.675-.754 0-1.374.153-1.859.459-.466.288-.754.684-.861 1.188-.054.18-.162.261-.324.243l-2.181-.297c-.18-.036-.261-.108-.243-.216.144-1.062.71-1.926 1.697-2.592.988-.684 2.227-1.026 3.717-1.026Zm-.7 11.988c.951 0 1.777-.252 2.477-.756.701-.504 1.051-1.143 1.051-1.917v-1.593c0-.072-.036-.108-.108-.108h-2.532c-1.059 0-1.903.207-2.531.621-.629.414-.943.99-.943 1.728 0 .666.233 1.17.7 1.512.485.342 1.114.513 1.886.513ZM231.527 58.859c-.179 0-.269-.09-.269-.27v-18.36c0-.18.09-.27.269-.27h2.047c.18 0 .27.09.27.27v18.36c0 .18-.09.27-.27.27h-2.047ZM237.866 58.859c-.179 0-.269-.09-.269-.27v-18.36c0-.18.09-.27.269-.27h2.047c.18 0 .269.09.269.27v18.36c0 .18-.089.27-.269.27h-2.047ZM255.032 50.273c.072.738.099 1.566.081 2.484 0 .18-.09.27-.27.27h-8.591c-.072 0-.108.036-.108.108 0 .612.054 1.08.162 1.404a2.96 2.96 0 0 0 1.185 1.701c.61.396 1.373.594 2.289.594 1.329 0 2.352-.549 3.07-1.647.09-.18.207-.207.35-.081l1.536 1.026c.125.108.152.225.08.351-.502.81-1.221 1.449-2.154 1.917-.916.468-1.957.702-3.124.702-1.311 0-2.415-.288-3.313-.864-.898-.576-1.571-1.395-2.02-2.457-.431-1.062-.647-2.349-.647-3.861 0-1.314.099-2.313.297-2.997.323-1.242.969-2.223 1.939-2.943.969-.72 2.146-1.08 3.528-1.08 1.814 0 3.169.459 4.067 1.377.898.9 1.445 2.232 1.643 3.996Zm-5.71-3.132c-.772 0-1.409.198-1.912.594-.503.378-.844.891-1.024 1.539-.125.396-.206.9-.242 1.512 0 .072.036.108.108.108h6.167c.072 0 .108-.036.108-.108-.036-.594-.09-1.035-.161-1.323-.18-.702-.539-1.26-1.078-1.674-.52-.432-1.176-.648-1.966-.648ZM264.925 46.979c0 .18-.09.27-.269.27h-2.909c-.072 0-.108.036-.108.108v7.155c0 .756.171 1.305.512 1.647.341.324.871.486 1.589.486h.781c.18 0 .269.09.269.27v1.674c0 .18-.089.27-.269.27-.575.036-.988.054-1.239.054-1.365 0-2.397-.243-3.097-.729-.683-.504-1.024-1.422-1.024-2.754v-8.073c0-.072-.036-.108-.107-.108h-1.643c-.18 0-.27-.09-.27-.27v-1.593c0-.18.09-.27.27-.27h1.643c.071 0 .107-.036.107-.108v-3.186c0-.18.09-.27.27-.27h1.939c.179 0 .269.09.269.27v3.186c0 .072.036.108.108.108h2.909c.179 0 .269.09.269.27v1.593ZM274.248 59.075c-1.383 0-2.586-.216-3.609-.648-1.006-.432-1.787-1.044-2.344-1.836-.538-.792-.808-1.719-.808-2.781v-.783c0-.18.09-.27.27-.27h1.966c.179 0 .269.09.269.27v.648c0 .918.395 1.674 1.185 2.268.79.594 1.877.891 3.259.891 1.239 0 2.173-.261 2.801-.783.629-.522.943-1.206.943-2.052 0-.558-.162-1.035-.485-1.431-.323-.396-.799-.756-1.427-1.08-.611-.342-1.509-.747-2.694-1.215-1.31-.504-2.352-.963-3.124-1.377a5.86 5.86 0 0 1-1.885-1.62c-.503-.684-.754-1.539-.754-2.565 0-1.548.547-2.763 1.643-3.645 1.113-.882 2.612-1.323 4.497-1.323 1.329 0 2.496.225 3.502.675 1.005.45 1.777 1.08 2.316 1.89.556.81.835 1.746.835 2.808v.54c0 .18-.09.27-.27.27h-2.02c-.179 0-.269-.09-.269-.27v-.405c0-.936-.377-1.71-1.131-2.322-.736-.63-1.76-.945-3.07-.945-1.114 0-1.975.234-2.586.702-.61.45-.916 1.107-.916 1.971 0 .594.153 1.08.458 1.458.305.378.754.72 1.347 1.026.61.288 1.535.666 2.774 1.134 1.275.504 2.307.972 3.097 1.404a5.71 5.71 0 0 1 1.966 1.674c.521.684.781 1.539.781 2.565 0 1.584-.583 2.844-1.75 3.78-1.149.918-2.738 1.377-4.767 1.377ZM289.435 59.075c-1.365 0-2.532-.342-3.501-1.026-.97-.702-1.634-1.647-1.993-2.835-.27-.828-.404-1.917-.404-3.267 0-1.242.134-2.331.404-3.267.359-1.152 1.023-2.07 1.993-2.754.987-.684 2.154-1.026 3.501-1.026s2.523.342 3.528 1.026c1.006.684 1.661 1.548 1.966 2.592.108.288.18.585.216.891 0 .144-.081.234-.243.27l-2.02.297h-.054c-.125 0-.215-.081-.269-.243l-.081-.432c-.143-.612-.493-1.125-1.05-1.539-.557-.414-1.23-.621-2.02-.621-.772 0-1.427.207-1.966.621a2.834 2.834 0 0 0-1.051 1.647c-.161.648-.242 1.503-.242 2.565 0 1.044.081 1.89.242 2.538.18.72.53 1.287 1.051 1.701.539.414 1.194.621 1.966.621.79 0 1.463-.207 2.02-.621.575-.414.934-.954 1.077-1.62.018-.018.018-.036 0-.054 0-.036.009-.063.027-.081v-.108c.054-.144.153-.198.296-.162l2.02.324c.144.036.216.108.216.216v.108c0 .162-.045.36-.135.594-.305 1.098-.96 1.98-1.966 2.646-1.005.666-2.181.999-3.528.999ZM304.123 44.981c.575 0 1.096.117 1.562.351.126.054.171.162.135.324l-.431 2.025c-.018.162-.126.216-.323.162a2.81 2.81 0 0 0-1.077-.189l-.377.027c-.844.036-1.545.333-2.101.891-.539.54-.808 1.251-.808 2.133v7.884c0 .18-.09.27-.27.27h-2.046c-.18 0-.27-.09-.27-.27V45.386c0-.18.09-.27.27-.27h2.046c.18 0 .27.09.27.27v1.431c0 .054.009.09.027.108.036 0 .063-.018.081-.054.808-1.26 1.912-1.89 3.312-1.89ZM316.273 45.386c0-.18.089-.27.269-.27h2.02c.18 0 .269.09.269.27v13.203c0 .18-.089.27-.269.27h-2.02c-.18 0-.269-.09-.269-.27v-.999c0-.036-.018-.054-.054-.054-.018-.018-.045-.009-.081.027-.718.99-1.822 1.485-3.313 1.485-.88 0-1.697-.171-2.451-.513a4.274 4.274 0 0 1-1.777-1.512c-.449-.666-.674-1.476-.674-2.43v-9.207c0-.18.09-.27.27-.27h2.02c.179 0 .269.09.269.27v8.397c0 .936.242 1.674.727 2.214.503.54 1.203.81 2.101.81.898 0 1.616-.27 2.155-.81.538-.558.808-1.296.808-2.214v-8.397ZM329.364 46.979c0 .18-.089.27-.269.27h-2.909c-.071 0-.107.036-.107.108v7.155c0 .756.17 1.305.511 1.647.341.324.871.486 1.589.486h.781c.18 0 .27.09.27.27v1.674c0 .18-.09.27-.27.27-.574.036-.987.054-1.238.054-1.365 0-2.398-.243-3.098-.729-.682-.504-1.023-1.422-1.023-2.754v-8.073c0-.072-.036-.108-.108-.108h-1.643c-.179 0-.269-.09-.269-.27v-1.593c0-.18.09-.27.269-.27h1.643c.072 0 .108-.036.108-.108v-3.186c0-.18.09-.27.269-.27h1.939c.18 0 .27.09.27.27v3.186c0 .072.036.108.107.108h2.909c.18 0 .269.09.269.27v1.593ZM334.108 42.956c-.502 0-.915-.162-1.238-.486-.324-.324-.485-.738-.485-1.242s.161-.918.485-1.242c.323-.324.736-.486 1.238-.486.503 0 .916.162 1.239.486.324.324.485.738.485 1.242s-.161.918-.485 1.242c-.323.324-.736.486-1.239.486Zm-1.077 15.876c-.179 0-.269-.09-.269-.27V45.386c0-.18.09-.27.269-.27h2.047c.18 0 .269.09.269.27v13.176c0 .18-.089.27-.269.27h-2.047ZM345.525 44.927c1.472 0 2.639.432 3.501 1.296.862.846 1.293 1.998 1.293 3.456v8.91c0 .18-.09.27-.269.27h-2.047c-.18 0-.27-.09-.27-.27v-8.397c0-.9-.26-1.629-.781-2.187-.52-.558-1.212-.837-2.073-.837-.844 0-1.536.279-2.074.837-.539.558-.808 1.278-.808 2.16v8.424c0 .18-.09.27-.27.27h-2.047c-.179 0-.269-.09-.269-.27V45.386c0-.18.09-.27.269-.27h2.047c.18 0 .27.09.27.27v.972c0 .036.009.063.027.081.036.018.062.009.08-.027.772-.99 1.913-1.485 3.421-1.485ZM353.236 64.232c-.125 0-.188-.09-.188-.27v-1.593c0-.18.09-.27.269-.27h.054c.718-.018 1.284-.108 1.697-.27.413-.162.754-.468 1.023-.918.27-.432.53-1.089.781-1.971.018-.018.018-.045 0-.081v-.081l-4.497-13.365-.027-.108c0-.126.08-.189.242-.189h2.182c.161 0 .269.072.323.216l3.043 10.179c.018.036.045.054.081.054.036 0 .063-.018.081-.054l3.016-10.179c.054-.144.162-.216.324-.216h2.127c.198 0 .27.099.216.297l-4.902 14.391c-.413 1.242-.826 2.16-1.239 2.754a3.348 3.348 0 0 1-1.616 1.296c-.664.252-1.598.378-2.801.378h-.189Z',
            'M160.683 60.203V71h21.228l-6.909-23.07a4.176 4.176 0 0 1 .37-3.26l.711-1.25c.307-.538.397-1.17.237-1.77-.888-3.333-4.165-14.677-8.561-18.65 1.035 6.931 0 12.303-.863 15.422-4.57 0-9.376 2.848-10.899 3.83a1.305 1.305 0 0 0-.576.921l-.35 2.462c-.052.363-.287.67-.624.812-1.571.658-6.166 2.59-8.434 3.585-.412 9.09 9.098 9.095 13.018 8.714.864-.084 1.652.586 1.652 1.457ZM163.271 23c0 4.332.518 11.09 1.381 14.036-1.745.112-3.512.591-5.136 1.263-.452-3.658 1.684-13.393 3.755-15.299Zm-3.641 23.305c.127-.752.253-1.498.837-1.745.574-.242 1.851-.572 2.975-.862.317-.082.621-.16.894-.233.269-.072.507.239.371.482l-.068.121c-.501.899-1.072 1.924-1.637 2.144-.64.25-2.14.783-3.124 1.003-.215.048-.39-.16-.345-.377.037-.174.067-.354.097-.533Z'
          ]
        },
        {
          tag: 'g',
          title: 'immunefi.com',
          icon: [
            'm204.617 48.595 6.947 7.376-11.381 12.085-2.928-3.026 8.531-9.059-4.018-4.266-9.885 10.497v5.553h-3.944v-5.363l-10.193-10.824-3.969 4.215 8.661 9.196-2.927 3.026L168 55.783l6.947-7.377L168 41.03l11.381-12.085 2.928 3.026-8.531 9.059 4.017 4.266 10.144-10.771v-5.278h3.944v5.637l9.935 10.55 3.968-4.215-8.66-9.197 2.927-3.026 11.511 12.223-6.947 7.376Zm-5.648-.052-9.147 9.713-9.227-9.798 9.147-9.712 9.227 9.797Z',
            'M224.851 38.483h-3.929V59.12h3.929V38.483Zm19.932 5.446c-1.786 0-3.49.802-4.342 2.55-.879-1.748-2.528-2.55-4.451-2.55-1.731 0-3.05.688-3.737 1.92l-.412-1.633h-3.572V59.12h3.847v-8.34c0-2.208 1.099-3.268 2.72-3.268 1.539 0 2.583 1.003 2.583 3.44v8.168h3.709v-8.255c.055-2.321 1.209-3.353 2.721-3.353 1.566 0 2.583 1.003 2.583 3.239v8.398h3.874v-9.2c0-4.128-2.665-6.02-5.523-6.02Zm25.089 0c-1.786 0-3.489.802-4.341 2.55-.88-1.748-2.528-2.55-4.451-2.55-1.732 0-3.051.688-3.737 1.92l-.413-1.633h-3.572V59.12h3.847v-8.34c0-2.208 1.099-3.268 2.72-3.268 1.539 0 2.583 1.003 2.583 3.44v8.168h3.71v-8.255c.054-2.321 1.209-3.353 2.721-3.353 1.565 0 2.582 1.003 2.582 3.239v8.398h3.875v-9.2c0-4.128-2.665-6.02-5.524-6.02Zm17.946.287v8.168c0 2.208-.989 3.526-2.885 3.555-1.814.057-2.968-1.06-2.968-3.383v-8.34h-3.654v8.856c0 3.813 2.115 6.335 5.77 6.335 1.703 0 2.94-.803 3.682-1.92l.193 1.633h3.516V44.216h-3.654Zm14.943-.287c-2.143 0-3.572.831-4.314 2.064l-.22-1.777h-3.572V59.12h3.847v-7.882c0-2.408 1.099-3.87 3.133-3.87 1.868 0 2.995 1.262 2.995 3.727v8.025h3.874v-8.857c0-3.812-2.088-6.334-5.743-6.334Zm22.567 7.51c0-4.558-2.831-7.51-7.09-7.51s-7.116 3.095-7.116 7.739c0 4.672 2.857 7.767 7.144 7.767 3.599 0 6.32-2.092 6.951-5.188h-3.874c-.439 1.29-1.566 1.95-2.967 1.95-1.841 0-3.325-1.233-3.38-3.44h10.332v-1.318Zm-7.09-4.386c1.676 0 3.078 1.003 3.243 3.067h-6.458c.165-2.064 1.567-3.067 3.215-3.067Zm8.592-2.837v3.496h2.198V59.12h3.874V47.712h3.27v-3.496h-3.27v-1.52c0-1.06.275-1.863 1.841-1.863h1.429v-3.267h-2.28c-3.601 0-4.864 1.834-4.864 4.73v1.92h-2.198Zm11.883-2.294h3.901l.056-4.356h-3.902l-.055 4.356Zm.055 17.198h3.846V44.216h-3.846V59.12Z'
          ]
        },
      ]

    case 'market-tools':
      return [
        {
          title: 'Advanced Search',
          icon: 'M113.085 51.088a25.394 25.394 0 0 1-15.917 5.576c-14.083 0-25.5-11.417-25.5-25.5s11.417-25.5 25.5-25.5 25.5 11.417 25.5 25.5c0 6.02-2.087 11.554-5.576 15.917l10.413 10.413a2.834 2.834 0 0 1-4.007 4.007l-10.413-10.413Zm-35.75-19.924c0-10.954 8.88-19.833 19.833-19.833 10.954 0 19.833 8.88 19.833 19.833a19.768 19.768 0 0 1-5.549 13.76 2.873 2.873 0 0 0-.524.524 19.77 19.77 0 0 1-13.76 5.55c-10.954 0-19.833-8.88-19.833-19.834Z',
        },
        {
          title: 'Indicators',
          icon: [
            'M81.432 5.964c1.4.7 1.967 2.402 1.267 3.801L77.032 21.1a2.833 2.833 0 1 1-5.068-2.535L77.63 7.231a2.833 2.833 0 0 1 3.802-1.267Z',
            'M99.998 5.665c-4.678 0-9.176 1.82-12.5 5.077-3.328 3.26-5.208 7.692-5.208 12.328 0 10.188-1.567 15.223-2.85 17.604-.628 1.168-1.175 1.674-1.42 1.862-.066.051-.115.082-.145.1a2.834 2.834 0 0 0 .873 5.529h42.5a2.834 2.834 0 0 0 .873-5.53 1.521 1.521 0 0 1-.144-.099c-.245-.188-.793-.694-1.422-1.862-1.282-2.38-2.849-7.416-2.849-17.604 0-4.636-1.88-9.069-5.207-12.328-3.325-3.257-7.823-5.077-12.5-5.077Zm12.042 17.404c0 9.838 1.381 15.789 3.092 19.43H84.864c1.712-3.642 3.092-9.592 3.092-19.43 0-3.093 1.255-6.073 3.507-8.279 2.254-2.208 5.323-3.459 8.535-3.459 3.212 0 6.282 1.251 8.536 3.459 2.252 2.206 3.506 5.186 3.506 8.28Z',
            'M96.687 55.09a2.833 2.833 0 0 0-4.711 3.149c.869 1.3 2.084 2.333 3.485 3.034 1.401.7 2.964 1.058 4.537 1.058s3.136-.357 4.537-1.058c1.402-.7 2.617-1.734 3.486-3.034a2.834 2.834 0 0 0-4.712-3.149c-.283.423-.721.821-1.308 1.115a4.5 4.5 0 0 1-2.003.46 4.5 4.5 0 0 1-2.002-.46c-.588-.294-1.026-.692-1.309-1.115ZM117.297 9.765a2.834 2.834 0 0 1 5.069-2.534l5.666 11.333a2.833 2.833 0 1 1-5.068 2.535l-5.667-11.334Z'
          ],
          tag: 'g'
        },
        {
          title: 'Charts',
          icon: 'M102.835 11.333a2.834 2.834 0 0 0-5.667 0v45.334a2.833 2.833 0 1 0 5.667 0V11.333ZM117.001 25.5a2.834 2.834 0 0 1 2.834 2.833v28.334a2.834 2.834 0 0 1-5.667 0V28.333a2.833 2.833 0 0 1 2.833-2.833ZM83.001 36.833a2.833 2.833 0 0 1 2.834 2.834v17a2.833 2.833 0 1 1-5.667 0v-17a2.833 2.833 0 0 1 2.833-2.834Z',
        },
      ]
    case 'migration':
    default:
      return [
        {
          title: 'From Secret Phrase',
          icon: 'M116.59 9.489a8.498 8.498 0 0 0-12.018 0L77.353 36.708a5.664 5.664 0 0 0-1.582 3.074l-2.712 16.269c-.479 2.876 2.014 5.369 4.89 4.89l16.269-2.712a5.665 5.665 0 0 0 3.074-1.582l27.219-27.219a8.497 8.497 0 0 0 0-12.018L116.59 9.49Zm-8.012 4.006a2.833 2.833 0 0 1 4.006 0l7.921 7.921a2.833 2.833 0 0 1 0 4.006l-6.664 6.664-11.927-11.927 6.664-6.664Zm-11.05 11.05-16.17 16.169-2.385 14.313 14.313-2.386 16.169-16.168-11.928-11.928Z'
        },
        {
          title: 'From Private Key',
          icon: 'M127.505 6.494a2.834 2.834 0 0 1 0 4.007l-3.663 3.663 6.496 6.497a2.83 2.83 0 0 1 0 4.007l-10.017 10.017a2.833 2.833 0 0 1-4.007 0l-6.497-6.497-7.292 7.293a16.923 16.923 0 0 1 3.143 9.85c0 9.389-7.611 17-17 17s-17-7.611-17-17c0-9.39 7.611-17 17-17 3.671 0 7.071 1.164 9.85 3.143l24.98-24.98a2.833 2.833 0 0 1 4.007 0ZM113.824 24.18l4.494 4.494 6.01-6.01-4.493-4.494-6.011 6.01Zm-25.156 9.816c-6.26 0-11.333 5.075-11.333 11.334 0 6.259 5.074 11.333 11.333 11.333 6.26 0 11.333-5.074 11.333-11.333 0-6.26-5.074-11.334-11.333-11.334Z'
        },
        {
          title: 'From iCloud',
          icon: 'M88.521 15.235c3.45-5.749 9.862-9.57 17.147-9.57 10.767 0 19.68 8.382 19.831 18.978 6.624 2.76 11.336 9.155 11.336 16.695 0 10.121-8.466 18.16-18.7 18.16H81.868c-10.234 0-18.7-8.039-18.7-18.16 0-6.646 3.667-12.41 9.07-15.568.132-6.377 5.499-11.348 11.897-11.348 1.545 0 3.026.287 4.386.813Zm17.147-3.904c-6.124 0-11.283 3.715-13.277 8.835a2.833 2.833 0 0 1-4.359 1.224 6.398 6.398 0 0 0-3.897-1.302c-3.536 0-6.234 2.744-6.234 5.924 0 .325.028.642.08.95a2.833 2.833 0 0 1-1.634 3.056c-4.483 2.014-7.512 6.36-7.512 11.32 0 6.808 5.741 12.493 13.033 12.493h36.267c7.291 0 13.033-5.685 13.033-12.493 0-5.614-3.889-10.451-9.357-11.989a2.834 2.834 0 0 1-2.051-3.028c.049-.46.075-.929.075-1.403 0-7.412-6.25-13.587-14.167-13.587Z'
        },
        {
          title: 'From File',
          icon: 'M68.832 8.497a2.833 2.833 0 0 1 2.833-2.833h22.031c.757 0 1.483.303 2.015.841l5.471 5.534h27.15a2.833 2.833 0 1 1 0 5.667H99.999a2.833 2.833 0 0 1-2.015-.842l-5.47-5.533H74.498v13.458h53.833a2.833 2.833 0 0 1 2.833 2.833v23.375a8.5 8.5 0 0 1-8.5 8.5H77.332a8.5 8.5 0 0 1-8.5-8.5v-42.5Zm5.667 21.959v20.541a2.833 2.833 0 0 0 2.833 2.834h45.333a2.834 2.834 0 0 0 2.834-2.834V30.456h-51Z'
        }
      ]
  }
}

export default IconSwitcher
