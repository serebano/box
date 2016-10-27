import compose from './compose.iterator'
import Context from './context'
import picbox from './middlewares/picbox'

function App(fun) {
    if (!(this instanceof App))
        return new App(...arguments)
    this.fun = fun
}

App.prototype.index = []

App.prototype.use = function use(...functions) {
    this.index.push(...functions)
    return this.execute = compose(...this.index)
}

App.prototype.run = function run(props) {

    const { execute, fun } = this

    // create new context
    const ctx = new Context({
        id: ctxID++,
        count: 10,
        name: 'Serebano',
        date: Date(),
        props: props || {},
        state: new Map().set('init', 'Hi Map!'),
        log() { console.log(`[log]`, ...arguments, this) }
    })

    return execute(ctx)
        .then(res => fun(ctx))
        .catch(err => console.log('app err', err))
}

const app = new App(ctx => {
    console.warn(ctx.name)
    console.log(ctx.id, 'app this', this)
    console.log(ctx.stringify(null, 4))
    ctx.log(ctx.id, ctx.count)
    return Promise.resolve('hols')
})

window.use1 = app.use((ctx, next) => {
    ctx.count = (ctx.count + (ctx.props.add || 1))
    return next()
})

window.use2 = app.use(picbox)

app.run({ add: 3 })

window.app = app

function myFun(ctx) {
    console.log('fun', ctx)
    return ctx.bb()
}

const a = async({ props, state }, next) => {
    if (props.a) state.set('a', [1, props, next])
    await next(100)
}
const b = (ctx, next) => {
    ctx.bb = () => [ctx.date, `this is BBB`, ctx.state.entries()]
    return next()
}
const c = (ctx, next) => next()

const execute = compose(a, b, c, compose(b, c, picbox))
let ctxID = 0

const run = props => {
    const ctx = new Context({
        id: ctxID++,
        name: 'Serebano',
        date: Date(),
        props: props || {},
        state: new Map().set('init', 'Hi Map!'),
        log() { console.log(`[log]`, ...arguments, this) }
    })
    return execute(ctx)
        .then(res => myFun(ctx))
        .catch(err => console.log('err', err))
}

window.run = run
