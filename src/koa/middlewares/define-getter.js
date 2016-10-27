function defineGetter(key, value, config) {

    config = {
        enumerable: true,
        writable: false,
        ...config
    }

    const desc = typeof value === 'function'
        ? { value, ...config }
        : { get: () => value, ...config }

    function getter(ctx, next) {
        Object.defineProperty(ctx, key, desc)
        return next()
    }
    getter.displayName = `get ${key}`

    return getter
}

export default defineGetter
