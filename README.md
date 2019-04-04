# @mapeo/config

Configuration manager for Mapeo.

```
npm install @mapeo/config
```

### Usage

```js
var Config = require('@mapeo/config')

var config = new Config(userDataPath)
config.importSettings(settingsFile, function (err) {
  if (err) throw err
  console.log('Settings imported!')
  var presets = config.getSettings('presets')
  var icons = config.getSettings('icons')
  //etc..
})
```

### Creating a Mapeo Settings file

See [Mapeo Settings Builder](https://github.com/digidem/mapeo-settings-builder)

### License

MIT
