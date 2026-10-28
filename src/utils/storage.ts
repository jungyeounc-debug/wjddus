/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Achievement,
  BowlCustomization,
  CheolwoongAffinity,
  CookedRamen,
  CustomerOrder,
  GameSettings,
  PhotoCard,
  PlayerProfile,
} from '../types/game';
import { ACHIEVEMENTS_LIST } from './gameData';

const STORAGE_KEYS = {
  FIRST_LAUNCH: 'yeon_ramen_first_launch_v2',
  PLAYER_PROFILE: 'yeon_ramen_player_profile_v2',
  COINS: 'yeon_ramen_coins_v2',
  DAY: 'yeon_ramen_day_v2',
  HIGH_SCORE: 'yeon_ramen_high_score_v2',
  AFFINITY: 'yeon_ramen_affinity_v2',
  INVENTORY: 'yeon_ramen_inventory_v2',
  STOVE_COUNT: 'yeon_ramen_stove_count_v2',
  UNLOCKED_BROTHS: 'yeon_ramen_unlocked_broths_v2',
  UNLOCKED_TOPPINGS: 'yeon_ramen_unlocked_toppings_v2',
  BOWL_CONFIG: 'yeon_ramen_bowl_config_v2',
  OWNED_DECORS: 'yeon_ramen_owned_decors_v2',
  ALBUM: 'yeon_ramen_album_cards_v2',
  CUSTOM_RECIPES: 'yeon_ramen_custom_recipes_v2',
  SETTINGS: 'yeon_ramen_settings_v2',
  ACHIEVEMENTS: 'yeon_ramen_achievements_v2',
  REGULARS_MEMORIES: 'yeon_ramen_regulars_memories_v2',
};

const DEFAULT_SETTINGS: GameSettings = {
  difficulty: 'normal',
  serviceDuration: 90,
  customerSpeed: 'normal',
  bgmVolume: 40,
  sfxVolume: 80,
  theme: 'day',
  fontSize: 'medium',
  dialogSpeed: 'normal',
  nagFrequency: 'normal',
  reduceMotion: false,
  autoHint: true,
};

const DEFAULT_PROFILE: PlayerProfile = {
  name: '신입',
  title: '새싹 요리사',
  apronColor: 'navy',
  hatType: 'chef',
  level: 1,
  xp: 0,
  maxXp: 100,
};

const DEFAULT_AFFINITY: CheolwoongAffinity = {
  level: 1,
  points: 15,
  maxPoints: 100,
  unlockedStories: [1],
};

const DEFAULT_BOWL: BowlCustomization = {
  shape: 'classic_pot',
  color: 'yellow',
  pattern: 'none',
  chopsticks: 'wood',
  tray: 'wood',
};

// Initial generous starting inventory
const DEFAULT_INVENTORY: Record<string, number> = {
  noodle: 20,
  egg: 15,
  green_onion: 20,
  cheese: 12,
  ham: 10,
  kimchi: 15,
  danmuji: 15,
  rice: 10,
  coke: 10,
  // Snacks for Cheolwoong
  snack_fishbread: 1,
  snack_coffee: 2,
};

