import PlanGate from '../../components/PlanGate';
import PlanWeeks from '../../components/plans/PlanWeeks';
import { FAMILLE_WEEKS } from '../../lib/familleData';
export default function FamilleWeeks() {
  return <PlanGate><PlanWeeks weeks={FAMILLE_WEEKS} backTo="/plans/repas-famille" title="4 semaines famille" /></PlanGate>;
}