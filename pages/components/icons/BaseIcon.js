export const BaseIcon = ({ children, size=24, color, className='', ...props }) => {
    return (
        <svg
            width={size}
            height={size}
            className={className}
            fill={(color !== null || color !== undefined) ? color : 'currentColor'}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            { ...props }
        >
            { children }
        </svg>
    );
}