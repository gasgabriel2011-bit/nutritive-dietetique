import PlanGate from '../../components/PlanGate';
import PlanSport from '../../components/plans/PlanSport';
import { EMPLOI_SPORT } from '../../lib/emploiChargeData';
export default function EmploiSport() {
  return <PlanGate><PlanSport tips={EMPLOI_SPORT} backTo="/plans/emploi-charge" title="Sport & micro-pauses" /></PlanGate>;
}
