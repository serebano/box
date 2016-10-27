import Promise from 'any-promise'

export default function compose(...functions) {
    if (!Array.isArray(functions))
        throw new TypeError('Middleware stack must be an array!')
        
    for (const fn of functions)
        if (typeof fn !== 'function')
            throw new TypeError('Middleware must be composed of functions!')

    return (ctx, next) => {
        let index = -1

        function dispatch(idx) {
            if (idx <= index)
                return Promise.reject(new Error('next() called multiple times (' + idx + '<=' + index + ')'))

            index = idx
            let fun = middlewares[idx]
            if (idx === middlewares.length) fun = next
            if (!fun) return Promise.resolve()

            const meta = {
                index,
                name: (fun.displayName || fun.name || ('fun-' + idx)),
                status: undefined,
                resolved: { value: null, count: 0 },
                rejected: { value: null, count: 0 },
            }

            try {

                ctx.meta[idx] = next.meta = meta

                function next(...args) {

                    ctx.log(next, `dispatch next...`)

                    meta.start = ctx.now()
                    meta.status = null
                    meta.args = args

                    return dispatch(idx + 1)
                        .then(resolved => {
                            meta.resolved.count++
                            meta.resolved.value = resolved
                            meta.took = ctx.now() - meta.start
                            ctx.log(next, `try next...`)
                            return resolved
                        })
                        .catch(error => {
                            meta.rejected.count++
                            meta.rejected.value = error
                            meta.dispatching = false
                            meta.took = ctx.now() - meta.start
                            ctx.log(next, error)
                            throw error
                        })
                }

                return Promise.resolve(fun(ctx, next))

            } catch (err) {
                return Promise.reject(err)
            }
        }

        return dispatch(0)

    }
}

//console.error('[catch] <-', idx, `--`, '(' + name + ')', ctx.error)
//console.info('[then] <-', idx, `--`, '(' + name + ')')
