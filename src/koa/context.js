import delegate from 'delegates'

export default class Context {

    constructor(context = {}) {
        Object.keys(context).reduce((ctx, key) => {
            const value = context[key]
            ctx[key] = typeof value === 'function'
                ? value.bind(ctx)
                : value
            return ctx
        }, this)
    }

    throw(message, code = 0) {
        throw new Error(`[${code}] ${message}`)
    }

    onerror(err) {
        if (null == err) return;
        if (!(err instanceof Error))
            err = new Error(`Non-error thrown: ${err}`)
        // delegate
        this.app.emit('error', err)
        console.error(`[CONTEXT]`, err)
    }

    stringify(t = null, i = 4) {
        return JSON.stringify(this, ...arguments)
    }

    now() {
        return performance.now()
    }

}

export const deleg = {
    test: 123,
    foo(a) { a + this.test }
}

export const delegRes = delegate(deleg, 'response')
    .method('attachment')
    .method('redirect')
    .method('remove')
    .method('vary')
    .method('set')
    .method('append')
    .access('status')
    .access('message')
    .access('body')
    .access('length')
    .access('type')
    .access('lastModified')
    .access('etag')
    .getter('headerSent')
    .getter('writable');
