
export let run = (cg) => {

    // class name and comment collection
    let classname = []
    function addInfo(stylename, comment) {
        classname.push({ stylename, comment })
    }

    // prepare variable
    let bpkeys = Object.keys(cg.breakpoints).concat('')
    let colorkeys = Object.keys(cg.colors)
    let headkeys = Object.keys(cg.heading)

    // body & input
    let s = `
body {
    /* essential setting - body */
    font-family: ${cg.body.fontfamily};
    font-size: ${cg.body.fontsize};
    color: ${cg.body.color};
    background: ${cg.body.background};
}

input {
    /* accent-color setting - input */
    accent-color: ${cg.input.accentcolor};
}
`

    // layer setting (ex: .cg-index-dialog)
    Object.keys(cg.zindex).forEach(n => {
        addInfo(`.${cg.prefix}-zindex-${n}`, `layer ${n} z-index. ex: .${cg.prefix}-zindex-${n}`)
        s += `\n
.${cg.prefix}-zindex-${n}{
    /* layer index setting */
    z-index: ${cg.zindex[n]}
}
`})

    // cg.heading
    let fscr = ''
    for (let i = 0; i < headkeys.length; i++) {
        let v = cg.heading[headkeys[i]]

        // h1~h6 (px)
        fscr += `${headkeys[i]}{font-size:${v};}`
        addInfo(`${headkeys[i]}`, `${headkeys[i]} font size ${v}(px)`)
    }

    let ns = ''
    bpkeys.forEach(bp => {
        let bpmin = cg.breakpoints[bp];
        let str = `@media(min-width:${bpmin}px){`
        let scr = ''
        // cg.fontsize
        for (let i = 0; i < cg.fontsize.length; i++) {
            let v = cg.fontsize[i]
            let n = (bp ? `.${bp}--` : '.') + cg.prefix + '-'

            // .cg-fs-14 or .md--cg-fs-14 (px)
            scr = `${n}fs-${v}{font-size:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}fs-${v}`, `font-size ex: .cg-fs-14 or .md--cg-fs-14 (px)`)
        }

        // cg.percentage
        for (let i = 0; i < cg.percentage.length; i++) {
            let v = cg.percentage[i]
            let n = (bp ? `.${bp}--` : '.') + cg.prefix + '-'

            // .cg-op-15 or .md--cg-op-15 (%)
            scr = `${n}op-${v}{opacity:${v / 100};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}op-${v}`, `any visual element opacity ex: .cg-op-20 or .md--cg-op-20 (%)`)

            // .cg-wp-15 or .md--cg-wp-15 (%)
            scr = `${n}wp-${v}{width:${v}%;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}wp-${v}`, `element width percentage ex: .cg-wp-20 or .md--cg-wp-20 (%)`)
        }

        // cg.spacing
        for (let i = 0; i < cg.spacing.length; i++) {
            let v = cg.spacing[i]
            let n = (bp ? `.${bp}--` : '.') + cg.prefix + '-'

            // .cg-w-120 or .md--cg-w-120 (px)
            scr = `${n}w-${v}{width:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}w-${v}`, `element width in pixel ex: .cg-w-24 or .md--cg-w-24 (px)`)

            // .cg-min-w-120 or .md--cg-min-w-120 (px)
            scr = `${n}min-w-${v}{min-width:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}min-w-${v}`, `element min-width in pixel ex: .cg-min-w-24 or .md--cg-min-w-24 (px)`)

            // .cg-max-w-120 or .md--cg-max-w-120 (px)
            scr = `${n}max-w-${v}{max-width:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}max-w-${v}`, `element max-width in pixel ex: .cg-max-w-24 or .md--cg-max-w-24 (px)`)

            // .cg-h-120 or .md--cg-h-120 (px)
            scr = `${n}h-${v}{height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}h-${v}`, `element height in pixel ex: .cg-h-24 or .md--cg-h-24 (px)`)

            // .cg-min-h-120 or .md--cg-min-h-120 (px)
            scr = `${n}min-h-${v}{min-height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}min-h-${v}`, `element min-height in pixel ex: .cg-min-h-24 or .md--cg-min-h-24 (px)`)

            // .cg-max-h-120 or .md--cg-max-h-120 (px)
            scr = `${n}max-h-${v}{max-height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}max-h-${v}`, `element max-height in pixel ex: .cg-max-h-24 or .md--cg-max-h-24 (px)`)

            // .cg-lh-120 or .md--cg-lh-120 (px)
            scr = `${n}lh-${v}{line-height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}lh-${v}`, `element line-height in pixel ex: .cg-lh-24 or .md--cg-lh-24 (px)`)

            // .cg-m-24 or .md--cg-m-24 (px)
            scr = `${n}m-${v}{margin:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}m-${v}`, `element margin in pixel ex: .cg-m-24 or .md--cg-m-24 (px)`)

            // .cg-mx-24 or .md--cg-mx-24 (px)
            scr = `${n}mx-${v}{margin:0 ${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mx-${v}`, `element margin-x in pixel ex: .cg-mx-24 or .md--cg-mx-24 (px)`)

            // .cg-my-24 or .md--cg-my-24 (px)
            scr = `${n}my-${v}{margin:${v}px 0;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}my-${v}`, `element margin-y in pixel ex: .cg-my-24 or .md--cg-my-24 (px)`)

            // .cg-ml-24 or .md--cg-ml-24 (px)
            scr = `${n}ml-${v}{margin-left:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}ml-${v}`, `element margin-left in pixel ex: .cg-ml-24 or .md--cg-ml-24 (px)`)

            // .cg-mt-24 or .md--cg-mt-24 (px)
            scr = `${n}mt-${v}{margin-top:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mt-${v}`, `element margin-top in pixel ex: .cg-mt-24 or .md--cg-mt-24 (px)`)

            // .cg-mr-24 or .md--cg-mr-24 (px)
            scr = `${n}mr-${v}{margin-right:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mr-${v}`, `element margin-right in pixel ex: .cg-mr-24 or .md--cg-mr-24 (px)`)

            // .cg-mb-24 or .md--cg-mb-24 (px)
            scr = `${n}mb-${v}{margin-bottom:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mb-${v}`, `element margin-bottom in pixel ex: .cg-mb-24 or .md--cg-mb-24 (px)`)

            // .cg-p-24 or .md--cg-p-24 (px)
            scr = `${n}p-${v}{padding:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}p-${v}`, `element padding in pixel ex: .cg-p-24 or .md--cg-p-24 (px)`)

            // .cg-px-24 or .md--cg-px-24 (px)
            scr = `${n}px-${v}{padding:0 ${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}px-${v}`, `element padding-x in pixel ex: .cg-px-24 or .md--cg-px-24 (px)`)

            // .cg-py-24 or .md--cg-py-24 (px)
            scr = `${n}py-${v}{padding:${v}px 0;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}py-${v}`, `element padding-y in pixel ex: .cg-py-24 or .md--cg-py-24 (px)`)

            // .cg-pl-24 or .md--cg-pl-24 (px)
            scr = `${n}pl-${v}{padding-left:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pl-${v}`, `element padding-left in pixel ex: .cg-pl-24 or .md--cg-pl-24 (px)`)

            // .cg-pt-24 or .md--cg-pt-24 (px)
            scr = `${n}pt-${v}{padding-top:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pt-${v}`, `element padding-top in pixel ex: .cg-pt-24 or .md--cg-pt-24 (px)`)

            // .cg-pr-24 or .md--cg-pr-24 (px)
            scr = `${n}pr-${v}{padding-right:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pr-${v}`, `element padding-right in pixel ex: .cg-pr-24 or .md--cg-pr-24 (px)`)

            // .cg-pb-24 or .md--cg-pb-24 (px)
            scr = `${n}pb-${v}{padding-bottom:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pb-${v}`, `element padding-bottom in pixel ex: .cg-pb-24 or .md--cg-pb-24 (px)`)

            // .cg-bd-1 or .md--cg-bd-1 (px)
            scr = `${n}bd-${v}{border:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bd-${v}`, `element border in pixel ex: .cg-bd-2 or .md--cg-bd-2 (px)`)

            // .cg-bdl-1 or .md--cg-bdl-1 (px)
            scr = `${n}bdl-${v}{border-left:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdl-${v}`, `element border-left in pixel ex: .cg-bdl-2 or .md--cg-bdl-2 (px)`)

            // .cg-bdt-1 or .md--cg-bdt-1 (px)
            scr = `${n}bdt-${v}{border-top:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdt-${v}`, `element border-top in pixel ex: .cg-bdt-2 or .md--cg-bdt-2 (px)`)

            // .cg-bdr-1 or .md--cg-bdr-1 (px)
            scr = `${n}bdr-${v}{border-right:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdr-${v}`, `element border-right in pixel ex: .cg-bdr-2 or .md--cg-bdr-2 (px)`)

            // .cg-bdb-1 or .md--cg-bdb-1 (px)
            scr = `${n}bdb-${v}{border-bottom:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdb-${v}`, `element border-bottom in pixel ex: .cg-bdb-2 or .md--cg-bdb-2 (px)`)

            // .cg-ol-1 or .md--cg-ol-1 (px)
            scr = `${n}ol-${v}{outline:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}ol-${v}`, `element outline in pixel ex: .cg-ol-2 or .md--cg-ol-2 (px)`)

            // .cg-r-16 or .md--cg-r-16 (px)
            scr = `${n}r-${v}{border-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}r-${v}`, `element border-radius in pixel ex: .cg-r-16 or .md--cg-r-16 (px)`)

            // .cg-rtl-16 or .md--cg-rtl-16 (px)
            scr = `${n}rtl-${v}{border-top-left-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rtl-${v}`, `element border-radius top left in pixel ex: .cg-rtl-16 or .md--cg-rtl-16 (px)`)

            // .cg-rtr-16 or .md--cg-rtr-16 (px)
            scr = `${n}rtr-${v}{border-top-right-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rtr-${v}`, `element border-radius top right in pixel ex: .cg-rtr-16 or .md--cg-rtr-16 (px)`)

            // .cg-rtr-16 or .md--cg-rtr-16 (px)
            scr = `${n}rbl-${v}{border-bottom-left-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rbl-${v}`, `element border-radius bottom left in pixel ex: .cg-rbl-16 or .md--cg-rbl-16 (px)`)

            // .cg-rtr-16 or .md--cg-rtr-16 (px)
            scr = `${n}rbr-${v}{border-bottom-right-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rbr-${v}`, `element border-radius bottom right in pixel ex: .cg-rbr-16 or .md--cg-rbr-16 (px)`)

        }

        // cg.colors

        colorkeys.forEach(c => {
            let v = cg.colors[c]
            let n = (bp ? `.${bp}--` : '.') + cg.prefix + '-'

            // bg color | .cg-cl-bg-yellow or .md--cg-cl-bg-yellow (px)
            scr = `${n}cl-bg-${c}{background-color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-bg-${c}`, `element background-color ex: .cg-cl-bg-white or .md--cg-cl-bg-white (px)`)

            // text color | .cg-cl-txt-yellow or .md--cg-cl-txt-yellow (px)
            scr = `${n}cl-txt-${c}{color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-txt-${c}`, `element text color ex: .cg-cl-txt-white or .md--cg-cl-txt-white (px)`)

            // border color | .cg-cl-bd-yellow or .md--cg-cl-bd-yellow (px)
            scr = `${n}cl-bd-${c} {border-color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-bd-${c}`, `element border color ex: .cg-cl-bd-white or .md--cg-cl-bd-white (px)`)

            // outline color | .cg-cl-ol-yellow or .md--cg-cl-ol-yellow (px)
            scr = `${n}cl-ol-${c} {outline-color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-ol-${c}`, `element outline color ex: .cg-cl-ol-white or .md--cg-cl-ol-white (px)`)
        })

        str += '}'
        s += str
    })

    s = fscr + ns + s

    return { css: s, all: classname }
}