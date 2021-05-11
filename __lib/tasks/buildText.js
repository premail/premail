'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const path = require('path')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const html2txt = require('gulp-html2txt')

const e = require('../functions/e.js')
const paths = require('../vars/paths.js')
const { userConfig } = require('../functions/userConfig.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { prod } = require('../vars/prod.js')
const { text } = require('../vars/text.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Build a plain-text version of the HTML file.
//

module.exports = function buildText (done) {
  if (text) {
    const sourceFile = path.join(paths.current.dist, 'index.html')
    const destFile = path.join(paths.current.dist, 'index.txt')

    // Options for rendering text
    const buildOpt = {
      baseElement: [],
      tables: true,
      tags: {
        img: {},
      },
    }

    // Determine which elements to include
    const includeOpt = {
      images: userConfig.data.text.images,
      include: {
        topNav: userConfig.data.text.include.topNav,
        banner: userConfig.data.text.include.banner,
        salutation: userConfig.data.text.include.salutation,
        body: true,
        signoff: userConfig.data.text.include.signoff,
        social: userConfig.data.text.include.social,
        bottomNav: userConfig.data.text.include.bottomNav,
        footer: userConfig.data.text.include.footer,
      },
    }

    if (!includeOpt.images) {
      buildOpt.tags.img.format = 'skip'
    }

    Object.keys(includeOpt.include).forEach(key => {
      if (includeOpt.include[key]) {
        buildOpt.baseElement.push('div.component-' + key)
      }
    })

    if (debug) {
      debug(msg.b('Plain-text source:\n') + sourceFile)
      debug(
        msg.b('\nPlain-text options configuration:\n') +
          JSON.stringify(includeOpt, null, 2).replace(/["{},]/g, '')
      )
    }

    // Render plain text
    src(sourceFile)
      .pipe(html2txt(buildOpt).on('error', e.textError))

      // Remove hard-coded mobile navigation menu characters inserted by
      // MJML, which will otherwise show up in the generated plain-text.
      // Currently html-to-text does not give us a way to skip elements
      // based on selectors.
      //
      // @see:
      // https://github.com/html-to-text/node-html-to-text/issues/159
      .pipe(replace('☰ ⊗\n', ''))

      // Write file
      .pipe(
        dest(path.dirname(destFile)).on('finish', function (source) {
          log(msg.info(msg.b('Plain-text version saved:\n') + destFile))
        })
      )
  } else {
    log(msg.info('Plain-text generation turned off.'))
  }

  done()
}
