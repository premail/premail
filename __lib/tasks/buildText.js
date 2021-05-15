'use strict'

/* eslint-disable no-unused-vars */
const { src, dest } = require('gulp')
const path = require('path')
const gulpif = require('gulp-if')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const html2txt = require('gulp-html2txt')

const e = require('../functions/e.js')
const { config } = require('../vars/config.js')
const { log } = require('../vars/log.js')
const { msg } = require('../vars/notifications.js')
const { prod } = require('../vars/prod.js')
const { debug } = require('../vars/debug.js')
/* eslint-enable no-unused-vars */

//
// Build a plain-text version of the HTML file.
//

module.exports = function buildText (done) {
  if (config.user.text.generate) {
    const sourceFile = path.join(config.current.dist, 'index.html')
    const destFile = path.join(config.current.dist, 'index.txt')

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
      images: config.user.text.images,
      include: {
        topNav: config.user.text.include.topNav,
        banner: config.user.text.include.banner,
        salutation: config.user.text.include.salutation,
        body: true,
        signoff: config.user.text.include.signoff,
        social: config.user.text.include.social,
        bottomNav: config.user.text.include.bottomNav,
        footer: config.user.text.include.footer,
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
        dest(path.dirname(destFile)).on('end', function (source) {
          log(msg.info(msg.b('Plain-text version saved:\n') + destFile))
        })
      )
  } else {
    log(msg.info('Plain-text generation turned off.'))
  }

  done()
}
