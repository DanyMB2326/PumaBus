export interface Route {
  id: string;
  name: string;
  color: string;
  waitingTime?: string;
  status: 'low' | 'normal' | 'busy';
  number: number;
}

export interface Stop {
  id: string;
  name: string;
  time?: string;
  isPassed?: boolean;
  isCurrent?: boolean;
}

export type TabKind = 'map' | 'routes' | 'info';
