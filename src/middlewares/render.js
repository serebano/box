import InfernoDOM from 'inferno-dom'

/**
 * Render virtual node to dom element if root attr is set
 * box('div', { root: 'div#app' })
 */

export default function render(next) {
    return input => {
        const { props } = input
        const output = next(input)
        if (!props.root)
            return output
        InfernoDOM.render(output, document.querySelector(props.root))
        return output
    }
}
