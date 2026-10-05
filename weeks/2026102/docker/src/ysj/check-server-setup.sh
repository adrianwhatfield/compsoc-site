#!/usr/bin/env bash

# YSJ command-line challenge:
# Make every check below pass. You should not need sudo.

set -u

ROOT="$HOME/server-setup"
failures=0

pass() { printf '[PASS] %s\n' "$1"; }
fail() { printf '[FAIL] %s\n' "$1"; failures=$((failures + 1)); }

if [[ -f "$ROOT/www/index.html" ]]; then
    pass "web root contains index.html"
else
    fail "web root contains index.html"
fi

if grep -qx 'PORT=8080' "$ROOT/config/server.conf" 2>/dev/null; then
    pass "server listens on port 8080"
else
    fail "server listens on port 8080"
fi

if grep -qx 'BIND_ADDRESS=0.0.0.0' "$ROOT/config/server.conf" 2>/dev/null; then
    pass "server binds to 0.0.0.0"
else
    fail "server binds to 0.0.0.0"
fi

if [[ -x "$ROOT/start-server.sh" ]]; then
    pass "start-server.sh is executable"
else
    fail "start-server.sh is executable"
fi

if [[ -d "$ROOT/logs" ]]; then
    pass "logs directory exists"
else
    fail "logs directory exists"
fi

key_mode="$(stat -c '%a' "$ROOT/secrets/api.key" 2>/dev/null || printf 'missing')"
if [[ "$key_mode" == "600" ]]; then
    pass "api.key permissions are 600"
else
    fail "api.key permissions are 600 (currently: $key_mode)"
fi

if [[ -d "$ROOT/data" && -w "$ROOT/data" ]]; then
    pass "data directory is writable"
else
    fail "data directory is writable"
fi

printf '\n'
if (( failures == 0 )); then
    echo "All checks passed."
    exit 0
else
    printf '%d check(s) still failing.\n' "$failures"
    exit 1
fi
