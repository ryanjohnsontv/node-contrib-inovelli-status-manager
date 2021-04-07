#### Inovelli Status Manager Node

Forked from the exceptionally wonderful https://github.com/pdong/node-contrib-inovelli-status-manager repo.

This node allows you to easily set the appropriate value to send to your Inovelli red series switch.

It should be used in conjunction with the node-red–contrib-home-assistant add on and the output should
be connected to an api-call-service node. This node will automatically fill in the appropriate fields for that node.

If you notice any problems open an issue or a pull request.  Thanks!

## To Do
-   [x] Adapt for Z-Wave JS use (Requires Home Assistant 2021.4.0 or newer)
-   [x] Allow all fields to be controlled by the payload of an incoming message
-   [x] Add color-convert to accept color names as input
-   [x] Automatically convert input values to proper format (ie. "2 Hours" = 168 for Inovelli math)
-   [x] Detect color input to properly convert to Inovelli's hue range
-   [x] Standardize color and brightness level selectors in UI
-   [x] Add support for LZW36 module

## Installation
```
git clone https://github.com/ryanjohnsontv/node-contrib-inovelli-status-manager.git

npm install node-contrib-inovelli-status-manager

reboot
```
**For supervised installations I recommend adding the add-on "SSH & Web Terminal", add '- npm' as a package in the configuration for this add-on, then navigate to the Node-RED directory (```cd config/node-red```) and follow the above installation instructions.
