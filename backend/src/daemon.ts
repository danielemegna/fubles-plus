const LOOP_INTERVAL_IN_MINUTES = 5

export default function start() {
  loopHit()
  setInterval(loopHit, LOOP_INTERVAL_IN_MINUTES * 60 * 1000)
}

function loopHit() {
  console.log(`Deamon loop hit (next in ${LOOP_INTERVAL_IN_MINUTES} minutes)...`)
}