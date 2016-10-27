import InfernoServer from 'inferno-server'

/**
 * Render virtual node to html string
 * box('div', { toString: true })
 */

export default function renderToString(next) {
    return input => {
        const { props } = input
        if (props.toString !== true)
            return next(input)

        delete input.props.root
        return InfernoServer.renderToString(next(input))
    }
}
