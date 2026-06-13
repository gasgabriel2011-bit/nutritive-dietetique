import PlanGate from '../../components/PlanGate';
import PlanWeeks from '../../components/plans/PlanWeeks';
import { EMPLOI_WEEKS } from '../../lib/emploiChargeData';
export default function EmploiWeeks() {
  return <PlanGate><PlanWeeks weeks={EMPLOI_WEEKS} backTo="/plans/emploi-charge" title="4 semaines emploi chargé" /></PlanGate>;
}