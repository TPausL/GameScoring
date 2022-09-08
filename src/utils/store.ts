import {Preferences} from "@capacitor/preferences"

export async function set(key: string, value: unknown): Promise<boolean> {
  try {
    await Preferences.set({key,value: JSON.stringify(value)});
    return true;
  } catch {
    return false;
  }
}
export async function get(key: string): Promise<any> {
  try {
    return JSON.parse((await Preferences.get({key})).value || "");
  } catch {
    return undefined;
  }
}

export async function del(key: string): Promise<void> {
  return await Preferences.remove({key});
}
