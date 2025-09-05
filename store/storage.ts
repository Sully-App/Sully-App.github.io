import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Account,
  AppNotification,
  Chore,
  EmployeePrize,
  Item,
  PrizeDefinition,
  RestockRequest,
  Role,
  SwitchRequest,
  Message,
  Objective,
  SafetyRequirement,
} from './types';

const KEYS = {
  items: 'inv_items_v1',
  notifs: 'inv_notifs_v1',
  reqs: 'inv_reqs_v1',
  role: 'inv_role_v1',
  accounts: 'inv_accounts_v1',
  chores: 'inv_chores_v1',
  prizes: 'inv_prizes_v1',
  employeePrizes: 'inv_employee_prizes_v1',
  switches: 'inv_switches_v1',
  messages: 'inv_messages_v1',
  objectives: 'inv_objectives_v1',
  safetyRequirements: 'inv_safety_requirements_v1',
  deviceId: 'device_id_v1',
  currentAccount: 'current_account_v1',
};

function safeParse<T>(str: string | null, fallback: T): T {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    console.log('Failed to parse JSON from storage. Returning fallback. Value=', str?.slice(0, 100));
    return fallback;
  }
}

export async function loadAll() {
  const [
    itemsStr,
    notifsStr,
    reqsStr,
    roleStr,
    accStr,
    choresStr,
    prizesStr,
    eprStr,
    swStr,
    msgStr,
    objStr,
    safeStr,
    devStr,
    curAccStr,
  ] = await Promise.all([
    AsyncStorage.getItem(KEYS.items),
    AsyncStorage.getItem(KEYS.notifs),
    AsyncStorage.getItem(KEYS.reqs),
    AsyncStorage.getItem(KEYS.role),
    AsyncStorage.getItem(KEYS.accounts),
    AsyncStorage.getItem(KEYS.chores),
    AsyncStorage.getItem(KEYS.prizes),
    AsyncStorage.getItem(KEYS.employeePrizes),
    AsyncStorage.getItem(KEYS.switches),
    AsyncStorage.getItem(KEYS.messages),
    AsyncStorage.getItem(KEYS.objectives),
    AsyncStorage.getItem(KEYS.safetyRequirements),
    AsyncStorage.getItem(KEYS.deviceId),
    AsyncStorage.getItem(KEYS.currentAccount),
  ]);

  return {
    items: safeParse(itemsStr, [] as Item[]),
    notifications: safeParse(notifsStr, [] as AppNotification[]),
    requests: safeParse(reqsStr, [] as RestockRequest[]),
    role: safeParse(roleStr, null as Role | null),
    accounts: safeParse(accStr, [] as Account[]),
    chores: safeParse(choresStr, [] as Chore[]),
    prizeDefs: safeParse(prizesStr, [] as PrizeDefinition[]),
    employeePrizes: safeParse(eprStr, [] as EmployeePrize[]),
    switchRequests: safeParse(swStr, [] as SwitchRequest[]),
    messages: safeParse(msgStr, [] as Message[]),
    objectives: safeParse(objStr, [] as Objective[]),
    safetyRequirements: safeParse(safeStr, [] as SafetyRequirement[]),
    deviceId: devStr || null,
    currentAccountId: curAccStr || null,
  };
}

export async function ensureDeviceId(): Promise<string> {
  let id = await AsyncStorage.getItem(KEYS.deviceId);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    await AsyncStorage.setItem(KEYS.deviceId, id);
  }
  return id;
}

export async function saveItems(items: Item[]) {
  await AsyncStorage.setItem(KEYS.items, JSON.stringify(items));
}
export async function saveNotifications(notifs: AppNotification[]) {
  await AsyncStorage.setItem(KEYS.notifs, JSON.stringify(notifs));
}
export async function saveRequests(reqs: RestockRequest[]) {
  await AsyncStorage.setItem(KEYS.reqs, JSON.stringify(reqs));
}
export async function saveRole(role: Role | null) {
  if (role) await AsyncStorage.setItem(KEYS.role, JSON.stringify(role));
  else await AsyncStorage.removeItem(KEYS.role);
}
export async function saveAccounts(list: Account[]) {
  await AsyncStorage.setItem(KEYS.accounts, JSON.stringify(list));
}
export async function saveChores(list: Chore[]) {
  await AsyncStorage.setItem(KEYS.chores, JSON.stringify(list));
}
export async function savePrizeDefs(list: PrizeDefinition[]) {
  await AsyncStorage.setItem(KEYS.prizes, JSON.stringify(list));
}
export async function saveEmployeePrizes(list: EmployeePrize[]) {
  await AsyncStorage.setItem(KEYS.employeePrizes, JSON.stringify(list));
}
export async function saveSwitchRequests(list: SwitchRequest[]) {
  await AsyncStorage.setItem(KEYS.switches, JSON.stringify(list));
}
export async function saveMessages(list: Message[]) {
  await AsyncStorage.setItem(KEYS.messages, JSON.stringify(list));
}
export async function saveObjectives(list: Objective[]) {
  await AsyncStorage.setItem(KEYS.objectives, JSON.stringify(list));
}
export async function saveSafetyRequirements(list: SafetyRequirement[]) {
  await AsyncStorage.setItem(KEYS.safetyRequirements, JSON.stringify(list));
}

export async function saveCurrentAccount(id: string | null) {
  if (id) await AsyncStorage.setItem(KEYS.currentAccount, id);
  else await AsyncStorage.removeItem(KEYS.currentAccount);
}

export async function clearAllStorage() {
  await Promise.all(Object.values(KEYS).map((k) => AsyncStorage.removeItem(k)));
}
