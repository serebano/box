/**
 * Normalize box arguments to named object
 * (a, b, c) -> { a, b, c }
 */
export default function normalize(next) {
    return (tag, props, children) => {
        if (!children && (Array.isArray(props) || typeof props === 'number' || typeof props === 'string')) {
            children = props
            props = {}
        }
        return next({
            tag,
            props: props || {},
            children: Array.isArray(children)
                ? children
                : children ? [ children ] : []
        })
    }
}
