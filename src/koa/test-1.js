import fun from './app'

const box = new fun(ctx => {
    console.warn('box', ctx)
    return ctx
})

box.use(function log(ctx, next) {
    ctx.log = (type, meta, message = '') => {
        ctx.state.logs.push({ type, meta, message })
        if (type === 'next')
            console.log(meta.idx, `${meta.name}.${type}`, meta, message)
        if (type === 'then')
            console.log(meta.idx, `${meta.name}.${type}`, meta, message)
    }
    ctx.state.logs = []
    return next('loggg')
})

box.use(async function foo(ctx, next) {
    ctx.log('next', next.meta)
    await next()
    ctx.log('then', next.meta)
})

box.use(async function bar(ctx, next) {
    ctx.log('next', next.meta)
    await next()
    ctx.log('then', next.meta)
})

box.use(async function baz(ctx, next) {
    ctx.log('next', next.meta)
    const num = await next(900)
    ctx.log('then', next.meta, num)
})

box.use(async function testIdx(ctx, next) {
    ctx.log('next', next.meta)
    await next(123)
    ctx.log('then', next.meta)
})

window.fun = fun
window.box = box
