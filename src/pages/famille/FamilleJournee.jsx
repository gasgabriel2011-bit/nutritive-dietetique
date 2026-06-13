import PlanGate from '../../components/PlanGate';
import PlanJournee from '../../components/plans/PlanJournee';
import { FAMILLE_DAY } from '../../lib/familleData';
export default function FamilleJournee() {
  return <PlanGate><PlanJournee day={FAMILLE_DAY} backTo="/plans/repas-famille" /></PlanGate>;
}