async function tryCatch(ctx, next) {
    try {
        //ctx.log(next, `await next()`)
        console.warn(ctx, next.meta)
        await next()
        console.warn(ctx, next.meta)
        //ctx.log(next, `next() done`, res)
    } catch (err) {
        console.warn(ctx, next.meta)
        //ctx.log(next, `catch() err`)
        ctx.app.emit('error', err)
        console.warn(ctx, next.meta)
    }
}

export default tryCatch
