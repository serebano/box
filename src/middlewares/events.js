/**
 * Allows events to be set as array
 * box('button', { onClick: [ setColor, 'red' ] })
 */
export default function events(next) {
    return input => {
        const keys = Object.keys(input.props)
        const events = keys.filter(key => key.indexOf('on') === 0)
        events.forEach(key => {
            const event = input.props[key]
            if (Array.isArray(event)) {
                const [ fn, ...args ] = event
                input.props[key] = (e) => fn(...args, e)
            }
        })
        return next(input)
    }
}
