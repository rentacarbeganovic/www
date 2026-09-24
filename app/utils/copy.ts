import type { FleetCar } from '~/i18n/types'

/*
 * Strings that carry a value use a `{n}` / `{car}` placeholder rather than
 * being split around it, because word order around a number differs between
 * the four languages. Interpolate, never concatenate.
 */
export function fill(template: string, values: Record<string, string | number> | string | number): string {
  if (typeof values !== 'object') return template.replace('{n}', String(values))
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template,
  )
}

/* Fleet photos ship at 1280w and 640w. */
export function fleetSrcset(image: string): string {
  return `${image.replace(/\.webp$/, '-sm.webp')} 640w, ${image} 1280w`
}

export function seatsLabel(car: FleetCar, template: string): string | null {
  return car.seats === null ? null : fill(template, car.seats)
}
