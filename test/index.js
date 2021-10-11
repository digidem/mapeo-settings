const path = require('path')
const tape = require('tape')
const fs = require('fs')
const rimraf = require('rimraf')
const crypto = require('crypto')

const Settings = require('..')

const userDataPath = path.join(__dirname, 'userDataPath')
const defaultSettingsFile = path.join(__dirname, 'mapeo-default-settings-v2.1.0.mapeosettings')
const customSettingsFile = path.join(__dirname, 'mapeo-custom-settings-v1.0.0.mapeosettings')

tape('load settings from file', function (t) {
  const s = new Settings(userDataPath)
  s.importSettings(defaultSettingsFile, function (err) {
    t.error(err)
    const presets = s.getSettings('presets')
    t.ok(presets.presets, 'has presets')
    t.same(presets.presets.camp.icon, 'camp', 'has custom presets')
    const icons = s.getSettings('icons')
    t.ok(icons, 'has icons')
    t.end()
  })
})

tape('import new settings', function(t) {
  t.plan(5)

  rimraf.sync(userDataPath)

  const s = new Settings(userDataPath)

  s.importSettings(customSettingsFile, function(err) {
    t.error(err)

    const metadataCustom = s.getSettings('metadata')

    t.ok(metadataCustom.projectKey, "has project key in metadata for custom")

    s.importSettings(defaultSettingsFile, function(err) {
      t.error(err)

      const metadataDefault = s.getSettings('metadata')

      t.notEqual(metadataCustom.projectKey, metadataDefault.projectKey, 'should override project key in metadata')
      t.is(metadataDefault.projectKey, undefined, "has no project key in metadata for default")
    })
  })
})

tape('getEncryptionKey', function (t) {
  t.plan(2)

  rimraf.sync(userDataPath)

  const s = new Settings(userDataPath)

  s.importSettings(defaultSettingsFile, function (err) {
    t.error(err)

    // Create a projectKey in the settings file

    // TODO: create a method for generating a new projectKey and storing it
    var metadata = JSON.parse(fs.readFileSync(path.join(s.defaultPath, 'metadata.json')).toString())
    metadata.projectKey = crypto.randomBytes(32).toString('hex')
    fs.writeFileSync(path.join(s.defaultPath, 'metadata.json'), JSON.stringify(metadata, null, 2))

    const actual = s.getEncryptionKey()
    t.same(actual, metadata.projectKey, 'correct project key retrieved')
  })
})
