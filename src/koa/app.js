import _compose from './compose'
import compose from './compose.iterator'
import Context from './context'
import Emitter from 'events'

export default class Fun extends Emitter {

    index = []

    constructor(fun) {
        super()
        this.fun = fun
    }

    use(...functions) {
        this.index.push(...functions)
        return this.create(this.fun, this.index)
    }

    create(fun, functions) {

        const run = compose(...functions)

        return (props) => {

            const ctx = new Context({
                props,
                state: {},
                app: this,
                onError(err) {
                    console.log(`ctx onError`, err, this)
                }
            })

            const end = res => fun(ctx, res)
            const err = err => ctx.onError(err)

            return run(ctx).then(end).catch(err)
        }
    }

    run(/** payload */) {
        if (!this.exec)
            this.exec = this.create(this.fun, this.index)
        return this.exec(...arguments)
    }

    get(key) {

        const { index } = this

        if (typeof key === 'number')
            return index[ key ]

        if (typeof key === 'string')
            return index.filter(fun => fun.name === key)[0]

        return index[ index.indexOf(key) ]
    }

    onerror(err) {
        console.error(`[fun.onerror]`, err)
    }
}

window.compose = compose
window.fun = Fun
window.ctx = Context
