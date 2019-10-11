#### Inovelli Status Manager Node
This node allows you to easily set the appropriate value to send to your Inovelli red series switch.

It should be used in conjunction with the node-red–contrib-home-assistant add on and the output should
be connected to a api-call-service node that is set to do a `svc: zwave:set_config_parameter`.  The values
from this node will get merged into the `svc: set_config_parameter`.

If you notice any problems open an issue or a pull request.  Thanks.