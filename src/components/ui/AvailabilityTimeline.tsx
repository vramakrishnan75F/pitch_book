export type AvailabilityState = 'available' | 'booked' | 'closed'

export interface AvailabilitySlot {
  hour: number
  state: AvailabilityState
  isSelected?: boolean
}

interface AvailabilityTimelineProps {
  slots: AvailabilitySlot[]
  onSlotClick?: (slot: AvailabilitySlot) => void
}

interface SegmentContext {
  previousSelected: boolean
  nextSelected: boolean
}

function formatHourLabel(hour: number): string {
  return String(hour).padStart(2, '0')
}

function formatHourRange(hour: number): string {
  const start = formatHourLabel(hour)
  const end = formatHourLabel((hour + 1) % 24)
  return `${start} - ${end}`
}

function getSegmentColorClass(state: AvailabilityState, isSelected: boolean): string {
  if (isSelected) {
    return 'bg-[linear-gradient(180deg,#34C759_0%,#1E8E3E_100%)]'
  }

  if (state === 'available') {
    return 'bg-[linear-gradient(180deg,#2E8B57_0%,#1F6B43_100%)] hover:brightness-110'
  }

  if (state === 'booked') {
    return 'bg-[linear-gradient(180deg,#575757_0%,#3F3F3F_100%)] hover:brightness-110'
  }

  return 'bg-[#F6F7F9] border border-[#E5E7EB]'
}

function getSegmentInteractionClass(state: AvailabilityState, onSlotClick?: (slot: AvailabilitySlot) => void): string {
  if (!onSlotClick || state === 'closed') {
    return 'cursor-not-allowed'
  }

  if (state === 'available') {
    return 'cursor-pointer'
  }

  return 'cursor-default'
}

function getLegendSwatchClass(state: AvailabilityState): string {
  if (state === 'available') {
    return 'bg-[linear-gradient(180deg,#2E8B57_0%,#1F6B43_100%)] shadow-[0_6px_14px_rgba(46,139,87,0.28)]'
  }

  if (state === 'booked') {
    return 'bg-[linear-gradient(180deg,#575757_0%,#3F3F3F_100%)] shadow-[0_4px_10px_rgba(0,0,0,0.15)]'
  }

  return 'bg-[#F6F7F9] border border-[#E5E7EB]'
}

function getSelectedMergeClass(isSelected: boolean, context: SegmentContext): string {
  if (!isSelected) {
    return ''
  }

  const leftClass = context.previousSelected ? '' : 'rounded-l-full'
  const rightClass = context.nextSelected ? '' : 'rounded-r-full'

  return [leftClass, rightClass].join(' ').trim()
}

function AvailabilityTimeline({ slots, onSlotClick }: AvailabilityTimelineProps) {
  return (
    <section className="w-full">
      <div className="mb-3 flex w-full items-center">
        {slots.map((slot) => (
          <span
            key={`label-${slot.hour}`}
            className={[
              'flex-1 text-center text-sm transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
              slot.isSelected ? 'font-semibold text-[#111827]' : 'font-medium text-[#6B7280]',
            ].join(' ')}
          >
            {formatHourLabel(slot.hour)}
          </span>
        ))}
      </div>

      <div className="h-9 w-full rounded-full border border-[#D1D5DB] bg-[#F3F4F6] p-[1px] md:h-10">
        <div className="flex h-full w-full">
          {slots.map((slot, index) => (
            (() => {
              const previousSelected = Boolean(slots[index - 1]?.isSelected)
              const nextSelected = Boolean(slots[index + 1]?.isSelected)
              const isSelected = Boolean(slot.isSelected)
              const showDivider = index > 0 && !(isSelected && previousSelected)

              return (
                <button
                  key={slot.hour}
                  type="button"
                  onClick={() => onSlotClick?.(slot)}
                  disabled={slot.state === 'closed' || !onSlotClick}
                  title={slot.state === 'booked' ? `Booked: ${formatHourRange(slot.hour)}` : undefined}
                  className={[
                    'group relative h-full flex-1 will-change-transform transition-[transform,box-shadow,background-color,border-color,filter] ease-[cubic-bezier(0.4,0,0.2,1)] duration-[200ms]',
                    getSegmentColorClass(slot.state, isSelected),
                    getSegmentInteractionClass(slot.state, onSlotClick),
                    showDivider ? 'border-l border-l-[rgba(255,255,255,0.55)]' : '',
                    slot.state !== 'closed' ? 'text-white' : 'text-[#9CA3AF]',
                    slot.state !== 'closed' && !isSelected ? 'hover:scale-[1.02]' : '',
                    slot.state === 'available' ? 'hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(46,139,87,0.28)] duration-[250ms]' : '',
                    slot.state === 'booked' ? 'hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)] duration-[250ms]' : '',
                    isSelected
                      ? 'z-10 scale-[1.05] -translate-y-[3px] border-2 border-white shadow-[0_0_0_3px_rgba(52,199,89,0.25),0_10px_24px_rgba(52,199,89,0.35)]'
                      : '',
                    getSelectedMergeClass(isSelected, { previousSelected, nextSelected }),
                    slot.state === 'closed' ? 'shadow-none' : '',
                    index === 0 && !isSelected ? 'rounded-l-full' : '',
                    index === slots.length - 1 && !isSelected ? 'rounded-r-full' : '',
                  ].join(' ')}
                  aria-label={`${formatHourLabel(slot.hour)} ${slot.state}${isSelected ? ' selected' : ''}`}
                >
                  {slot.state === 'booked' && (
                    <span className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#4A4A4A] bg-[#1F2937] px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-[0_6px_16px_rgba(0,0,0,0.28)] transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100">
                      {formatHourRange(slot.hour)} booked
                    </span>
                  )}
                </button>
              )
            })()
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-8">
        <div className="flex items-center gap-2 text-sm text-[#374151]">
          <span className={`h-4 w-6 rounded-full ${getLegendSwatchClass('available')}`} />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#374151]">
          <span className={`h-4 w-6 rounded-full ${getLegendSwatchClass('booked')}`} />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#374151]">
          <span className={`h-4 w-6 rounded-full ${getLegendSwatchClass('closed')}`} />
          <span>Closed</span>
        </div>
      </div>
    </section>
  )
}

export default AvailabilityTimeline
