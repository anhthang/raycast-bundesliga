/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - API key to access Bundesliga data, can be obtained from the network tab of your web browser's developer tools while browsing the Bundesliga website. */
  "apikey": string,
  /** Application State ID - Key identifier for the data to be displayed by the extension. Checkout the README for a step-by-step guide on how to obtain this value. */
  "appstateid": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `table` command */
  export type Table = ExtensionPreferences & {}
  /** Preferences accessible in the `result` command */
  export type Result = ExtensionPreferences & {}
  /** Preferences accessible in the `club` command */
  export type Club = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `table` command */
  export type Table = {}
  /** Arguments passed to the `result` command */
  export type Result = {}
  /** Arguments passed to the `club` command */
  export type Club = {}
}

