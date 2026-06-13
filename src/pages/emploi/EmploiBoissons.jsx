import PlanGate from '../../components/PlanGate';
import PlanBoissons from '../../components/plans/PlanBoissons';
import { EMPLOI_DRINKS } from '../../lib/emploiChargeData';
export default function EmploiBoissons() {
  return <PlanGate><PlanBoissons drinks={EMPLOI_DRINKS} backTo="/plans/emploi-charge" /></PlanGate>;
}