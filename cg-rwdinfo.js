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
    bpkeys.forEach(bp => {
        let bpmin = cg.breakpoints[bp];
        let str = `@media(min-width:${bpmin}px){`
        str += `body::before {
                content:'${bp.toLocaleUpperCase()}-${bpmin}';
                position:fixed;bottom:0px;
                background:rgba(0,0,0,.5);
                color:white;
                left:45px;z-index:99999;}`
        str += '}'
        s += str
    })

    return { css: s }
}