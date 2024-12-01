export let showRWDInfo = (cg) => {
    // left bottom tips for window width
    const ww = document.createElement('div')
    ww.style = 'position:fixed;z-index:99999;bottom:0px;background:rgba(0,0,0,.5);color:white;width:45px;}'
    ww.innerHTML = window.innerWidth
    window.addEventListener('resize', () => ww.innerHTML = window.innerWidth)
    document.body.append(ww);

    // left bottom tips (rwd prefix name and breakpoint value)
    let s = ''
    let bpkeys = Object.keys(cg.breakpoints)
    let range1 = [], range2 = []
    bpkeys.forEach(bp => {
        range1.push(cg.breakpoints[bp])
        range2.push(cg.breakpoints[bp])
    })
    range2.shift()
    range2.push(10000)
    range2 = range2.map(i => i - 1)
    bpkeys.forEach((bp, idx) => {
        let bpmin = cg.breakpoints[bp];
        let str = `@media(min-width:${bpmin}px){`
        str += `body::before {
                content:'${bp.toLocaleUpperCase()}-${range1[idx]}~${range2[idx]}';
                position:fixed;bottom:0px;
                background:rgba(0,0,0,.5);
                color:white;
                left:45px;z-index:99999;}`
        str += '}'
        s += str
    })

    return { css: s }
}