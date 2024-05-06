'use client'

import { cloneElement, useState } from 'react'
import { GradientGrey } from '@/components/Icon/GradientGrey'

function CardBig({ title, description, children, isDesktop }) {
  const [run, setRun] = useState(false)

  const onMouseEnter = () => setRun(true)
  const onMouseLeave = () => setRun(false)

  return (
    <div className="card card-big rounded-24 bg-steel-20 border-0 overflow-hidden" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <GradientGrey running={run} />
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="p-4 m-md-2">
            <div className="fs-4 fw-normal text-steel-light mb-2">{title}</div>
            <div className="small text-grey lh-sm">{description}</div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-end">
        {cloneElement(children, { running: isDesktop && run })}
      </div>
    </div>
  )
}

export default CardBig

