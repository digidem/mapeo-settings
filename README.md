# @mapeo/settings

Settings manager for Mapeo.

```
npm install @mapeo/settings
```

### Usage

```js
var Settings = require('@mapeo/settings')

var settings = new Settings(userDataPath)
settings.importSettings(settingsFile, function (err) {
  if (err) throw err
  console.log('Settings imported!')
  var presets = settings.getSettings('presets')
  var icons = settings.getSettings('icons')
  //etc..
})
```

### Creating a Mapeo Settings file

See [Mapeo Settings Builder](https://github.com/digidem/mapeo-settings-builder)

### License

MIT
