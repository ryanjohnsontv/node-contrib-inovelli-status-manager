#### Inovelli Status Manager Node

Forked from the exceptionally wonderful https://github.com/pdong/node-contrib-inovelli-status-manager repo.

This node allows you to easily set the appropriate value to send to your Inovelli red series switch.

It should be used in conjunction with the node-red–contrib-home-assistant add on and the output should
be connected to a api-call-service node that is set to do a `svc: zwave:set_config_parameter`.  The values
from this node will get merged into the `svc: set_config_parameter`.

If you notice any problems open an issue or a pull request.  Thanks.

## To Do
-   [ ] Adapt for Z-Wave JS use
-   [x] Add color-convert to accept color names as input
-   [x] Detect color input to properly convert to Inovelli's hue range
-   [x] Standardize color and brightness level selectors in UI
-   [x] Add support for LZW36 module

## Installation
```
git clone https://github.com/ryanjohnsontv/node-contrib-inovelli-status-manager.git

npm install node-contrib-inovelli-status-manager
```
**For supervised installations I recommend adding the add-on "SSH & Web Terminal", add '- npm' as a package in the configuration for this add-on, then navigate to the Node-RED directory (```cd config/node-red```) and follow the above installation instructions.
