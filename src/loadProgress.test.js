import { test } from "node:test";
import assert from "node:assert/strict";
import { MAX_WAIT, PETALS, TICK, tickBlossom } from "./loadProgress.js";

// Runs the blossom the way LoadingScreen does, one tick every TICK ms.
// stepsAt(elapsed) says how many loading steps have finished by then.
// Returns when each petal appeared and when the screen was allowed to leave.
function run(stepsAt, { reduce = false, until = 15000 } = {}) {
  let state = { shown: 0, lastAt: -Infinity, leave: false };
  const petalTimes = [];
  for (let elapsed = TICK; elapsed <= until; elapsed += TICK) {
    const before = state.shown;
    state = tickBlossom(state, stepsAt(elapsed), elapsed, reduce);
    for (let petal = before; petal < state.shown; petal += 1) petalTimes.push(elapsed);
    if (state.leave) return { petalTimes, leaveAt: elapsed };
  }
  return { petalTimes, leaveAt: null };
}

test("a fast load still grows one petal at a time and keeps today's 4.3 s minimum", () => {
  const { petalTimes, leaveAt } = run(() => PETALS);
  assert.deepEqual(petalTimes, [400, 1100, 1800, 2500, 3200]);
  assert.equal(leaveAt, 4300);
});

test("petals never get ahead of the loading steps", () => {
  const { petalTimes, leaveAt } = run((elapsed) => (elapsed < 6000 ? 2 : PETALS));
  assert.deepEqual(petalTimes.slice(0, 2), [400, 1100]);
  assert.ok(petalTimes[2] >= 6000, `third petal at ${petalTimes[2]} ms, before its step finished`);
  assert.ok(leaveAt > petalTimes[4], "left before the last petal appeared");
});

test("steps that finish together still show as separate petals", () => {
  const { petalTimes } = run((elapsed) => (elapsed < 6000 ? 2 : PETALS));
  for (let index = 1; index < petalTimes.length; index += 1) {
    assert.ok(petalTimes[index] - petalTimes[index - 1] >= 700, `petals ${index} and ${index + 1} too close`);
  }
});

test("the screen waits for slow loading instead of leaving at 4.3 s", () => {
  const { leaveAt } = run((elapsed) => (elapsed < 7000 ? 4 : PETALS));
  assert.ok(leaveAt >= 7000, `left at ${leaveAt} ms while a step was unfinished`);
});

test("a step that never finishes can't keep the screen up past the limit", () => {
  const { petalTimes, leaveAt } = run(() => 3);
  assert.equal(petalTimes.length, PETALS);
  assert.equal(petalTimes[4], MAX_WAIT);
  assert.ok(leaveAt > MAX_WAIT && leaveAt <= MAX_WAIT + 1000, `left at ${leaveAt} ms`);
});

test("with reduced motion, petals follow the steps and the minimum stays 0.9 s", () => {
  const fast = run(() => PETALS, { reduce: true });
  assert.deepEqual(fast.petalTimes, [100, 100, 100, 100, 100]);
  assert.equal(fast.leaveAt, 900);

  const slow = run((elapsed) => (elapsed < 2000 ? 1 : PETALS), { reduce: true });
  assert.equal(slow.petalTimes[1], 2000);
  assert.equal(slow.leaveAt, 2000);
});
