export let runLayout = (cg) => {

    // prepare variable
    let layoutlimit = 1200
    let pf = cg.prefix
    let s = ''

    // :root variable settings
    let root = ''
    for (let i = 0; i < cg.spacing.length; i++) {
        let v = cg.spacing[i]
        root += `--${pf}-layout-gutter-${v}: ${v}px;`
    }

    s += `
:root {
    /* the gutter of rows and columns */
    ${root}
    /* the width of ${pf}-layout element */
    --${pf}-layout-limit: ${layoutlimit};
}
`;
    for (let i = 0; i < cg.spacing.length; i++) {
        let v = cg.spacing[i]
        s += `.${pf}-layout-gap-${v} {
            column-gap: ${v}px !important;
            row-gap: ${v}px !important;
        }`
    }

    // rwd layout design
    s += `
.${pf}-layout {
    /* container style - 區塊容器樣式，所有排版從此元件開始 */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 0px;
    row-gap: 0px;
    justify-content: flex-start;
}

.${pf}-layout>* {
    /* container children style - 區塊容器 ${pf}-layout 子區塊樣式 */
    display: flex;
    flex-direction: row;
    --${pf}-cell-width: auto;
    flex-basis: var(--${pf}-cell-width);
    flex-grow: 1;
    flex-shrink: 1;
    max-width: var(--${pf}-cell-width);
}

.${pf}-layout-limit {
    /* set ${pf}-layout width limitation in pixel - 容器最大寬度設定 */
    padding: 0 calc((100% - ${cg.layoutlimit}px) / 2) !important;
}

.${pf}-left {
    /* apply style on the child container of ${pf}-layout (align left) - ${pf}-layout 子容器靠左排版 */
    justify-content: flex-start;
}

.${pf}-center {
    /* apply style on the child container of ${pf}-layout (align center) - ${pf}-layout 子容器水平置中 */
    justify-content: center;
}

.${pf}-right {
    /* apply style on the child container of ${pf}-layout (align right) - ${pf}-layout 子容器靠右排版 */
    justify-content: flex-end;
}

.${pf}-top {
    /* apply style on the child container of ${pf}-layout (align top) - ${pf}-layout 子容器靠上排版 */
    align-items: flex-start;
}

.${pf}-middle {
    /* apply style on the child container of ${pf}-layout (align middle) - ${pf}-layout 子容器垂直置中 */
    align-items: center;
}

.${pf}-bottom {
    /* apply style on the child container of ${pf}-layout (align bottom) - ${pf}-layout 子容器靠下排版 */
    align-items: flex-end;
}`

    // semi-manual columns distribution
    for (let j = 0; j < cg.spacing.length; j++) {
        let v = cg.spacing[j]
        for (let i = 1; i <= 12; i++) {
            s += `
            .${pf}-layout-split-${i}.${pf}-layout-gap-${v}>* {
                /* semi-manual columns distribution seperate ${i} parts - 自動分成 ${i} 個區塊 */
                width: calc((100% - var(--${pf}-layout-gutter-${v}) * ${i - 1}) / ${i}) !important;
                flex-grow: 0;
            }`
            if (v == 0) {
                s += `
                .${pf}-layout-split-${i}>* {
                    /* semi-manual columns distribution seperate ${i} parts - 自動分成 ${i} 個區塊 */
                    width: calc((100% - var(--${pf}-layout-gutter-${v}) * ${i - 1}) / ${i}) !important;
                    flex-grow: 0;
                }`
            }
        }
    }

    // manual columns distribution
    for (let j = 0; j < cg.spacing.length; j++) {
        let v = cg.spacing[j]
        for (let i = 12; i >= 1; i--) {
            if (i == 12) {
                s += `\n
                .${pf}-layout.${pf}-layout-gap-${v}>.${pf}-${i} {
                    /* manual columns distribution ${i}/12 width - ${i}欄寬 */
                    --${pf}-cell-width: 100.000%;
                }
                `
                if (v == 0) {
                    s += `\n
                    .${pf}-layout>.${pf}-${i} {
                        /* manual columns distribution ${i}/12 width - ${i}欄寬 */
                        --${pf}-cell-width: 100.000%;
                    }
                    `
                }
            } else {
                s += `\n
                .${pf}-layout.${pf}-layout-gap-${v}>.${pf}-${i} {
                    /* manual columns distribution ${i}/12 width - ${i}欄寬 */
                    --${pf}-cell-width: calc(${100 * i / 12}% - var(--${pf}-layout-gutter-${v}) + var(--gutter-fix));
                }
                `
                if (v == 0) {
                    s += `\n
                        .${pf}-layout>.${pf}-${i} {
                            /* manual columns distribution ${i}/12 width - ${i}欄寬 */
                            --${pf}-cell-width: calc(${100 * i / 12}% - var(--${pf}-layout-gutter-${v}) + var(--gutter-fix));
                        }
                        `
                }
            }
        }
    }

    // gutter fix calculation
    for (let j = 0; j < cg.spacing.length; j++) {
        let v = cg.spacing[j]
        for (let i = 1; i <= 12; i++) {
            if (i == 1) {
                s += `\n
                .${pf}-layout.${pf}-layout-gap-${v}>*:first-child:nth-last-child(${i}) {
                    width: 100%;
                }
                `
                if (v == 0) {
                    s += `\n
                        .${pf}-layout>*:first-child:nth-last-child(${i}) {
                            width: 100%;
                        }
                        `
                }
            } else {
                s += `\n
                .${pf}-layout.${pf}-layout-gap-${v}>*:first-child:nth-last-child(${i}),
                .${pf}-layout.${pf}-layout-gap-${v}>*:first-child:nth-last-child(${i})~* {
                    /* gutter fix calculation - 系統 gutter 校正(不用理會) */
                    width: calc((100% - var(--${pf}-layout-gutter-${v}) * ${i - 1}) / ${i});
                    --gutter-fix: var(--${pf}-layout-gutter-${v}) / ${i};
                }
                `
                if (v == 0) {
                    s += `\n
                    .${pf}-layout>*:first-child:nth-last-child(${i}),
                    .${pf}-layout>*:first-child:nth-last-child(${i})~* {
                        /* gutter fix calculation - 系統 gutter 校正(不用理會) */
                        width: calc((100% - var(--${pf}-layout-gutter-${v}) * ${i - 1}) / ${i});
                        --gutter-fix: var(--${pf}-layout-gutter-${v}) / ${i};
                    }
                    `
                }
            }
        }
    }

    // rwd
    let bpkeys = Object.keys(cg.breakpoints).concat('')
    let columns = 12
    bpkeys.forEach(bp => {
        let bpmin = cg.breakpoints[bp];
        let str = `@media(min-width:${bpmin}px){`
        for (let j = 0; j < cg.spacing.length; j++) {
            let v = cg.spacing[j]
            for (let i = columns; i > 0; i--) {
                let cellW = ''
                if (i == columns) {
                    cellW += `--${pf}-cell-width: 100%;`
                } else {
                    cellW += `--${pf}-cell-width: calc(${100 / columns * i}% - var(--${pf}-layout-gutter-${v}) + var(--gutter-fix));`
                }
                str += `.${pf}-layout.${pf}-layout-gap-${v}>.${bp}--${pf}-${i} {${cellW}}`
                if (v == 0) str += `.${pf}-layout>.${bp}--${pf}-${i} {${cellW}}`
            }
        }
        s += str
    })

    return { css: s }
}