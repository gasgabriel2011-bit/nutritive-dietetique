import PlanGate from '../../components/PlanGate';
import PlanBoissons from '../../components/plans/PlanBoissons';
import { FAMILLE_DRINKS } from '../../lib/familleData';
export default function FamilleBoissons() {
  return <PlanGate><PlanBoissons drinks={FAMILLE_DRINKS} backTo="/plans/repas-famille" /></PlanGate>;
}