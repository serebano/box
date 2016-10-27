/**
 * Component middleware
 * let com = (bit, box) => box('h1', bit.children)
 * box(com, 'Hello World')
 */

export default function component(next) {
    return input => {
        const { tag } = input
        if (typeof tag === 'function') {
            input.tag = bit => tag(bit, box)
            input.tag.displayName = tag.displayName || tag.name || 'unknownComponent'
        }
        return next(input)
    }
}
