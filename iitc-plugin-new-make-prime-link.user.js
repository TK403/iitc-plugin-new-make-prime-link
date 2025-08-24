// ==UserScript==
// @name           IITC plugin: New Scanner Link for Portals
// @author         TK403
// @category       Portal Info
// @version        0.0.1
// @description    Overwrites a new scanner link in the portal details panel.
// @id             new-make-prime-link
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://iitc.app/build/release/plugins/xxx.meta.js
// @downloadURL    https://iitc.app/build/release/plugins/xxx.user.js
// @match          https://intel.ingress.com/*
// @match          https://intel-x.ingress.com/*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'release';
plugin_info.dateTimeVersion = '2025-04-19-124553';
plugin_info.pluginId = 'new-make-prime-link';
//END PLUGIN AUTHORS NOTE

/* exported setup, changelog --eslint */

var changelog = [
];

window.plugin.newScannerLinkPortals = function () {};


window.plugin.newScannerLinkPortals.setup = function () {
  window.makePrimeLink = function (guid, lat, lng) {
    return `https://link.ingress.com/portal/${guid}`;
  };

  console.log('newScannerLinkPortals: started.');
};

var setup = window.plugin.newScannerLinkPortals.setup;

setup.info = plugin_info; //add the script info data to the function as a property
if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
