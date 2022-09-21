import { useState, useEffect } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { formatNumber } from '../utils'

const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) => {
  return (
    <>
      {/* Dummy element to make the tooltip draggable */}
      <div
        style={{
          position: 'absolute',
          left: `${percent}%`,
          width: 40,
          height: 25,
          transform: 'translate(-50%, -100%)',
          cursor: disabled ? 'not-allowed' : 'grab',
          zIndex: 1,
        }}
        aria-hidden={true}
        {...getHandleProps(id)}
      />
      <div
        role='slider'
        className='slider-handle'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          cursor: disabled ? 'not-allowed' : 'grab',
        }}
        {...getHandleProps(id)}
      />
    </>
  )
}

const PriceSlider = () => {
  const min = 0
  const max = 5000
  const [currentRefinement, setCurrentRefinement] = useState({
    min: 1,
    max: 5000,
  })
  const [ticksValues, setTicksValues] = useState([
    currentRefinement.min,
    currentRefinement.max,
  ])

  useEffect(() => {
    setTicksValues([currentRefinement.min, currentRefinement.max])
  }, [currentRefinement])

  const onChange = values => {
    setCurrentRefinement({ min: values[0], max: values[1] })
  }

  if (ticksValues[0] === undefined || ticksValues[1] === undefined) {
    return null
  }

  return (
    <Slider
      mode={2}
      step={1}
      domain={[min, max]}
      values={[currentRefinement.min, currentRefinement.max]}
      onChange={onChange}
      onUpdate={setTicksValues}
      rootStyle={{ position: 'relative', marginTop: '1.5rem' }}
      className='ebayclone-RangeSlider'
    >
      <Rail>
        {({ getRailProps }) => (
          <div className='slider-rail' {...getRailProps()} />
        )}
      </Rail>

      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div>
            {tracks.map(({ id, source, target }) => (
              <div
                key={id}
                className='slider-track'
                style={{
                  left: `${source.percent}%`,
                  width: `${target.percent - source.percent}%`,
                }}
                {...getTrackProps()}
              />
            ))}
          </div>
        )}
      </Tracks>

      <Handles>
        {({ handles, getHandleProps }) => (
          <div>
            {handles.map(handle => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={[min, max]}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>

      <Ticks values={ticksValues}>
        {({ ticks }) => (
          <div>
            {ticks.map(({ id, count, value, percent }) => (
              <div
                key={id}
                className='slider-tick'
                style={{
                  marginLeft: `${-(100 / count) / 2}%`,
                  width: `${100 / count}%`,
                  left: `${percent}%`,
                }}
              >
                <span style={{ color: '#000000', marginRight: 4 }}>$</span>
                {formatNumber(value)}
              </div>
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
  )
}

export default PriceSlider
