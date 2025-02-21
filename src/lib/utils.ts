



export const qsAll = <T extends string>(selector: T) => {
  const els = document.querySelectorAll(selector)
  return Array.from(els).filter(el => el instanceof HTMLElement)
} 
