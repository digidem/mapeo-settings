const path = require('path')
const tape = require('tape')
const fs = require('fs')
const rimraf = require('rimraf')
const crypto = require('crypto')

const Settings = require('..')

const userDataPath = path.join(__dirname, 'userDataPath')
const settingsFile = path.join(__dirname, 'mapeo-default-settings-v2.1.0.mapeosettings')

tape('load settings from file', function (t) {
  const s = new Settings(userDataPath)
  s.importSettings(settingsFile, function (err) {
    t.error(err)
    const presets = s.getSettings('presets')
    t.ok(presets.presets, 'has presets')
    t.same(presets.presets.camp.icon, 'camp', 'has custom presets')
    const icons = s.getSettings('icons')
    t.ok(icons, 'has icons')
    t.end()
  })
})

tape('getEncryptionKey', function (t) {
  rimraf.sync(userDataPath)
  const s = new Settings(userDataPath)
  s.importSettings(settingsFile, function (err) {
    t.error(err)

    // Create a projectKey in the settings file

    // TODO: create a method for generating a new projectKey and storing it
    var metadata = JSON.parse(fs.readFileSync(path.join(s.defaultPath, 'metadata.json')).toString())
    metadata.projectKey = crypto.randomBytes(32).toString('hex')
    fs.writeFileSync(path.join(s.defaultPath, 'metadata.json'), JSON.stringify(metadata, null, 2))

    const actual = s.getEncryptionKey()
    t.same(actual, metadata.projectKey, 'correct project key retrieved')
    t.end()
  })
})
