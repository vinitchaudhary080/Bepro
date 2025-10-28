import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import type { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

let ready = false;
const pending: Array<() => void> = [];

export function onNavReady() {
  ready = true;
  // flush queue
  while (pending.length) {
    const fn = pending.shift();
    try { fn?.(); } catch (e) { console.log("Nav pending action failed:", e); }
  }
}

function runOrQueue(fn: () => void) {
  if (navigationRef.isReady() && ready) fn();
  else pending.push(fn);
}

export function navigate<Name extends keyof RootStackParamList>(
  name: Name,
  params?: RootStackParamList[Name]
) {
  runOrQueue(() => navigationRef.navigate(name as never, params as never));
}

export function resetToMainTabsHome() {
  runOrQueue(() => {
    // TODO: yahan apne exact route names set karo
    navigationRef.reset({
      index: 0,
      routes: [{ name: "RootTabs" as any, params: { screen: "Home" } }],
    });
  });
}
