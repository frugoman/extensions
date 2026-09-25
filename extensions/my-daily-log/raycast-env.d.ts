/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Daily Log Path - Folder where your logs are stored. Put it in iCloud Drive or Dropbox to sync between machines. */
  "logPath": string,
  /** AI Server URL - Base URL of any OpenAI-compatible API. Ollama: http://localhost:11434/v1, LM Studio: http://localhost:1234/v1, OpenAI: https://api.openai.com/v1 */
  "aiBaseUrl": string,
  /** AI Model - Name of the model to use, e.g. llama3.2, qwen2.5, mistral (for Ollama run `ollama list` to see yours) */
  "aiModel": string,
  /** AI API Key - Only needed for hosted providers. Leave empty for Ollama or other local servers. */
  "aiApiKey"?: string,
  /** Extra AI Instructions - Optional instructions added to every prompt, e.g. 'Answer in Spanish' or 'Keep it under 5 bullet points' */
  "aiInstructions"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `dailyLogList` command */
  export type DailyLogList = ExtensionPreferences & {}
  /** Preferences accessible in the `loggedDaysInMonthList` command */
  export type LoggedDaysInMonthList = ExtensionPreferences & {}
  /** Preferences accessible in the `createLogCommand` command */
  export type CreateLogCommand = ExtensionPreferences & {}
  /** Preferences accessible in the `searchLogs` command */
  export type SearchLogs = ExtensionPreferences & {}
  /** Preferences accessible in the `logReminderMenuBar` command */
  export type LogReminderMenuBar = ExtensionPreferences & {
  /** Remind Me Every - How long without a new log before you are reminded */
  "reminderIntervalMinutes": "30" | "60" | "90" | "120" | "180" | "240",
  /** Working Hours Start - Do not remind before this time (24h format, e.g. 09:00) */
  "reminderStartTime": string,
  /** Working Hours End - Do not remind after this time (24h format, e.g. 18:00) */
  "reminderEndTime": string,
  /** Days - Skip reminders on Saturdays and Sundays */
  "reminderWeekdaysOnly": boolean,
  /** Notification - Besides highlighting the menu bar item, show a macOS notification */
  "reminderNotification": boolean
}
  /** Preferences accessible in the `daySummaryView` command */
  export type DaySummaryView = ExtensionPreferences & {}
  /** Preferences accessible in the `weekSummaryView` command */
  export type WeekSummaryView = ExtensionPreferences & {}
  /** Preferences accessible in the `summaryOfAMonth` command */
  export type SummaryOfAMonth = ExtensionPreferences & {}
  /** Preferences accessible in the `dailyStandupSpeechView` command */
  export type DailyStandupSpeechView = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `dailyLogList` command */
  export type DailyLogList = {
  /** When (t, y, 3, 2022-12-31) */
  "date": string
}
  /** Arguments passed to the `loggedDaysInMonthList` command */
  export type LoggedDaysInMonthList = {}
  /** Arguments passed to the `createLogCommand` command */
  export type CreateLogCommand = {
  /** Title */
  "title": string
}
  /** Arguments passed to the `searchLogs` command */
  export type SearchLogs = {}
  /** Arguments passed to the `logReminderMenuBar` command */
  export type LogReminderMenuBar = {}
  /** Arguments passed to the `daySummaryView` command */
  export type DaySummaryView = {}
  /** Arguments passed to the `weekSummaryView` command */
  export type WeekSummaryView = {}
  /** Arguments passed to the `summaryOfAMonth` command */
  export type SummaryOfAMonth = {}
  /** Arguments passed to the `dailyStandupSpeechView` command */
  export type DailyStandupSpeechView = {}
}

