async function foo(ctx, next) {
    //ctx.log(next, 'await next()')
    //throw new Error('1, Bam buram boom boom')

    await next()
    throw new Error('fff, Bam buram boom boom')

    //ctx.log(next, 'next() done', res)
}


export default foo
