import data from './offline-locations.json';

export function offlineTypeAhead(term: string) {
  const results = data.filter(
    loc =>
      loc.subtext.toLowerCase().includes(term.toLowerCase()) ||
      loc.text.toLowerCase().includes(term.toLowerCase()),
  );
  return results;
}
