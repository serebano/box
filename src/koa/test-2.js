import fun from './app'
//
import logger from './middlewares/logger'
import tryCatch from './middlewares/try-catch'
import picbox from './middlewares/picbox'
import foo from './middlewares/foo'
//

const app = new fun(ctx => {
    ctx.log({ name: 'fun-app' }, ``, ctx)
    return ctx
})

app.use(logger)
app.use(tryCatch)
app.use(picbox)
app.use(foo)

app.on('error', (err) => {
    console.log('sent error %s to the cloud', err.message, this);
    console.error(err)
})

app.run({
    color: 'blue',
    pic: [ 'https://avatars2.githubusercontent.com/u/1105775?v=3&s=466', 200 ]
})



window.app = app
function sleep(ms) {
  return new Promise(function(resolve){
    setTimeout(resolve, ms);
  });
}
