import fun from './app'

const app = new fun(api => {
    console.log('!DONE', api.index)
    return api
})

app.use(function Logger(api) {
    return api.next({ Logger: { level: 2 } })
        .then(res => {
            console.log(`log ->`, res, api.index)
            return res
        })
})

app.use(function Testing(api) {
    return api.next({ kind: 'Testing' })
        .then(output => {
            return output
        })
})

app.use(async function Async({ input, next }) {
    return await next({
        kind: 'async',
        bg: input.color || 'grey'
    })
})

// app.use(ctx => {
//     ctx.xxx = '!'
// })

app.use(function firstOne({ input, next }) {
    return next({
        time: input.time || Date.now(),
        color: input.color
    })
})

//app.use(api => api.throw('Not Found', 404))

function sleep(ms) {
  return function(done){
    setTimeout(done, ms);
  }
}

window.fun = fun
window.app = app
