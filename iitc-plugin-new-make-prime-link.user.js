// ==UserScript==
// @name           IITC plugin: New Scanner Link for Portals
// @author         TK403
// @category       Portal Info
// @version        0.0.2
// @description    Overwrites a new scanner link in the portal details panel.
// @id             new-make-prime-link
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://github.com/TK403/iitc-plugin-new-make-prime-link/raw/refs/heads/main/iitc-plugin-new-make-prime-link.meta.js
// @downloadURL    https://github.com/TK403/iitc-plugin-new-make-prime-link/raw/refs/heads/main/iitc-plugin-new-make-prime-link.user.js
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
  {
    version: '0.0.2',
    changes: [
      'Change IITC version checks.',
    ],
  },
];

window.plugin.newMakePrimeLink = function () {};

window.plugin.newMakePrimeLink.compatibles = [
  '0.40.0',
];

window.plugin.newMakePrimeLink.setup = function () {
  if (window.plugin.newMakePrimeLink.compatibles.includes(window.window.script_info.changelog[0].version)) {
    window.makePrimeLink = function (guid, lat, lng) {
      return `https://link.ingress.com/portal/${guid}`;
    };
    console.log('newMakePrimeLink: patched.');
  } else {
    console.log('newMakePrimeLink: skipped.');    
  };
};

var setup = window.plugin.newMakePrimeLink.setup;

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
