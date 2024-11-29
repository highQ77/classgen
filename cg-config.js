export let config = {
    // prefix setting, ex .cg-xxxx
    prefix: 'cg',
    // body default settings
    body: {
        fontfamily: 'system-ui',
        fontsize: '14px',
        color: '#222',
        background: 'linear-gradient(-45deg, #DDD, #CCC) no-repeat',
    },
    input: {
        accentcolor: '#979179',
    },
    colors: {
        cover: 'rgba(0,0,0,.6)',
        white: 'white',
        black: 'black',
        red: '#C0392B',
        orange: '#D35400',
        yellow: '#F1C40F',
        green: '#27AE60',
        blue: '#2980B9',
        purple: '#9B59B6',
        fluo: 'yellowgreen',
        darkgray: '#333',
        lightgray: '#AAA',
        primary1: '#F7F7F2',
        primary2: '#E4E6C3',
        secondary1: '#111',
        secondary2: '#333',
    },
    breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    },
    // font size level
    fontsize: [14, 15, 16, 18, 20, 24, 30, 36, 48, 60, 72],
    // spaceing level
    spacing: [0, 1, 2, 3, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 120, 160, 240, 320, 480, 640],
    // percentage level
    percentage: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    // heading h1 ~ h6
    heading: {
        h1: 36,
        h2: 30,
        h3: 24,
        h4: 20,
        h5: 18,
        h6: 16,
    },
    // layer
    zindex: {
        debug: 99999,
        dialog: 100,
        hovertip: 101,
    },
}
