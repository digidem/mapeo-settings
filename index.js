var fs = require('fs')
var mkdirp = require('mkdirp')
var tar = require('tar-fs')
var pump = require('pump')
var path = require('path')

var METADATA_DEFAULTS = {
  dataset_id: 'mapeodata'
}

class Settings {
  constructor (userDataPath) {
    this.userDataPath = userDataPath
    this.defaultPath = path.join(userDataPath, 'presets', 'default')
    mkdirp.sync(this.defaultPath)
    this.cssPath = path.join(this.defaultPath, 'style.css')
    this.iconsPath = path.join(this.defaultPath, 'icons.svg')
  }

  getEncryptionKey () {
    const metadata = readJsonSync(
      path.join(this.userDataPath, 'presets/default/metadata.json')
    )
    if (metadata) return metadata.projectKey
    else return null
  }

  getSettings (type) {
    switch (type) {
      case 'css':
        return readFile(this.cssPath)
      case 'icons':
        return readFile(this.iconsPath)
      case 'presets':
      case 'imagery':
        return readJsonSync(path.join(this.userDataPath, type + '.json'))
      case 'metadata':
        var data = readJsonSync(path.join(this.userDataPath, type + '.json'))
        return Object.assign(METADATA_DEFAULTS, data)
      default:
        return null
    }
  }
  importSettings (settingsFile, cb) {
    var source = fs.createReadStream(settingsFile)
    var dest = tar.extract(this.defaultPath)
    pump(source, dest, cb)
  }
}

function readJsonSync (filepath) {
  try {
    var data = fs.readFileSync(filepath, 'utf8')
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}

function readFile (filepath) {
  try {
    return fs.readFileSync(filepath, 'utf8')
  } catch (e) {
    return null
  }
}

module.exports = Settings
