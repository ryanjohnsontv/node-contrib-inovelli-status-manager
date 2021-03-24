module.exports = function (RED) {
  var convert = require("color-convert");
  function InovelliStatusManager(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    const { nodeid, color, level, duration, effect, switchtype } = config;

    this.nodeid = parseInt(nodeid, 10);
    this.color = color;
    this.level = parseInt(level, 10);
    this.duration = parseInt(duration, 10);
    this.effect = parseInt(effect, 10);
    this.switchtype = parseInt(switchtype, 10);

    node.on("input", (msg) => {
      const {
        nodeid,
        color: presetColor,
        level: presetLevel,
        duration: presetDuration,
        effect: presetEffect,
        switchtype: presetSwitchtype,
      } = node;
      const { payload } = msg;

      var color = payload.color || presetColor;
      if (isNaN(parseInt(color)) === false && typeof color != "object") {
        color = parseInt(color);
      }
      var rgb = [255, 0, 0];
      var inputconvert = function (color) {
        if (Array.isArray(color) && typeof color === "object") {
          if (color.length === 3) {
            rgb = color;
          } else {
            node.error(`Check your RGB values: ${color}`);
          }
        } else if (typeof color === "string") {
          if (color.startsWith("#") === true) {
            rgb = convert.hex.rgb(color);
          } else {
            color = color.replace(" ", "").toLowerCase();
            rgb = convert.keyword.rgb(color);
          }
        } else if (typeof color === "number") {
          if (color >= 0 && color <= 360) {
            let conv_hsv = [color, 100, 100];
            rgb = convert.hsv.rgb(conv_hsv);
          } else {
            node.error(`Incorrect Hue Value: ${color}`);
          }
        }
        return rgb;
      };
      inputconvert(color);
      if (rgb === undefined) {
        node.error(`Incorrect Color: ${color}`);
      }
      var hsl = convert.rgb.hsl(rgb);
      var keyword = convert.rgb.keyword(rgb);
      color = parseInt((hsl[0] * (17 / 24)).toFixed(0));
      const level = (payload.level || presetLevel) * 255;
      const duration = (payload.duration || presetDuration) * 65536;
      const effect = (payload.effect || presetEffect) * 16777216;
      const switchtype = payload.switchtype || presetSwitchtype;
      const nodeId = payload.nodeId || nodeid;
      const value = color + level + duration + effect;
      const node_id = nodeId ? { node_id: nodeId } : {};
      const data = {
        ...node_id,
        parameter: switchtype,
        value,
      };

      node.status({ text: `Sent color: ${keyword}` });
      node.send({
        ...msg,
        payload: { data },
      });
    });
  }
  RED.nodes.registerType("inovelli-status-manager", InovelliStatusManager);
};
