/**
 * Catch errors
 */
export default function error(next, main) {
    return (...args) => {
        try {
            return next(...args)
        } catch(err) {
            console.warn(main.displayName + ':' + next.displayName, args)
            console.error(err)
        }
    }
}
