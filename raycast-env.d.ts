/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** x-api-key - API key that used for collect data from Bundesliga web services */
  "apikey": string
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



