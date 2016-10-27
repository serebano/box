import fun from 'fun'
import createElement from 'inferno-create-element'

function box({ tag, props, children }) {
    return createElement(tag, props, ...children)
}

export default fun(box)
