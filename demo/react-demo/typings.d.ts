declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.svg' {
    export function ReactComponent(
        props: React.SVGProps<SVGSVGElement>
    ): React.ReactElement
    const url: string
    export default url
}

declare module '@icon/*' {
    import { ReactSvgIconFC } from '@yzfe/react-svgicon'
    const value: ReactSvgIconFC
    export = value
}

declare module '@fa/*' {
    import { ReactSvgIconFC } from '@yzfe/react-svgicon'
    const value: ReactSvgIconFC
    export = value
}
