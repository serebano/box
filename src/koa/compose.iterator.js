import Promise from 'any-promise'

export default function compose(...functions) {

    let stack = functions

    if (!Array.isArray(stack))
        throw new TypeError('Middleware stack must be an array!')

    for (const fn of stack)
        if (typeof fn !== 'function')
            throw new TypeError('Middleware must be composed of functions!')

    /** api */

    const api = {

        get(key) {
            return key
                ? stack[key]
                : stack
        },

        set(...functions) {
            stack = functions
        },

        use(...functions) {
            stack = [ ...stack, ...functions ]
        },

        run(context, next) {
            const iterator = this[Symbol.iterator]()
            try {
                const { value } = iterator.next(context, next)
                return Promise.resolve(value)
            } catch (err) {
                return Promise.reject(err)
            }
        },

        [Symbol.iterator]() {

            const { length } = stack
            let index = 0
            let context
            let nextFunc

            return {

                next() {

                    let [ ctx = {}, nxt ] = arguments

                    if (!context) context = ctx
                    if (!nextFunc) nextFunc = nxt

                    let value
                    let func = middleware[index++] || nextFunc
                    let done = index > length
                    let nextCalled = false

                    if (func) {
                        const getNextValue = () => this.next().value

                        value = func(context, function next() {
                            if (nextCalled)
                                return Promise.reject(new Error('next() called multiple times'))
                            nextCalled = true

                            return Promise.resolve(1)
                                .then(getNextValue)
                        })
                    }

                    return { value, done }
                }
            }
        }
    }

    return api
}
