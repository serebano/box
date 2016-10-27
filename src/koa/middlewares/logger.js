export async function logger(ctx, next) {
    const { state, props } = ctx

    state.logs = []

    ctx.log = function log() {
        console.log('ctx-log', ctx)

        let { m, message = '', ...args } = arguments

        let meta = m
        if (typeof m === 'function' && m.meta)
            meta = m.meta

        if (message instanceof Error)
            message = message.stack || message.message

        const time = ctx.now()
        const last = state.logs[state.logs.length - 1]
        const took = last ? Number((time - last.time).toFixed(2)) : 0

        state.logs.push({ time, took, message, args, meta })

        if (meta.index >= 0) {
            const ident = '--'.repeat(meta.index + 1)
            console.log(ident, meta.index, meta.name.toUpperCase(), [ message, took, meta.took ])
        } else {
            console.info(meta.name.toUpperCase(), [ message, took, ...args ])
        }
    }

    //ctx.log(next, `await next()`)

    await next()

    //ctx.log(next, `next() result`, result)
}
