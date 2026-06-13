import PlanGate from '../../components/PlanGate';
import PlanJournee from '../../components/plans/PlanJournee';
import { EMPLOI_DAY } from '../../lib/emploiChargeData';
export default function EmploiJournee() {
  return <PlanGate><PlanJournee day={EMPLOI_DAY} backTo="/plans/emploi-charge" /></PlanGate>;
}