
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
    let pf = cg.prefix

    // body & input
    let s = `
html,
body {
    box-sizing: border-box;
}

html *,
html *:before,
html *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
}

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
        addInfo(`.${pf}-zindex-${n}`, `layer ${n} z-index ${cg.zindex[n]}. ex: .${pf}-zindex-${n}`)
        s += `\n
.${pf}-zindex-${n}{
    /* layer index setting */
    z-index: ${cg.zindex[n]}
}
`})

    // cg.heading
    let fscr = ''
    for (let i = 0; i < headkeys.length; i++) {
        let v = cg.heading[headkeys[i]]

        // h1~h6 (px)
        fscr += `${headkeys[i]}{font-size:${v}px;}`
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
            let n = (bp ? `.${bp}--` : '.') + pf + '-'

            // .cg-fs-14 or .md--cg-fs-14 (px)
            scr = `${n}fs-${v}{font-size:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}fs-${v}`, `font-size ex: .${pf}-fs-${v} or .md--${pf}-fs-${v} (px)`)
        }

        // cg.percentage
        for (let i = 0; i < cg.percentage.length; i++) {
            let v = cg.percentage[i]
            let n = (bp ? `.${bp}--` : '.') + pf + '-'

            // .cg-op-15 or .md--cg-op-15 (%)
            scr = `${n}op-${v}{opacity:${v / 100};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}op-${v}`, `any visual element opacity ex: .${pf}-op-${v} or .md--${pf}-op-${v} (%)`)

            // .cg-wp-15 or .md--cg-wp-15 (%)
            scr = `${n}wp-${v}{width:${v}%;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}wp-${v}`, `element width percentage ex: .${pf}-wp-${v} or .md--${pf}-wp-${v} (%)`)
        }

        // cg.spacing
        for (let i = 0; i < cg.spacing.length; i++) {
            let v = cg.spacing[i]
            let n = (bp ? `.${bp}--` : '.') + pf + '-'

            // .cg-w-120 or .md--cg-w-120 (px)
            scr = `${n}w-${v}{width:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}w-${v}`, `element width in pixel ex: .${pf}-w-${v} or .md--${pf}-w-${v} (px)`)

            // .cg-min-w-120 or .md--cg-min-w-120 (px)
            scr = `${n}min-w-${v}{min-width:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}min-w-${v}`, `element min-width in pixel ex: .${pf}-min-w-${v} or .md--${pf}-min-w-${v} (px)`)

            // .cg-max-w-120 or .md--cg-max-w-120 (px)
            scr = `${n}max-w-${v}{max-width:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}max-w-${v}`, `element max-width in pixel ex: .${pf}-max-w-${v} or .md--${pf}-max-w-${v} (px)`)

            // .cg-h-120 or .md--cg-h-120 (px)
            scr = `${n}h-${v}{height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}h-${v}`, `element height in pixel ex: .${pf}-h-${v} or .md--${pf}-h-${v} (px)`)

            // .cg-min-h-120 or .md--cg-min-h-120 (px)
            scr = `${n}min-h-${v}{min-height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}min-h-${v}`, `element min-height in pixel ex: .${pf}-min-h-${v} or .md--${pf}-min-h-${v} (px)`)

            // .cg-max-h-120 or .md--cg-max-h-120 (px)
            scr = `${n}max-h-${v}{max-height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}max-h-${v}`, `element max-height in pixel ex: .${pf}-max-h-${v} or .md--${pf}-max-h-${v} (px)`)

            // .cg-lh-120 or .md--cg-lh-120 (px)
            scr = `${n}lh-${v}{line-height:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}lh-${v}`, `element line-height in pixel ex: .${pf}-lh-${v} or .md--${pf}-lh-${v} (px)`)

            // .cg-m-24 or .md--cg-m-24 (px)
            scr = `${n}m-${v}{margin:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}m-${v}`, `element margin in pixel ex: .${pf}-m-${v} or .md--${pf}-m-${v} (px)`)

            // .cg-mx-24 or .md--cg-mx-24 (px)
            scr = `${n}mx-${v}{margin:0 ${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mx-${v}`, `element margin-x in pixel ex: .${pf}-mx-${v} or .md--${pf}-mx-${v} (px)`)

            // .cg-my-24 or .md--cg-my-24 (px)
            scr = `${n}my-${v}{margin:${v}px 0;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}my-${v}`, `element margin-y in pixel ex: .${pf}-my-${v} or .md--${pf}-my-${v} (px)`)

            // .cg-ml-24 or .md--cg-ml-24 (px)
            scr = `${n}ml-${v}{margin-left:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}ml-${v}`, `element margin-left in pixel ex: .${pf}-ml-${v} or .md--${pf}-ml-${v} (px)`)

            // .cg-mt-24 or .md--cg-mt-24 (px)
            scr = `${n}mt-${v}{margin-top:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mt-${v}`, `element margin-top in pixel ex: .${pf}-mt-${v} or .md--${pf}-mt-${v} (px)`)

            // .cg-mr-24 or .md--cg-mr-24 (px)
            scr = `${n}mr-${v}{margin-right:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mr-${v}`, `element margin-right in pixel ex: .${pf}-mr-${v} or .md--${pf}-mr-${v} (px)`)

            // .cg-mb-24 or .md--cg-mb-24 (px)
            scr = `${n}mb-${v}{margin-bottom:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}mb-${v}`, `element margin-bottom in pixel ex: .${pf}-mb-${v} or .md--${pf}-mb-${v} (px)`)

            // .cg-p-24 or .md--cg-p-24 (px)
            scr = `${n}p-${v}{padding:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}p-${v}`, `element padding in pixel ex: .${pf}-p-${v} or .md--${pf}-p-${v} (px)`)

            // .cg-px-24 or .md--cg-px-24 (px)
            scr = `${n}px-${v}{padding:0 ${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}px-${v}`, `element padding-x in pixel ex: .${pf}-px-${v} or .md--${pf}-px-${v} (px)`)

            // .cg-py-24 or .md--cg-py-24 (px)
            scr = `${n}py-${v}{padding:${v}px 0;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}py-${v}`, `element padding-y in pixel ex: .${pf}-py-${v} or .md--${pf}-py-${v} (px)`)

            // .cg-pl-24 or .md--cg-pl-24 (px)
            scr = `${n}pl-${v}{padding-left:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pl-${v}`, `element padding-left in pixel ex: .${pf}-pl-${v} or .md--${pf}-pl-${v} (px)`)

            // .cg-pt-24 or .md--cg-pt-24 (px)
            scr = `${n}pt-${v}{padding-top:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pt-${v}`, `element padding-top in pixel ex: .${pf}-pt-${v} or .md--${pf}-pt-${v} (px)`)

            // .cg-pr-24 or .md--cg-pr-24 (px)
            scr = `${n}pr-${v}{padding-right:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pr-${v}`, `element padding-right in pixel ex: .${pf}-pr-${v} or .md--${pf}-pr-${v} (px)`)

            // .cg-pb-24 or .md--cg-pb-24 (px)
            scr = `${n}pb-${v}{padding-bottom:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}pb-${v}`, `element padding-bottom in pixel ex: .${pf}-pb-${v} or .md--${pf}-pb-${v} (px)`)

            // .cg-bd-1 or .md--cg-bd-1 (px)
            scr = `${n}bd-${v}{border:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bd-${v}`, `element border in pixel ex: .${pf}-bd-${v} or .md--${pf}-bd-${v} (px)`)

            // .cg-bdl-1 or .md--cg-bdl-1 (px)
            scr = `${n}bdl-${v}{border-left:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdl-${v}`, `element border-left in pixel ex: .${pf}-bdl-${v} or .md--${pf}-bdl-${v} (px)`)

            // .cg-bdt-1 or .md--cg-bdt-1 (px)
            scr = `${n}bdt-${v}{border-top:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdt-${v}`, `element border-top in pixel ex: .${pf}-bdt-${v} or .md--${pf}-bdt-${v} (px)`)

            // .cg-bdr-1 or .md--cg-bdr-1 (px)
            scr = `${n}bdr-${v}{border-right:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdr-${v}`, `element border-right in pixel ex: .${pf}-bdr-${v} or .md--${pf}-bdr-${v} (px)`)

            // .cg-bdb-1 or .md--cg-bdb-1 (px)
            scr = `${n}bdb-${v}{border-bottom:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}bdb-${v}`, `element border-bottom in pixel ex: .${pf}-bdb-${v} or .md--${pf}-bdb-${v} (px)`)

            // .cg-ol-1 or .md--cg-ol-1 (px)
            scr = `${n}ol-${v}{outline:${v}px solid black;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}ol-${v}`, `element outline in pixel ex: .${pf}-ol-${v} or .md--${pf}-ol-${v} (px)`)

            // .cg-r-16 or .md--cg-r-16 (px)
            scr = `${n}r-${v}{border-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}r-${v}`, `element border-radius in pixel ex: .${pf}-r-${v} or .md--${pf}-r-${v} (px)`)

            // .cg-rtl-16 or .md--cg-rtl-16 (px)
            scr = `${n}rtl-${v}{border-top-left-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rtl-${v}`, `element border-radius top left in pixel ex: .${pf}-rtl-${v} or .md--${pf}-rtl-${v} (px)`)

            // .cg-rtr-16 or .md--cg-rtr-16 (px)
            scr = `${n}rtr-${v}{border-top-right-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rtr-${v}`, `element border-radius top right in pixel ex: .${pf}-rtr-${v} or .md--${pf}-rtr-${v} (px)`)

            // .cg-rtr-16 or .md--cg-rtr-16 (px)
            scr = `${n}rbl-${v}{border-bottom-left-radius:${v}px;}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rbl-${v}`, `element border-radius bottom left in pixel ex: .${pf}-rbl-${v} or .md--${pf}-rbl-${v} (px)`)

            // .cg-rtr-16 or .md--cg-rtr-16 (px)
            scr = `${n}rbr-${v}{border-bottom-right-radius:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}rbr-${v}`, `element border-radius bottom right in pixel ex: .${pf}-rbr-${v} or .md--${pf}-rbr-${v} (px)`)

        }

        // cg.colors

        colorkeys.forEach(c => {
            let v = cg.colors[c]
            let n = (bp ? `.${bp}--` : '.') + pf + '-'

            // bg color | .cg-cl-bg-yellow or .md--cg-cl-bg-yellow
            scr = `${n}cl-bg-${c}{background-color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-bg-${c}`, `element background-color ex: .${pf}-cl-bg-${c} or .md--${pf}-cl-bg-${c}`)

            // text color | .cg-cl-txt-yellow or .md--cg-cl-txt-yellow
            scr = `${n}cl-txt-${c}{color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-txt-${c}`, `element text color ex: .${pf}-cl-txt-${c} or .md--${pf}-cl-txt-${c}`)

            // border color | .cg-cl-bd-yellow or .md--cg-cl-bd-yellow
            scr = `${n}cl-bd-${c} {border-color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-bd-${c}`, `element border color ex: .${pf}-cl-bd-${c} or .md--${pf}-cl-bd-${c}`)

            // outline color | .cg-cl-ol-yellow or .md--cg-cl-ol-yellow
            scr = `${n}cl-ol-${c} {outline-color:${v};}`
            bp ? (str += scr) : (ns += scr)
            addInfo(`${n}cl-ol-${c}`, `element outline color ex: .${pf}-cl-ol-${c} or .md--${pf}-cl-ol-${c}`)
        })

        str += '}'
        s += str
    })

    s = fscr + ns + s

    return { css: s, all: classname }
}