export const GameStorage = {
  isFirstLaunch(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.FIRST_LAUNCH) === null;
    } catch {
      return false;
    }
  },

  setFirstLaunchComplete() {
    try {
      localStorage.setItem(STORAGE_KEYS.FIRST_LAUNCH, 'false');
    } catch (e) {
      console.warn(e);
    }
  },

  getPlayerProfile(): PlayerProfile {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.PLAYER_PROFILE);
      return v ? JSON.parse(v) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  setPlayerProfile(p: PlayerProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYER_PROFILE, JSON.stringify(p));
    } catch (e) {
      console.warn(e);
    }
  },

  getCoins(): number {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.COINS);
      return v ? parseInt(v, 10) : 100; // 100 starting coins
    } catch {
      return 100;
    }
  },

  setCoins(coins: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.COINS, coins.toString());
    } catch (e) {
      console.warn(e);
    }
  },

  getDay(): number {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.DAY);
      return v ? parseInt(v, 10) : 1;
    } catch {
      return 1;
    }
  },

  setDay(day: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.DAY, day.toString());
    } catch (e) {
      console.warn(e);
    }
  },

  getHighScore(): number {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
      return v ? parseInt(v, 10) : 0;
    } catch {
      return 0;
    }
  },

  setHighScore(score: number) {
    try {
      const current = this.getHighScore();
      if (score > current) {
        localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
      }
    } catch (e) {
      console.warn(e);
    }
  },

  getAffinity(): CheolwoongAffinity {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.AFFINITY);
      return v ? JSON.parse(v) : DEFAULT_AFFINITY;
    } catch {
      return DEFAULT_AFFINITY;
    }
  },

  setAffinity(aff: CheolwoongAffinity) {
    try {
      localStorage.setItem(STORAGE_KEYS.AFFINITY, JSON.stringify(aff));
    } catch (e) {
      console.warn(e);
    }
  },

  addAffinityPoints(delta: number): { leveledUp: boolean; newAffinity: CheolwoongAffinity } {
    const aff = this.getAffinity();
    let newPoints = aff.points + delta;
    let newLevel = aff.level;
    let leveledUp = false;

    if (newPoints >= aff.maxPoints && newLevel < 5) {
      newPoints = newPoints - aff.maxPoints;
      newLevel += 1;
      leveledUp = true;
      if (!aff.unlockedStories.includes(newLevel)) {
        aff.unlockedStories.push(newLevel);
      }
    } else if (newPoints > aff.maxPoints) {
      newPoints = aff.maxPoints;
    } else if (newPoints < 0) {
      newPoints = 0;
    }

    const updated: CheolwoongAffinity = {
      ...aff,
      level: newLevel,
      points: newPoints,
      unlockedStories: aff.unlockedStories,
    };
    this.setAffinity(updated);
    return { leveledUp, newAffinity: updated };
  },

  getInventory(): Record<string, number> {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.INVENTORY);
      return v ? JSON.parse(v) : DEFAULT_INVENTORY;
    } catch {
      return DEFAULT_INVENTORY;
    }
  },

  setInventory(inv: Record<string, number>) {
    try {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inv));
    } catch (e) {
      console.warn(e);
    }
  },

  consumeItem(key: string, count: number = 1): boolean {
    const inv = this.getInventory();
    const current = inv[key] || 0;
    if (current >= count) {
      inv[key] = current - count;
      this.setInventory(inv);
      return true;
    }
    return false;
  },

  addItem(key: string, count: number = 1) {
    const inv = this.getInventory();
    inv[key] = (inv[key] || 0) + count;
    this.setInventory(inv);
  },

  getStoveCount(): number {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.STOVE_COUNT);
      return v ? parseInt(v, 10) : 1; // Starts with 1 stove, upgradable up to 3
    } catch {
      return 1;
    }
  },

  setStoveCount(c: number) {
    try {
      localStorage.setItem(STORAGE_KEYS.STOVE_COUNT, c.toString());
    } catch (e) {
      console.warn(e);
    }
  },

  getUnlockedBroths(): string[] {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.UNLOCKED_BROTHS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  addUnlockedBroth(id: string) {
    const list = this.getUnlockedBroths();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_BROTHS, JSON.stringify(list));
    }
  },

  getUnlockedToppings(): string[] {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.UNLOCKED_TOPPINGS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  addUnlockedTopping(id: string) {
    const list = this.getUnlockedToppings();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_TOPPINGS, JSON.stringify(list));
    }
  },

  getBowlConfig(): BowlCustomization {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.BOWL_CONFIG);
      return v ? JSON.parse(v) : DEFAULT_BOWL;
    } catch {
      return DEFAULT_BOWL;
    }
  },

  setBowlConfig(b: BowlCustomization) {
    try {
      localStorage.setItem(STORAGE_KEYS.BOWL_CONFIG, JSON.stringify(b));
    } catch (e) {
      console.warn(e);
    }
  },

  getAlbumCards(): PhotoCard[] {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.ALBUM);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  saveAlbumCard(card: PhotoCard) {
    try {
      const list = this.getAlbumCards();
      const updated = [card, ...list].slice(0, 60);
      localStorage.setItem(STORAGE_KEYS.ALBUM, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  },

  deleteAlbumCard(id: string) {
    try {
      const list = this.getAlbumCards().filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.ALBUM, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
  },

  getCustomRecipes(): CookedRamen[] {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.CUSTOM_RECIPES);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  saveCustomRecipe(recipe: CookedRamen) {
    try {
      const list = this.getCustomRecipes();
      const updated = [recipe, ...list].slice(0, 30);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  },

  getSettings(): GameSettings {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return v ? { ...DEFAULT_SETTINGS, ...JSON.parse(v) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  setSettings(s: GameSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(s));
    } catch (e) {
      console.warn(e);
    }
  },

  getAchievements(): Achievement[] {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (!v) return ACHIEVEMENTS_LIST;
      const saved: Achievement[] = JSON.parse(v);
      return ACHIEVEMENTS_LIST.map((def) => {
        const found = saved.find((s) => s.id === def.id);
        return found ? { ...def, unlocked: found.unlocked } : def;
      });
    } catch {
      return ACHIEVEMENTS_LIST;
    }
  },

  unlockAchievement(id: string): boolean {
    const list = this.getAchievements();
    const item = list.find((a) => a.id === id);
    if (item && !item.unlocked) {
      item.unlocked = true;
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
      // Give reward coins
      this.setCoins(this.getCoins() + item.rewardCoins);
      return true;
    }
    return false;
  },

  getRegularsMemories(): Record<string, CustomerOrder> {
    try {
      const v = localStorage.getItem(STORAGE_KEYS.REGULARS_MEMORIES);
      return v ? JSON.parse(v) : {};
    } catch {
      return {};
    }
  },

  saveRegularMemory(customerName: string, order: CustomerOrder) {
    try {
      const map = this.getRegularsMemories();
      map[customerName] = order;
      localStorage.setItem(STORAGE_KEYS.REGULARS_MEMORIES, JSON.stringify(map));
    } catch (e) {
      console.warn(e);
    }
  },

  getUnlockedBowls(): string[] {
    return ['classic_pot', 'round_bowl', 'flat_plate'];
  },

  getOwnedDecors(): string[] {
    return [];
  },

  getMuted(): boolean {
    return false;
  },

  setMuted(m: boolean) {
    const s = this.getSettings();
    this.setSettings({ ...s, bgmVolume: m ? 0 : 40 });
  },

  markFirstLaunchComplete() {
    this.setFirstLaunchComplete();
  },

  clearAll() {
    this.resetAllProgress();
  },

  setAchievements(list: Achievement[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
  },

  // Reset progress confirmation
  resetAllProgress() {
    try {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.warn(e);
    }
  },
};
