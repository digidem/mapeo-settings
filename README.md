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
  if (err) throw err)
  console.log('Settings imported!')
  config.getSettings('presets', function (err, presets) {
    console.log('Got presets file')
  })
})
```

### Creating a Mapeo Settings file

See [Mapeo Settings Builder](https://github.com/digidem/mapeo-settings-builder)

### License

MIT
