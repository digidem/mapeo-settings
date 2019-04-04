var path = require('path')
var tape = require('tape')
var Settings = require('.')

var userDataPath = path.join(__dirname, 'build')
var settingsFile = path.join(userDataPath, 'settings-jungle.mapeosettings')

tape('load settings', function (t) {
  var s = new Settings(userDataPath)
  s.importSettings(settingsFile, function (err) {
    t.error(err)
    var presets = s.getSettings('presets')
    t.ok(presets.presets, 'has presets')
    t.same(presets.presets.camp.icon, 'camp', 'has custom presets')
    var icons = s.getSettings('icons')
    t.ok(icons, 'has icons')
    t.end()
  })
})
