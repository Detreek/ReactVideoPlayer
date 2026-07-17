import type SubtitlesPreference from "../types/SubtitlesPreference";
const DEFAULT_PREFERENCE: SubtitlesPreference = {
  language: "en",
  enabled: false,
  lastUpdate: Date.now(),
};
const STORAGE_KEY = "hls_subtitles_preference";
const arraySubtitlesPrefs: Record<string, SubtitlesPreference> = {
  default: DEFAULT_PREFERENCE,
};

export function saveSubtitlesPreference(
  id: string,
  prefs: Partial<SubtitlesPreference>,
) {
  const current = loadSubtitlesPreference(id);

  const update = {
    ...DEFAULT_PREFERENCE,
    ...current,
    ...prefs,
    lastUpdate: Date.now(),
  };

  arraySubtitlesPrefs[id] = update;
  localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify(arraySubtitlesPrefs));
}

export function loadSubtitlesPreference(
  id: string | number,
): SubtitlesPreference {
  try {
    const storage = localStorage.getItem(`${STORAGE_KEY}`);
    if (!storage) {
      return DEFAULT_PREFERENCE;
    }
    const parsed: Record<string, SubtitlesPreference> = JSON.parse(storage);

    const currentPref = parsed[id];
    if (!currentPref) {
      return DEFAULT_PREFERENCE;
    }
    return currentPref;
  } catch (error) {
    console.log(`${error} we are fckup`);
  }
  return DEFAULT_PREFERENCE;
}
export function deleteSubtitlesLocalStorage(id: string) {
  try {
    const current = localStorage.getItem(id);
    if (!current) {
      return;
    }
    const parsed: Record<string, SubtitlesPreference> = JSON.parse(current);
    delete parsed[id];

    localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify(parsed));
  } catch {
    console.log("FUCK");
  }
}
export function cascadeDeleteSubtitleStorage() {
  const current = localStorage.getItem(STORAGE_KEY);
  if (!current) {
    return;
  }
  const currentRecord: Record<string, SubtitlesPreference> =
    JSON.parse(current);
  let [minKey, min]: [string | null, number] = [null, Infinity];
  for (const [key, value] of Object.entries(currentRecord)) {
    if (value.lastUpdate - min < 0) {
      [minKey, min] = [key, value.lastUpdate];
    }
  }
  if (!minKey) {
    return;
  }
  if (minKey === "default") {
    return;
  }
  deleteSubtitlesLocalStorage(minKey);
}
