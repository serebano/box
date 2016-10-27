async function picbox(ctx, next) {

    const { props, state, log } = ctx

    if (!props.pic || !Array.isArray(props.pic))
        return await next()

    const [ url, width, height ] = props.pic
    const image = document.querySelector('img')
    //log(next, `await fetch()`)

    state.pic = await fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const objectURL = URL.createObjectURL(blob)
            image.src = objectURL
            if (width) image.width = width
            if (height) image.height = height
            return objectURL
        })

    //log(next, `fetch() done / await next()`)
    await next()
    //log(next, `next() done`, res)
}

export default picbox
