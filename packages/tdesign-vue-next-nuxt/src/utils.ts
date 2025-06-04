function isMatch(name: string, match: string | RegExp | (string | RegExp)[] | undefined): boolean {
  if (typeof match === 'string') return name === match;

  if (match instanceof RegExp) return !!name.match(match);

  if (Array.isArray(match)) {
    for (const item of match) {
      if (name === item || name.match(item)) return true;
    }
  }
  return false;
}

export { isMatch };
