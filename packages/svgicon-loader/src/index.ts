import { loader } from 'webpack'
import * as loaderUtils from 'loader-utils'
import gen from '@yzfe/svgicon-gen'
import { LoaderOptions } from '../typings'
import SVGO from 'svgo'

const SvgiconLoader: loader.Loader = function (source) {
    this.cacheable(true)

    const callback = this.async()

    const options = (loaderUtils.getOptions(this) || {}) as LoaderOptions

    ;(async () => {
        const icon = await gen(
            source as string,
            this.resourcePath,
            options.svgFilePath,
            options.svgoConfig as SVGO.Options
        )

        if (callback) {
            let result = `
            const data = ${JSON.stringify(icon)}
        `
            if (options.component === 'vue') {
                console.warn('Load as a vue component is not implemented.')
            } else if (options.component === 'react') {
                result += `
                    import React from 'react'
                    import { SvgIcon } from '@yzfe/react-svgicon'
                    function SvgIconFC (props) {
                        return React.createElement(SvgIcon, {data, ...props})
                    }

                    SvgIconFC.data = data

                    export default SvgIconFC
                `
            } else {
                result += `
                module.exports = data
                `
            }
            callback(null, result)
        }
    })()
}

module.exports = SvgiconLoader
