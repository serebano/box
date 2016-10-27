/**
 * Log execution stats to console
 */
export default function logger(next) {
    return input => {
        const start = performance.now()
        const output = next(input)
        if (typeof input.tag !== 'function')
            return output
        const took = performance.now() - start
        console.log([ input.tag.displayName, Number(took.toFixed(2)) ], input.props, input.children)
        return output
    }
}
