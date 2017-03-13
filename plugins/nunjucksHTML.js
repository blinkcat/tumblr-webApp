/**
 *@file inspired by https://gist.github.com/iyn/0177e51ae7e005b19e51
 */
const nunjucks = require('nunjucks'),
    fs = require('fs')

function nunjucksHTML(options) {
    this.options = options || {}
}

nunjucksHTML.prototype.apply = function(compiler) {
    compiler.plugin('done', function(stats) {
        var webpackStats = stats.toJson({ assets: true, chunks: true }),
            chunks = webpackStats.assetsByChunkName

        var cssFiles = [],
            jsFiles = []
        jsFiles.push(`<script src="/${chunks['vendor']}"></script>`)
        chunks.app.forEach(function(cur, index) {
            if (~cur.lastIndexOf('.js')) {
                jsFiles.push(`<script src="/${cur}"></script>`)
            } else if (~cur.lastIndexOf('.css')) {
                cssFiles.push(`<link rel="stylesheet" href="/${cur}">`)
            }
        })
        cssFiles = cssFiles.join('')
        jsFiles = jsFiles.join('')
        nunjucks.configure('./app/view', {
            tags: {
                blockStart: '<%',
                blockEnd: '%>',
                variableStart: '<$',
                variableEnd: '$>',
                commentStart: '<#',
                commentEnd: '#>'
            }
        })
        var res = nunjucks.render('template.html', {
            cssFiles,
            jsFiles
        })
        fs.writeFileSync('./app/view/index.html', res)
    })
}

module.exports = nunjucksHTML
