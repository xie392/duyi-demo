export const useBeforeEnter = (el: HTMLElement) => {
    el.style.height = '0px'
}

export const useEnter = (el: HTMLElement) => {
    el.style.height = 'auto'
    const h = el.clientHeight
    el.style.height = '0'
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.height = h + 'px'
            el.style.transition = '.5s'
        })
    })
}

export const useAfterEnter = (el: HTMLElement) => {
    el.style.transition = 'none'
}