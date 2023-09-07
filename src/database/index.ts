import Database from 'bun:sqlite';

const dbPath = Bun.env.DATABASE_PATH ?? ':memory:';

const db = Database.open(dbPath);

enum AlertType {
  REPEAT,
}

interface Alert {
  id: number;
  type: AlertType;
  alertOn: number;
  acked: boolean;
  data: string;
}

const openDabatase = (): void =>
  db.run(
    'CREATE TABLE IF NOT EXISTS alerts ( id INTEGER PRIMARY KEY AUTOINCREMENT, type INTERGER, alertOn INTERGER, acked INTEGER, data TEXT )',
  );

const createAlert = ({ type, alertOn, acked, data }: Omit<Alert, 'id'>): void => {
  db.run<[AlertType, number, boolean, string]>(
    'INSERT INTO alerts (type, alertOn, acked, data) VALUES (?, ?, ?, ?)',
    [type, alertOn, acked, data],
  );
};

const getOpenAlerts = (): number => {
  const query = db.query<{ count: number }, number>(
    'SELECT COUNT(*) count FROM alerts WHERE alertON > ?',
  );

  return query.get(Date.now())?.count ?? 0;
};

const getExpiredAlerts = (): Alert[] => {
  const query = db.query<Alert, number>('SELECT * FROM alerts WHERE alertON <= ?');

  return query.all(Date.now());
};

export { openDabatase, getExpiredAlerts, createAlert, getOpenAlerts };
